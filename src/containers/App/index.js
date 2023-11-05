import React from 'react'
import { connect } from "react-redux"
import { Route } from 'react-router-dom'
import { webSocketReceived } from '../../actions/actionCreators'
import PropTypes from "prop-types";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Header from '../../components/Header/Header'
import {deepObject} from "../../utilities/object-utils";
import Home from '../Home'
import Detail from '../Detail'

import './styles/app.scss';

const bitfinex = new W3CWebSocket('wss://api-pub.bitfinex.com/ws/2');

class App extends React.Component {

  componentWillMount() {

    const symbols = Object.keys( this.props.tickers );

    bitfinex.onopen = () => {
      for ( let i = 0; i < symbols.length; i++ ) {
        bitfinex.send(JSON.stringify({
          event: 'subscribe',
          channel: 'ticker',
          symbol: symbols[i]
        }))
      }
    };
    bitfinex.onmessage = (message) => {
      const data = JSON.parse( deepObject( message, 'data' ) || "{}" );
      this.props.webSocketReceived( data );
    };
  }

  componentWillUnmount() {
    bitfinex.close();
  }

  render() {

    return (
      <div className="page">
        <div className="page__row">
          <div className="page__contain">
            <Header />
            <main>
              <Route exact path="/" component={Home} />
              <Route path="/detail/:pair" component={Detail} />
            </main>
          </div>
        </div>
      </div>
    )
  }

}

App.propTypes = {
  tickers: PropTypes.object,
  ui: PropTypes.object
};

App.defaultProps = {
  tickers: {},
  ui: {}
};

export const mapStateToProps = (state = {}) => ({
  tickers: state.tickers,
  ui: state.ui
});

export const mapDispatchToProps = dispatch => ({
  webSocketReceived: (data) => dispatch(webSocketReceived(data)),
});

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ConnectedApp;
