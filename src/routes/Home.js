
import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: []
  }

  //async await를 하는 것운 우리가 기본적으로 javaScript에게 getMovies function에게 조금 시간이 필요하고 우리는 그걸 기다려야만 한다는 것을 말하는 것.
  //만약 이렇게 하지 않으면 javascript는 function을 기다리지 않음.
  //그리고 이걸 하기 위해 더 많은 코드가 필요한 다른 일을 해야될 것임.
  //그래서 이런 경우에는 우리가 async await를 써야함. 접근이 끝날 때까지 기다린다.
  getMovies = async () => {
    const {
      data: {
        data :{ movies }
      }
    } = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");  //movies.data.data.movies 이거랑 같은 의미..
    console.log(movies);
    this.setState({movies, isLoading: false}); //movies(state에 있는) : movies(axios에서 가져온) 표현과 같음.
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const {isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (<div className="loader">
            <span className="loader_text">Loading...</span>
          </div>) 
          : (
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
    );
  };
};

export default Home;
