import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints, { createImageUrl } from "../Services/movieServices";

const Poster = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const turncate = (str) => {
    if (!str) return;

    return str.length > 200 ? str.slice(0, 200) + "..." : str;
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(endpoints.popular);
      const movies = await resp.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(randomMovie);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <>
        <p>fetching movie...</p>
      </>
    );

  const { title, backdrop_path, release_date, overview } = movie;

  return (
    <div className="w-full h-[550px] lg:h-[700px]">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] lg:h-[700px]  bg-gradient-to-r from-black" />
        <img
          className="w-full h-full object-cover object-top"
          src={createImageUrl(backdrop_path, "original")}
          alt={title}
        />
        <div className="absolute w-[95%] left-6 top-[280px] lg:top-[400px]">
          <h1 className="text-3xl md:text-6xl font-nsans-bold">{title}</h1>
          <div className="mt-8 mb-4">
            <button className="capitalize text-black broder bg-gray-300 py-2 px-5">
              Play
            </button>
            <button className="capitalize broder border-gray-300 py-2 px-5">
              watch later
            </button>
          </div>
          <p className="text-gray-400 text-sm">{release_date}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] text-gray-200">
            {turncate(overview)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Poster;
