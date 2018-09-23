import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import Search from '../Search';

function Header(props) {
  const { classes, onSearch } = props;

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Search onSubmit={onSearch} />
        <Link className={classes.link} to="/orders">Orders &#10095;</Link>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: 'absolute',
    width: '100%',
    padding: '15px 0',
  },
  container: {
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
    padding: '0 15px',
  },
  link: {
    margin: '10px 0 0',
    color: '#fff',
    display: 'inline-block',
    textDecoration: 'none',
  },
};

export default injectSheet(styles)(Header);
