import React from 'react';
import injectSheet from 'react-jss';

function PageNumbers(props) {
  const { itemsPerPage, currentPage, total, classes, onClick } = props;
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
              onClick={onClick}
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
      '&.active': {
        backgroundColor: '#febd69',
        borderColor: '#febd69',
      },
    },
  }
};

export default injectSheet(styles)(PageNumbers);
