import './index.css'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import MovieItem from '../MovieItem'
import Header from '../Header'

const apiStatusConstants3 = {
  initial3: 'INITIAL',
  success3: 'SUCCESS',
  failure3: 'FAILURE',
  inProgress3: 'IN_PROGRESS',
}

const Upcoming = () => {
  const [jobsList3, setJobsList3] = useState([])
  const [apiStatus3, setApiStatus3] = useState(apiStatusConstants3.initial3)
  const [page3, setPage3] = useState(1)
  const [inputValue, setInput] = useState('')
  const onChangee = e => {
    setInput(e.target.value)
  }

  useEffect(() => {
    const getMovies3 = async () => {
      setApiStatus3(apiStatusConstants3.inProgress3)
      const apiToken3 = '064c9bb31091edd79eafe73ca134e5fa'
      const url3 = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiToken3}&language=en-US&page=${page3}`
      const response3 = await fetch(url3)
      if (response3.ok === true) {
        const data3 = await response3.json()
        console.log('up', data3)
        const updatedData3 = data3.results.map(each => ({
          backdropPath: `https://image.tmdb.org/t/p/w500${each.backdrop_path}`,
          id: each.id,
          originalTitle: each.title,
          overview: each.overview,
          posterPath: each.poster_path,
          voteAverage: each.vote_average,
        }))
        console.log('up3', updatedData3)
        setJobsList3(updatedData3)
        setApiStatus3(apiStatusConstants3.success3)
      } else {
        setApiStatus3(apiStatusConstants3.failure3)
      }
    }
    getMovies3()
  }, [page3])

  const nextPage3 = () => {
    console.log('page', page3)
    if (page3 < 500) {
      setPage3(prev => prev + 1)
    }
  }

  const previousPage3 = () => {
    if (page3 > 1) {
      setPage3(prev => prev - 1)
    }
  }

  const successView3 = () => (
    <ul className="movies-container">
      {jobsList3.map(each => (
        <MovieItem key={each.id} details={each} />
      ))}
    </ul>
  )

  const failureView3 = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for
      </p>
    </div>
  )

  const inProgressView3 = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderViews3 = () => {
    switch (apiStatus3) {
      case apiStatusConstants3.success3:
        return successView3()
      case apiStatusConstants3.failure3:
        return failureView3()
      case apiStatusConstants3.inProgress3:
        return inProgressView3()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <button type="button" className="next-page" onClick={previousPage3}>
        Previous Page
      </button>
      <button type="button" className="next-page" onClick={nextPage3}>
        Next Page
      </button>
      <p>Page:{page3}</p>
      <div className="inp">
        <input
          type="search"
          placeholder="Search"
          onChange={onChangee}
          value={inputValue}
        />
        <Link to={`/search/${inputValue}`}>
          <button type="button" className="sear">
            Search
          </button>
        </Link>
      </div>
      <div>{renderViews3()}</div>
    </>
  )
}

export default Upcoming

// state = {
//     jobsList: [],
//     apiStatus: apiStatusConstants.initial,
//     page: 2,
//   }
