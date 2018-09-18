import React from 'react';
import injectSheet from 'react-jss';

function Hero(props) {
  const { classes } = props;

  return (
    <div className={classes.hero}>
      <div className={classes.container}>
        <div className={classes.intro}>
          <h1 className="title">Back to School</h1>
          <p className="description">Sports apparel and backpacks</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    width: '100%',
    margin: '0 auto',
    padding: '0 15px',
  },
  hero: {
    backgroundImage: 'url(./assets/images/hero_bg.jpg)',
    backgroundSize: 'cover',
    height: '300px',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    '@media (min-width: 768px)': {
      height: '500px',
    },
  },
  intro: {
    color: '#fff',
    '& .title': {
      fontSize: '3.2em',
      fontWeight: 'bold',
      lineHeight: '1',
      margin: '0 0 15px',
    },
    '& .description': {
      fontSize: '1.6em',
      fontWeight: 'lighter',
    },
  },
};

export default injectSheet(styles)(Hero);
