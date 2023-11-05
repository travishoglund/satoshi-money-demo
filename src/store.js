import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import * as History from 'history'
import rootReducer from './reducers'

export const history = History.createBrowserHistory()

const initialState = {
  tickers: {
    "tBTCUSD": { "symbol": "tBTCUSD", "title": "BTC / USD" },
    "tBTCEUR": { "symbol": "tBTCEUR", "title": "BTC / EUR" },
    "tBTCGBP": { "symbol": "tBTCGBP", "title": "BTC / GBP" },
    "tBTCJPY": { "symbol": "tBTCJPY", "title": "BTC / JPY" },
  },
  ui: {}
}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export default createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
)
