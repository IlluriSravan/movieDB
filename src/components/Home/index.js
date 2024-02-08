import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieItem from '../MovieItem'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    page: 2,
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async () => {
    const {page} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiToken = '064c9bb31091edd79eafe73ca134e5fa'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiToken}&language=en-US&page=${page}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        originalTitle: each.original_title,
        overview: each.overview,
        posterPath: each.poster_path,
        voteAverage: each.vote_average,
      }))
      console.log(updatedData)
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  successView = () => {
    const {jobsList} = this.state
    return (
      <ul className="movies-container">
        {jobsList.map(each => (
          <MovieItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  failureView = () => (
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

  inProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.inProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderViews()}</div>
      </>
    )
  }
}

export default Home
