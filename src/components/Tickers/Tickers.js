import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Ticker from '../../components/Ticker/Ticker'
import { deepObject } from '../../utilities/object-utils'

import './Tickers.scss';
const cb = 'cp-tickers';

const Tickers = props => {

  const symbols = Object.keys( props.tickers );

  return (
    <div className={cb}>
      <div className={`${cb}__row`}>
        <div className={`${cb}__contain`}>
          { symbols.map( symbol => (
            <Ticker key={symbol} data={ deepObject( props.tickers, symbol ) || {} } />
          ) )}
        </div>
      </div>
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
)(Tickers)
