import React from "react";
import Poster from "../components/Poster";
import MovieRow from "../components/MovieRow";
import endpoints from "../Services/movieServices";

const Home = () => {
  return (
    <>
      <Poster />
      <MovieRow title="upcoming" url={endpoints.upcoming} />
      <MovieRow title="trending" url={endpoints.trending} />
      <MovieRow title="top Rated" url={endpoints.topRated} />
      <MovieRow title="popular" url={endpoints.popular} />
      <MovieRow title="comedy" url={endpoints.comedy} />
    </>
  );
};

export default Home;
