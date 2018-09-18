import React, { Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

class Search extends Component {

  state = {
    value: ''
  }

  reset = (event) => {
    event.preventDefault();
    this.setState({value: ''}, () => {
      this.refs.submitBtn.click();
    });
  }

  displayReset() {
    const { classes } = this.props;
    return <a href="#" onClick={this.reset} className={classes.reset}>reset</a>
  }

  onChange = (event) => {
    this.setState({value: event.target.value})
  }

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.searchWrap}>
          <form className={classes.form} onSubmit={this.props.onSubmit}>
            <input
              className={classes.searchInput}
              type="text"
              id="search"
              placeholder="Search"
              value={this.state.value}
              onChange={this.onChange}
            />
            {this.state.value && this.displayReset()}
            <button className={classes.searchButton} ref="submitBtn">
              <img src="./assets/icons/search-icon.svg" alt="search-icon" />
            </button>
          </form>
        </div>
    );
  }
}

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const styles = {
  searchWrap: {
    margin: '0',
  },
  form: {
    maxWidth: '450px',
    width: '100%',
    position: 'relative',
    display: 'flex',
  },
  searchInput: {
    border: '1px solid #eee',
    padding: '10px',
    margin: '0',
    transition: 'all 250ms ease',
    borderTopLeftRadius: '3px',
    borderBottomLeftRadius: '3px',
    width: '100%',
    fontSize: '0.8em',
    '&:focus': {
      borderColor: '#febd69',
    },
  },
  searchButton: {
    backgroundColor: '#febd69',
    border: 'none',
    borderTopRightRadius: '3px',
    borderBottomRightRadius: '3px',
  },
  reset: {
    position: 'absolute',
    right: '63px',
    top: '8px',
    fontSize: '0.8em',
  }
};

export default injectSheet(styles)(Search);
