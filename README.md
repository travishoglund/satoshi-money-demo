# Satoshi Money Demo

This app was instantiated with create-react-app, and modified to support React Router Dom and Redux for state management.

## Run Locally
```
(Using Node v16)
yarn install
yarn start
```

### Notes on Development
I wanted the app to be extremely responsive to price action, so it actually connects via Websockets to the Bitfinex API. This makes the experience better for the end user and we don't have to constantly call API endpoints via timeouts.

### Tools used
- React/Redux
- React Router DOM
- Bitfinex API (https://docs.bitfinex.com/docs/ws-general)

### Currency Pairs Supported:
- BTC / USD
- BTC / EUR
- BTC / GBP
- BTC / JPY

### Views:
- Home View 
  - shows the current prices in the relevant currencies with their daily percentage changes
  - each time the price is updated, you will see it visually "flash" to notify the user of an update
- Detail View
  - shows the bid, ask, daily change, volume, highest price, and lowest price

### Additional Notes
- In production, this would have been Typescript and had unit tests implemented.