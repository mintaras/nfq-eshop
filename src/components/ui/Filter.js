import React, { Component } from 'react';
import injectSheet from 'react-jss';

class Filter extends Component {

  state = {
    items: this.props.data,
    checkedItems: [],
  };

  addFilter(prevState, event) {
    return { checkedItems: [...prevState.checkedItems, event.target.value] };
  }

  removeFilter(prevState, event) {
    const newItems = prevState.checkedItems.filter((item) => {
      return item !== event.target.value;
    });
    return { checkedItems: [...newItems] };
  }

  hangleChange = (event) => {
    const { type } = this.props;

    event.persist();

    this.setState(
      prevState => {
        if (event.target.checked) {
          return this.addFilter(prevState, event)
        }
        return this.removeFilter(prevState, event)
      },
      () => this.props.onChange(this.state.checkedItems, type)
    );
  }

  getFilters() {
    const { classes, name } = this.props;
    const { items } = this.state;

    return items.map((item) => {
      const id = `${item.name}-${item.id}`;
      return (
        <li key={id}>
          <input
            type="checkbox"
            dataid={item.id}
            id={id}
            name={`${name}[]`}
            value={item.name}
            className={classes.filterInput}
            onChange={this.hangleChange}
          />
          <label htmlFor={id}>{item.name}</label>
        </li>
      );
    });
  }

  render() {
    const { classes, title } = this.props;
    return (
      <div className={classes.filterWrap}>
        <div className={classes.title}>{title}:</div>
        <form ref="filterForm">
          <ul className={classes.filters}>{this.getFilters()}</ul>
        </form>
      </div>
    );
  }
}

const styles = {
  filterWrap: {
    margin: '20px 0',
    display: 'flex'
  },
  filters: {
    display: 'flex',
    width: '100%',
    '& li': {
      margin: '0 10px',
    },
  },
  filterInput: {
    margin: '0 10px 0 0',
  },
  title: {
    fontWeight: 'bold',
  },
};

export default injectSheet(styles)(Filter);
