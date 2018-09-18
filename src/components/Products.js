import React, { Component } from 'react';
import injectSheet from 'react-jss';
import * as C from '../common/constants';
import { bags, hoodies, filters } from '../common/data';
import { searchItems, filterItems, getPagedItems } from '../common/utils';
import Filter from './ui/Filter';
import PageNumbers from './ui/PageNumbers';
import Header from './ui/products/Header';
import Hero from './ui/products/Hero';

class Products extends Component {

  state = {
    data: { items: [...bags, ...hoodies] },
    items: [...bags, ...hoodies],
    searchText: '',
    searchParam: 'title',
    filterType: '',
    selectedFilters: [],
    currentPage: 1,
    itemsPerPage: 9,
  };

  handlePageNumberClick = (event, callback = null) => {
    event.preventDefault();

    this.setState({
      currentPage: Number(event.target.id)
    }, callback);
  }

  handleProductsSearch = (event) => {
    event.preventDefault();

    this.setState({searchText: event.target.search.value}, () => {
      this.setState(prevState => ({items: searchItems(prevState)}), () => {
        this.setState({ currentPage: 1 });
      });
    });
  }

  handleProductsFilter = (selected, filterType) => {
    this.setState({selectedFilters: selected, filterType}, () => {
      this.setState(prevState => ({items: filterItems(prevState)}), () => {
        this.setState({ currentPage: 1 });
      });
    });
  }

  getTitleExcerpt(title, length) {
    console.log(title.length, length);
    return title.length > length ? `${title.substring(0, length - 3)}...` : title;
  }

  getProducts() {
    const { classes } = this.props;
    const itemsPaged = getPagedItems(this.state);

    if (itemsPaged.length > 0) {
      return itemsPaged.map((product) => {
        return (
          <li key={product.id} className={classes.product}>
            <div><img src={product.imageUrl} alt={product.name} /></div>
            <div className="title">{this.getTitleExcerpt(product.title, 52)}</div>
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
    const { itemsPerPage, currentPage, items } = this.state;
    const total = items.length;

    return (
      <div>
        <Header onSearch={this.handleProductsSearch}/>
        <Hero />
        <div className={classes.container}>
          <Filter
            title="Brands"
            name="brands"
            type="brand"
            data={filters}
            onChange={this.handleProductsFilter}
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
              onClick={this.handlePageNumberClick}
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

export default injectSheet(styles)(Products);
