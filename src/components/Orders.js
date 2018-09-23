import React, { Component } from 'react';
import injectSheet from 'react-jss';
import { Link } from "react-router-dom";
import { orders } from '../common/data';
import * as C from '../common/constants';
import { getPagedItems } from '../common/utils';
import Filter from './ui/Filter';
import Search from './ui/Search';
import PageNumbers from './ui/PageNumbers';
import listContainer from './Container';

class Orders extends Component {

  getOrders() {
    const { items } = this.props;

    if (items.length > 0) {
      const itemsPaged = getPagedItems(this.props, items);
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
    const {
      itemsPerPage,
      currentPage,
      items,
      classes,
      handleItemsFilter,
      handleItemsSearch,
      handlePageNumberClick
    } = this.props;
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
              onChange={handleItemsFilter}
            />
            <Search onSubmit={handleItemsSearch} />
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
          onClick={handlePageNumberClick}
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

export default listContainer({
  data: {items: orders},
  items: orders,
  searchParam: 'shipTo',
})(injectSheet(styles)(Orders));
