import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetails extends Component {
  state = {
    jobsList: {},
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
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiToken}&language=en-US`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      console.log('de', data)
      const updatedData = {
        originalTitle: data.original_title,
        posterPath: data.poster_path,
        voteAverage: data.vote_average,
        runTime: data.runtime,
        genres: data.genres.map(ev => ev.name),
        overview: data.overview,
        releaseDate: data.release_date,
        id: data.id,
      }
      console.log('each', updatedData)
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
    const {
      originalTitle,
      posterPath,
      voteAverage,
      runTime,
      genres,
      overview,
      releaseDate,
      id,
    } = jobsList
    const img = `https://image.tmdb.org/t/p/w500${posterPath}`
    return (
      <>
        <div className="movie-cont">
          <div className="left">
            <h1>{originalTitle}</h1>
            <p>{voteAverage}</p>
            <ul>
              {genres.map(each => (
                <p>{each}</p>
              ))}
            </ul>
            <p>Run Time:{runTime}</p>
            <p>Overview:{overview}</p>
            <p>Release Date: {releaseDate}</p>
          </div>
          <img src={img} className="each-img" />
        </div>
      </>
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

export default MovieDetails
