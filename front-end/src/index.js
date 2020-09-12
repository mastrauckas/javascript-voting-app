import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createGlobalStyle } from 'styled-components'

createGlobalStyle`
  html {
    font-family: sans-serif;
    font-size: 90%;
  }

  body {
    font-size: 14px;
    font-size: 1.4rem;
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
