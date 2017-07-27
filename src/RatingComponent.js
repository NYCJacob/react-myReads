import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Rating.css'
import * as localDB from './indexDB.js'


/**
* @description Creates rating component based on localStorage data
*              this was based off code React Up & Running by Stefanov
* @constructor
*/
class Rating extends Component {
  state = {
    rating : this.props.bookRating,
    tempRating : this.props.bookRating
    }


  setRating = (rating) => {
        this.setState( {
                        rating: rating,
                        tempRating : rating
                        } );
        localDB.updateRating(rating, this.props.bookId);
  }

  setTempRating = (rating) => {
    this.setState({tempRating : rating})
  }

  resetTempRating = () => {
    this.setTempRating( this.state.rating)
  }

  render() {

    const stars = [];
    const maxStars = 5;
    for ( let i =1; i <= maxStars; i++ ) {
      stars.push(
        <span
          className={i <= this.state.tempRating ? 'RatingOn' : null}
          key={i}
          onClick={() => this.setRating(i) }
          onMouseOver={() => this.setTempRating(i)}
        > &#9734; </span>
      );
    }
    return(
      <div
        className={"Rating"}
        onMouseOut={() => this.resetTempRating()}
      >
        {stars}
        <input type="hidden" value={this.state.rating} />
      </div>
    )
  }
}

export default Rating
