import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { store } from './src/store/store'
import { Provider } from 'react-redux'
import MainTab from './src/navigation/index.js'


ReactDOM.render(
  <Provider store={store}>
  <App/>
    <MainTab />
  </Provider>,
  document.getElementById('root')
)