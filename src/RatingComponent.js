import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './Rating.css'


/**
* @description Creates rating component based on localStorage data
*              this was based off code React Up & Running by Stefanov
* @constructor
*/
class Rating extends Component {


  render() {
    const stars = [];
    const maxStars = 5;
    for ( let i =1; i <= maxStars; i++ ) {
      stars.push(
        <span
          className={i <= maxStars ? 'RatingOn' : null}
          key={i}
        > &#9734; </span>
      );
    }
    return(
      <div
        className={styles.Rating}
      >
        {stars}
      </div>
    )
  }
}

export default Rating
