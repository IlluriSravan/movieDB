import './index.css'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import MovieItem from '../MovieItem'
import Header from '../Header'

const apiStatusConstants1 = {
  initial1: 'INITIAL',
  success1: 'SUCCESS',
  failure1: 'FAILURE',
  inProgress1: 'IN_PROGRESS',
}

const Search = props => {
  const [jobsList1, setJobsList1] = useState([])
  const [apiStatus1, setApiStatus1] = useState(apiStatusConstants1.initial)
  const [page1, setPage1] = useState(1)

  useEffect(() => {
    const getMovies1 = async () => {
      console.log('page', page1)
      setApiStatus1(apiStatusConstants1.inProgress)
      const {match} = props
      const {params} = match
      const {sea} = params
      console.log('sea', sea)
      const apiToken1 = '064c9bb31091edd79eafe73ca134e5fa'
      // const url = `https://api.themoviedb.org/3/search/movie/?api_key=${apiToken}&language=en-US&query=${sea}&page=${page}`
      const url1 = `https://api.themoviedb.org/3/search/movie?api_key=${apiToken1}&language=en-US&query=${sea}&page=${page1}`
      const response1 = await fetch(url1)
      if (response1.ok === true) {
        const data1 = await response1.json()
        console.log(data1)
        const updatedData1 = data1.results.map(each => ({
          backdropPath: `https://image.tmdb.org/t/p/w500${each.backdrop_path}`,
          id: each.id,
          originalTitle: each.title,
          overview: each.overview,
          posterPath: each.poster_path,
          voteAverage: each.vote_average,
        }))
        console.log(updatedData1)
        setJobsList1(updatedData1)
        setApiStatus1(apiStatusConstants1.success1)
      } else {
        setApiStatus1(apiStatusConstants1.failure1)
      }
    }
    getMovies1()
  }, [page1])

  const successView1 = () => (
    <ul className="movies-container">
      {jobsList1.map(each => (
        <MovieItem key={each.id} details={each} />
      ))}
    </ul>
  )

  const failureView1 = () => (
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

  const inProgressView1 = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderViews1 = () => {
    switch (apiStatus1) {
      case apiStatusConstants1.success1:
        return successView1()
      case apiStatusConstants1.failure1:
        return failureView1()
      case apiStatusConstants1.inProgress1:
        return inProgressView1()
      default:
        return null
    }
  }

  return (
    <>
      <Header />

      <div>{renderViews1()}</div>
    </>
  )
}

export default Search

// state = {
//     jobsList: [],
//     apiStatus: apiStatusConstants.initial,
//     page: 2,
//   }
// <button type="button" className="next-page" onClick={previousPage1}>
//         Previous Page
//       </button>
//       <button type="button" className="next-page" onClick={nextPage1}>
//         Next Page
//       </button>
//       <p>Page:{page1}</p>
// const nextPage1 = () => {
//     console.log('page', page1)
//     if (page1 < 500) {
//       setPage1(prev => prev + 1)
//     }
//   }

//   const previousPage1 = () => {
//     if (page1 > 1) {
//       setPage1(prev => prev - 1)
//     }
//   }
