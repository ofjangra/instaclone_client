import React from 'react'
import reactDom from 'react-dom/client'
import "./styles/main.css"
import store from './redux/store'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'


import App from './App'

const root = reactDom.createRoot(document.querySelector('.root'))

root.render(
<Provider store = {store}>
<BrowserRouter>
<App/>
</BrowserRouter>
</Provider>
)
