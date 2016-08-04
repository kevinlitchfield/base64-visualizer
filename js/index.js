import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.js'
import '!style!css!../css/reset.css'
import '!style!css!sass!../css/style.sass'

ReactDOM.render(
  <div className='container'>
    <App />
  </div>
  , document.getElementById('app')
)
