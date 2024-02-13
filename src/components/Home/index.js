import './index.css'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import MovieItem from '../MovieItem'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Home = () => {
  const [jobsList, setJobsList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [page, setPage] = useState(1)
  const [inputValue, setInput] = useState('')
  const onChangee = e => {
    setInput(e.target.value)
  }

  useEffect(() => {
    const getMovies = async () => {
      setApiStatus(apiStatusConstants.inProgress)
      const apiToken = '064c9bb31091edd79eafe73ca134e5fa'
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiToken}&language=en-US&page=${page}`
      const response = await fetch(url)
      if (response.ok === true) {
        const data = await response.json()

        const updatedData = data.results.map(each => ({
          backdropPath: `https://image.tmdb.org/t/p/w500${each.backdrop_path}`,
          id: each.id,
          originalTitle: each.original_title,
          overview: each.overview,
          posterPath: each.poster_path,
          voteAverage: each.vote_average,
        }))

        setJobsList(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    }
    getMovies()
  }, [page])

  const nextPage = () => {
    console.log('page', page)
    if (page < 500) {
      setPage(prev => prev + 1)
    }
  }

  const previousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }

  const successView = () => (
    <ul className="movies-container">
      {jobsList.map(each => (
        <MovieItem key={each.id} details={each} />
      ))}
    </ul>
  )

  const failureView = () => (
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

  const inProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="blue" height="50" width="50" />
    </div>
  )

  const renderViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return successView()
      case apiStatusConstants.failure:
        return failureView()
      case apiStatusConstants.inProgress:
        return inProgressView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <button type="button" className="next-page" onClick={previousPage}>
        Previous Page
      </button>
      <button type="button" className="next-page" onClick={nextPage}>
        Next Page
      </button>
      <p>Page:{page}</p>
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

      <div>{renderViews()}</div>
    </>
  )
}

export default Home

// state = {
//     jobsList: [],
//     apiStatus: apiStatusConstants.initial,
//     page: 2,
//   }
