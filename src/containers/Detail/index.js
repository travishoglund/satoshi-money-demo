import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { formatPrice, getCurrencySymbol } from '../../utilities/number-utils'
import Loader from '../../components/Loader/Loader'

import "./Detail.scss";
const cb = "ct-detail";

const Detail = (props) => {

  const {pair} = useParams();
  const details = props.tickers[pair];

  return (
    <div className={cb}>
      <Link to={'/'} className={`${cb}__back`}>&lt; Back</Link>
      <h1 className={`${cb}__title`}>{details.title} Details</h1>
      {details.bid ? (
        <table>
          <tr>
            <td>Bid</td>
            <td>{ getCurrencySymbol(pair) }{ formatPrice(details.bid) }</td>
          </tr>
          <tr>
            <td>Ask</td>
            <td>{ getCurrencySymbol(pair) }{ formatPrice(details.ask) }</td>
          </tr>
          <tr>
            <td>Daily Change</td>
            <td>{ getCurrencySymbol(pair) }{ formatPrice(details.daily_change) }</td>
          </tr>
          <tr>
            <td>Volume</td>
            <td>{details.volume.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Price (High)</td>
            <td>{ getCurrencySymbol(pair) }{ formatPrice(details.high) }</td>
          </tr>
          <tr>
            <td>Price (Low)</td>
            <td>{ getCurrencySymbol(pair) }{ formatPrice(details.low) }</td>
          </tr>
        </table>
      ) : (
        <Loader />
      )}
    </div>
  )
}

const mapStateToProps = ({ tickers }) => ({
  tickers: tickers
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)
