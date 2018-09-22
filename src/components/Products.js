import React, { Component } from 'react';
import injectSheet from 'react-jss';
import * as C from '../common/constants';
import { bags, hoodies, filters } from '../common/data';
import { getPagedItems, getExcerpt } from '../common/utils';
import Filter from './ui/Filter';
import PageNumbers from './ui/PageNumbers';
import Header from './ui/products/Header';
import Hero from './ui/products/Hero';
import container from './Container';

class Products extends Component {
  getProducts() {
    const { classes } = this.props;
    const itemsPaged = getPagedItems(this.props);

    if (itemsPaged.length > 0) {
      return itemsPaged.map(product => {
        return (
          <li key={product.id} className={classes.product}>
            <div><img src={product.imageUrl} alt={product.name} /></div>
            <div className="title">{getExcerpt(product.title, 52)}</div>
            <div className="price">
              <sup className="price-currency">{C.CURRENCY_SYM}</sup>
              {product.price}
            </div>
          </li>
        );
      });
    }

    return <div>{C.NO_RESULTS}</div>;
  }

  render() {
    const { classes } = this.props;
    const { itemsPerPage, currentPage, items } = this.props;
    const total = items.length;

    return (
      <div>
        <Header onSearch={this.props.handleItemsSearch}/>
        <Hero />
        <div className={classes.container}>
          <Filter
            title="Brands"
            name="brands"
            type="brand"
            data={filters}
            onChange={this.props.handleItemsFilter}
          />
          <ul className={classes.products} ref="productsList">
            {this.getProducts()}
          </ul>
          <div className={classes.pagination}>
            <PageNumbers
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              items={items}
              total={total}
              onClick={this.props.handlePageNumberClick}
              scrollTo={450}
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
    padding: '0 15px',
  },
  products: {
    listStyleType: 'none',
    margin: '0',
    padding: '0 0 40px 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gridGap: '30px',
  },
  product: {
    border: '1px solid #eee',
    padding: '20px',
    margin: '0',
    transition: 'all 250ms ease',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 0 12px 1px #eee',
    },
    '& .title': {
      color: '#0066c0',
      minHeight: '50px',
    },
    '& .price': {
      fontSize: '1.4em',
      fontWeight: 'bold',
      margin: '10px 0 0'
    },
    '& img': {
      width: '100%',
      height: '320px',
      objectFit: 'contain',
    },
  },
  pagination: {
    textAlign: 'center',
  }
};

export default container()(injectSheet(styles)(Products));
