import React, { Component } from 'react';
import { searchFilterItems } from '../common/utils';

function listContainer(config) {
  return function h(WrappedComponent) {
    class StateLoader extends Component {
      constructor(props) {
        super(props);

        this.state = {
          data: config.data,
          items: config.items,
          searchParam: config.searchParam,
          searchText: '',
          filterType: '',
          selectedFilters: [],
          currentPage: 1,
          itemsPerPage: 9,
        };
      }

      handlePageNumberClick = (event, callback = null) => {
        event.preventDefault();

        this.setState(
          { currentPage: Number(event.target.id) },
          callback
        );
      }

      gotToPage = (number) => {
        this.setState({ currentPage: number });
      }

      updateItems = () => {
        this.setState(
          prevState => ({ items: searchFilterItems(prevState) }),
          () => this.gotToPage(1)
        );
      }

      handleItemsSearch = (event) => {
        event.preventDefault();

        this.setState(
          { searchText: event.target.search.value },
          () => this.updateItems()
        );
      }

      handleItemsFilter = ({ selected, filterType }) => {
        this.setState(
          { selectedFilters: selected, filterType },
          () => this.updateItems()
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
  };
}

export default listContainer;
