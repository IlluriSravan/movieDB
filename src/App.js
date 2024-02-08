import './App.css'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import Search from './components/Search'
import MovieDetails from './components/MovieDetails'

// write your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:id" component={MovieDetails} />
      <Route exact path="/top-rated" component={TopRated} />
      <Route exact path="/upcoming" component={Upcoming} />
      <Route exact path="/search/:sea" component={Search} />
    </Switch>
  </>
)

export default App
// <Switch>
//
//
//
// </Switch>
