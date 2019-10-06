import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  }

  getMovies = async () => {
    console.log(1);
    const {
      data: {
        data: {movies}
      }
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    // console.log(movies);
    console.log(2);
    this.setState({movies, isLoading: false});
    console.log(3);
  }

  componentDidMount(){
    this.getMovies();
    console.log('i am componentDidMount');

  }

  render(){
    console.log('i am render');
    const {isLoading, movies} = this.state;
    return (
    <section className="container">
      {isLoading 
        ? (<div className="loader">
            <span className="loader__text">Loading...</span>
          </div>)
        :( 
        <div className="movies">
        {movies.map(movie => (
        <Movie
          key={movie.id}
          id={movie.id} 
          year={movie.year} 
          title={movie.title} 
          summary={movie.summary}
          poster={movie.medium_cover_image} 
          genres={movie.genres}
        />
      ))}
      </div>
      )}
    </section>
    )
  }
}

export default App;
