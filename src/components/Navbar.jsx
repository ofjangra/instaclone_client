import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () =>{
    return(
        <>
        <nav className='mainNav'>
  <div className= "logo">
    <Link to = "/" className="brand-logo link">Instagram</Link>
  </div>
  <div className = "links">
    <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><Link  className='link' to = "/signin">Signin</Link></li>
      <li><Link className = "link" to = "/signup">Signup</Link></li>
      <li><Link className='link' to = "/profile">Profile</Link></li>
      <li><Link className='link' to = "/createpost">Create</Link></li>
    </ul>
  </div>
</nav>
        </>
    )
}

export default Navbar