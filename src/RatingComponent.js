import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Rating.css'
import { db } from './indexDB.js'


/**
* @description Creates rating component based on localStorage data
*              this was based off code React Up & Running by Stefanov
* @constructor
*/
class Rating extends Component {
  state = {
    rating : this.props.bookRating
  }

  setRating(rating) {  //onclick
    console.log("setRating: " + rating);
    this.setState( {rating} )
  }

  render() {

    const stars = [];
    const maxStars = 5;
    for ( let i =1; i <= maxStars; i++ ) {
      stars.push(
        <span
          className={i <= this.state.rating ? 'RatingOn' : null}
          key={i}
          onClick={ this.setRating.bind(this,i) }
        > &#9734; </span>
      );
    }
    return(
      <div className={"Rating"}>
        {stars}
        <input type="hidden" value={this.state.rating} />
      </div>
    )
  }
}

export default Rating
