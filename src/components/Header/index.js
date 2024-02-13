import './index.css'
import {Link} from 'react-router-dom'
import {useState} from 'react'

const Header = () => (
  <>
    <div className="header">
      <div className="header-heading">
        <h1 className="header-heading">movieDB</h1>
      </div>

      <div className="head-right">
        <Link className="option-items" to="/">
          <h1 className="cat">Popular</h1>
        </Link>
        <Link className="option-items" to="/top-rated">
          <h1 className="cat">Top Rated</h1>
        </Link>
        <Link className="option-items" to="/upcoming">
          <h1 className="cat">Upcoming</h1>
        </Link>
      </div>
    </div>
  </>
)

export default Header
// <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwIL8bNPb4TxfgyTAKaXpNBuxLzztq7ZPuKg&usqp=CAU"
//                 className="sear"
//               />
