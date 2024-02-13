import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiStatusConstants4 = {
  initial4: 'INITIAL',
  success4: 'SUCCESS',
  failure4: 'FAILURE',
  inProgress4: 'IN_PROGRESS',
}

class MovieDetails extends Component {
  state = {
    jobsList4: {},
    castList: [],
    apiStatus4: apiStatusConstants4.initial4,
    page4: 1,
  }

  componentDidMount() {
    this.getMovies4()
  }

  getMovies4 = async () => {
    const {page4} = this.state
    this.setState({
      apiStatus4: apiStatusConstants4.inProgress4,
    })
    const apiToken4 = '064c9bb31091edd79eafe73ca134e5fa'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url4 = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiToken4}&language=en-US`
    const url5 = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiToken4}&language=en-US`
    const response4 = await fetch(url4)
    const response5 = await fetch(url5)
    if (response4.ok === true) {
      const data4 = await response4.json()
      const data5 = await response5.json()
      console.log('daata4', data4)
      const updatedData4 = {
        originalTitle: data4.original_title,
        posterPath: data4.poster_path,
        voteAverage: data4.vote_average,
        runTime: data4.runtime,
        genres: data4.genres.map(ev => ev.name),
        overview: data4.overview,
        releaseDate: data4.release_date,
        id: data4.id,
      }
      const updatedData5 = {
        cast: data5.cast.map(each => ({
          profilePath: each.profile_path,
          originalName: each.original_name,
          character: each.character,
          id: each.id,
        })),
      }
      console.log('each', updatedData4)
      this.setState({
        jobsList4: updatedData4,
        castList: updatedData5,
        apiStatus4: apiStatusConstants4.success4,
      })
    } else {
      this.setState({
        apiStatus4: apiStatusConstants4.failure4,
      })
    }
  }

  successView4 = () => {
    const {jobsList4, castList} = this.state
    const {
      originalTitle,
      posterPath,
      voteAverage,
      runTime,
      genres,
      overview,
      releaseDate,
      id,
    } = jobsList4
    const img4 = `https://image.tmdb.org/t/p/w500${posterPath}`
    return (
      <>
        <div className="movie-cont">
          <div className="left">
            <h1>Title:{originalTitle}</h1>
            <p>Rating:{voteAverage}</p>
            <h1>Genres:</h1>
            <ul>
              {genres.map(each => (
                <p>{each}</p>
              ))}
            </ul>
            <p>Run Time:{runTime}</p>
            <p>Overview:{overview}</p>
            <p>Release Date: {releaseDate}</p>
          </div>
          <div className="each-img">
            <img src={img4} className="rt1" />
          </div>
        </div>

        <div className="right">
          <h1>Cast</h1>
          <ul className="cast-cont">
            {castList.cast.map(each => {
              const castImg =
                each.profilePath !== null
                  ? `https://image.tmdb.org/t/p/w500${each.profilePath}`
                  : 'https://st2.depositphotos.com/3904951/11584/v/950/depositphotos_115849146-stock-illustration-photo-picture-web-icon-in.jpg'
              return (
                <li key={each.id} className="cast-item">
                  <img src={castImg} className="cast-img" />
                  <p>Name:{each.originalName}</p>
                  <p>Character:{each.character}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </>
    )
  }

  failureView4 = () => (
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

  inProgressView4 = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  renderViews4 = () => {
    const {apiStatus4} = this.state

    switch (apiStatus4) {
      case apiStatusConstants4.success4:
        return this.successView4()
      case apiStatusConstants4.failure4:
        return this.failureView4()
      case apiStatusConstants4.inProgress4:
        return this.inProgressView4()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderViews4()}</div>
      </>
    )
  }
}

export default MovieDetails
