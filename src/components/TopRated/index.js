import './index.css'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import MovieItem from '../MovieItem'
import Header from '../Header'

const apiStatusConstants2 = {
  initial2: 'INITIAL',
  success2: 'SUCCESS',
  failure2: 'FAILURE',
  inProgress2: 'IN_PROGRESS',
}

const TopRated = () => {
  const [jobsList2, setJobsList2] = useState([])
  const [apiStatus2, setApiStatus2] = useState(apiStatusConstants2.initial2)
  const [page2, setPage2] = useState(1)
  const [inputValue, setInput] = useState('')
  const onChangee = e => {
    setInput(e.target.value)
  }

  useEffect(() => {
    const getMovies2 = async () => {
      setApiStatus2(apiStatusConstants2.inProgress2)
      const apiToken2 = '064c9bb31091edd79eafe73ca134e5fa'
      const url2 = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiToken2}&language=en-US&page=${page2}`
      const response2 = await fetch(url2)
      if (response2.ok === true) {
        const data2 = await response2.json()
        console.log('up', data2)
        const updatedData2 = data2.results.map(each => ({
          backdropPath: `https://image.tmdb.org/t/p/w500${each.backdrop_path}`,
          id: each.id,
          originalTitle: each.title,
          overview: each.overview,
          posterPath: each.poster_path,
          voteAverage: each.vote_average,
        }))
        console.log('up2', updatedData2)
        setJobsList2(updatedData2)
        setApiStatus2(apiStatusConstants2.success2)
      } else {
        setApiStatus2(apiStatusConstants2.failure2)
      }
    }
    getMovies2()
  }, [page2])

  const nextPage2 = () => {
    console.log('page', page2)
    if (page2 < 500) {
      setPage2(prev => prev + 1)
    }
  }

  const previousPage2 = () => {
    if (page2 > 1) {
      setPage2(prev => prev - 1)
    }
  }

  const successView2 = () => (
    <ul className="movies-container">
      {jobsList2.map(each => (
        <MovieItem key={each.id} details={each} />
      ))}
    </ul>
  )

  const failureView2 = () => (
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

  const inProgressView2 = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderViews2 = () => {
    switch (apiStatus2) {
      case apiStatusConstants2.success2:
        return successView2()
      case apiStatusConstants2.failure2:
        return failureView2()
      case apiStatusConstants2.inProgress2:
        return inProgressView2()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <button type="button" className="next-page" onClick={previousPage2}>
        Prev
      </button>
      <button type="button" className="next-page" onClick={nextPage2}>
        Next
      </button>
      <p>{page2}</p>
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
      <div>{renderViews2()}</div>
    </>
  )
}

export default TopRated
