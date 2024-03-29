import React from 'react';
import ApiContext from '../../ApiContext';
import './HomePage.css';

export default class HomePage extends React.Component{
  static contextType = ApiContext;

  calculateTotalEarnings = () => {
    let totalEarnings = 0;
    this.context.sessionsList.forEach(session => {
      let sessionEarnings = session.cashed_out - session.buy_in;
      totalEarnings = totalEarnings + sessionEarnings;
    })

    return totalEarnings;
  }
  
  calculateWinRate = () => {
    let sessionWinRates = this.context.sessionsList.map(session => {
      return (session.cashed_out - session.buy_in) / session.session_length / session.big_blind
    })
    console.log(sessionWinRates)
    let sessionWinRatesSum = sessionWinRates.reduce((a, b) => (a + b), 0)
    return (sessionWinRatesSum / sessionWinRates.length).toFixed(2)
  }
  
  render(){
    return(
      <div className='homePage'>
        <h2>Your Summary</h2>
        <h3>${this.calculateTotalEarnings()} Total Profit</h3>
        <h3>Most Played Stake: $5/$10</h3>
        <h3>{this.context.sessionsList.length} Sessions Played</h3>
        <h3>{this.calculateWinRate()} BB/hr</h3>
      </div>
  )
  }
}