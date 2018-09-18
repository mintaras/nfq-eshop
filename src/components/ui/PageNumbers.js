import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { scrollToPosition } from '../../common/utils';

class PageNumbers extends Component {

  handleOnClick = (event) => {
    const { onClick, scrollTo } = this.props;

    event.preventDefault();

    // Invoke onClick function and set callback function if scrollTo was provided
    onClick(event, () => scrollTo !== -1 ? scrollToPosition(scrollTo) : null);
  }

  render() {
    const { itemsPerPage, currentPage, total, classes } = this.props;
    const pageNumbers = Array.from({length: Math.ceil(total / itemsPerPage)}, (v, k) => k+1);

    if (pageNumbers.length === 1) {
      return null;
    }

    return (
      <ul className={classes.pageNumbers}>
        {pageNumbers.map(page => {
          return (
            <li key={page}>
              <a
                href={`#/?page=${page}`}
                id={page}
                onClick={this.handleOnClick}
                className={`${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}

PageNumbers.defaultProps = {
  scrollTo: -1,
};

PageNumbers.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  scrollTo: PropTypes.number,
};

const styles = {
  pageNumbers: {
    padding: '20px 0',
    '& li': {
      display: 'inline-block',
    },
    '& a': {
      border: '1px solid #eee',
      padding: '5px 10px',
      lineHeight: '1',
      textDecoration: 'none',
      color: '#333',
      '&.active': {
        backgroundColor: '#febd69',
        borderColor: '#febd69',
      },
    },
  }
};

export default injectSheet(styles)(PageNumbers);
