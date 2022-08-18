import React from 'react'
import reactDom from 'react-dom/client'
import "./styles/index.css"
import "./styles/Profile.css"
import "./styles/Home.css"
import "./styles/Createpost.css"
import "./styles/UserNav.css"
import "./styles/Preload.css"

import { BrowserRouter } from 'react-router-dom'


import App from './App'

const root = reactDom.createRoot(document.querySelector('.root'))

root.render(

<BrowserRouter>
<App/>
</BrowserRouter>

)
