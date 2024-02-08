import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const MovieItem = props => {
  const {details} = props
  const {backdropPath, id, originalTitle, voteAverage} = details
  const image = `https://image.tmdb.org/t/p/w500${backdropPath}`
  return (
    <>
      <div className="movie-item">
        <img src={image} alt={originalTitle} className="img" />
        <div className="det">
          <h1>{originalTitle}</h1>
          <p>{voteAverage}</p>
          <Link to={`/${id}`}>
            <button type="button" className="button">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
export default MovieItem
