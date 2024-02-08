import './index.css'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import {IoMdSearch} from 'react-icons/io'

const Header = () => {
  const [inputValue, setInput] = useState('')
  const onChangee = e => {
    setInput(e.target.value)
  }
  return (
    <>
      <div className="header">
        <h1 className="header-heading">movieDB</h1>
        <div className="head-right">
          <Link className="option-items" to="/">
            <h1>Popular</h1>
          </Link>
          <Link className="option-items" to="/top-rated">
            <h1>Top Rated</h1>
          </Link>
          <Link className="option-items" to="/upcoming">
            <h1>Upcoming</h1>
          </Link>

          <div className="inp">
            <input
              type="search"
              placeholder="Search"
              onChange={onChangee}
              value={inputValue}
            />
            <Link to={`/search/${inputValue}`}>
              <IoMdSearch />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default Header
