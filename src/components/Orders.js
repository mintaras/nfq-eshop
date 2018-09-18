import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Link } from "react-router-dom";
import { orders } from '../common/data';
import * as C from '../common/constants';
import { searchItems, filterItems, getPagedItems } from '../common/utils';
import Filter from './ui/Filter';
import Search from './ui/Search';
import PageNumbers from './ui/PageNumbers';

class Orders extends Component {

  state = {
    data: { items: orders },
    items: orders,
    searchText: '',
    searchParam: 'shipTo',
    filterType: '',
    selectedFilters: [],
    currentPage: 1,
    itemsPerPage: 5,
  };

  handlePageNumberClick = (event, callback = null) => {
    event.preventDefault();

    this.setState(
      {currentPage: Number(event.target.id)},
      callback
    );
  }

  gotToPage(number) {
    this.setState({ currentPage: number });
  }

  updateItems(callback) {
    this.setState(
      prevState => ({items: callback(prevState)}),
      () => this.gotToPage(1)
    );
  }

  handleOrdersSearch = (event) => {
    event.preventDefault();

    this.setState(
      {searchText: event.target.search.value},
      () => this.updateItems(searchItems)
    );
  }

  handleOrdersFilter = (selected, filterType) => {
    this.setState(
      {selectedFilters: selected, filterType},
      () => this.updateItems(filterItems)
    );
  }

  getOrders() {
    const itemsPaged = getPagedItems(this.state);

    if (itemsPaged.length > 0) {
      return itemsPaged.map((order) => {
        return (
          <tr key={order.id}>
            <td>{order.status}</td>
            <td>{`#${order.id} by ${order.client.name} ${order.client.email}`}</td>
            <td>{order.shipTo}</td>
            <td>{`${C.CURRENCY_SYM} ${order.total}`}</td>
          </tr>
        );
      });
    }

    return <tr><td colSpan="4">{C.NO_RESULTS}</td></tr>;
  }

  render() {
    const { classes } = this.props;
    const { itemsPerPage, currentPage, items } = this.state;
    const total = items.length;

    return (
      <div className={classes.container}>
        <header className={classes.header}>
          <Link className={classes.link} to="/">&#10094; Products</Link>
          <h3 className={classes.title}>Orders</h3>
          <div className={classes.filters}>
            <Filter
              title="Status"
              name="status"
              type="status"
              data={[
                {id: 1, name: 'pending'},
                {id: 2, name: 'completed'},
                {id: 3, name: 'delivery'},
              ]}
              onChange={this.handleOrdersFilter}
            />
            <Search onSubmit={this.handleOrdersSearch} />
          </div>
        </header>
        <table className={classes.ordersTable}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Order</th>
              <th>Ship to</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.getOrders()}
          </tbody>
        </table>
        <PageNumbers
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          items={items}
          total={total}
          onClick={this.handlePageNumberClick}
        />
      </div>
    );
  }
}

const styles = {
  header: {
    margin: '0 0 20px 0',
    '@media (min-width: 768px)': {
      margin: '0',
    },
  },
  container: {
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
    padding: '40px 15px',
  },
  filters: {
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
    '@media (min-width: 768px)': {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
  },
  title: {
    margin: '0 0 20px',
  },
  ordersTable: {
    margin: '0',
    width: '100%',
    '& tr:hover': {
      '& td': {
        borderColor: '#ccc',
      },
    },
    '& th': {
      backgroundColor: '#eee',
      padding: '5px',
      textAlign: 'left',
    },
    '& td': {
      fontSize: '0.8em',
      borderBottom: '1px solid #eee',
      padding: '5px',
    },
    '@media (min-width: 768px)': {
      '& td, th': {
        padding: '10px',
      },
    },
  },
  link: {
    margin: '0 0 10px',
    display: 'inline-block',
    textDecoration: 'none',
  },
};

export default injectSheet(styles)(Orders);
