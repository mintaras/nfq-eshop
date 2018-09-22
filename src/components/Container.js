import React, { Component } from 'react';
import { bags, hoodies } from '../common/data';
import { searchItems, filterItems } from '../common/utils';

function container() {
  return function(WrappedComponent) {

    class StateLoader extends Component {

      state = {
        items: [],
        searchText: '',
        filterType: '',
        selectedFilters: [],
        currentPage: 1,
        itemsPerPage: 9,
      };

      handlePageNumberClick = (event, callback = null) => {
        event.preventDefault();

        this.setState(
          {currentPage: Number(event.target.id)},
          callback
        );
      }

      gotToPage = (number) => {
        this.setState({ currentPage: number });
      }

      updateItems = (callback) => {
        this.setState(
          prevState => ({items: callback(prevState, )}),
          () => this.gotToPage(1)
        );
      }

      handleItemsSearch = (event) => {
        event.preventDefault();

        this.setState(
          {searchText: event.target.search.value},
          () => this.updateItems(searchItems)
        );
      }

      handleItemsFilter = (selected, filterType) => {
        this.setState(
          {selectedFilters: selected, filterType},
          () => this.updateItems(filterItems)
        );
      }

      render() {
        return (
          <WrappedComponent
            {...this.state}
            handlePageNumberClick={this.handlePageNumberClick}
            gotToPage={this.gotToPage}
            handleItemsSearch={this.handleItemsSearch}
            handleItemsFilter={this.handleItemsFilter}
          />
        );
      }
    }

    return StateLoader;
  }
}

export default container;
