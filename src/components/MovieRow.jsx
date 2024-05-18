import axios from "axios";
import React, { useEffect, useState } from "react";
import Movieitem from "./Movieitem";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MovieRow = ({ title, url }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const rowId = Math.floor(Math.random() * 1000);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(url);
      const result = await resp.data.results;
      setMovies(result);
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const slide = (offset) => {
    const slider = document.getElementById("slider" + rowId);
    slider.scrollLeft += offset;
  };

  if (loading)
    return (
      <>
        <p>fetching movie...</p>
      </>
    );

  return (
    <>
      <h2 className="p-4 font-nsans-bold md:text-xl capitalize">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slide(-500)}
          size={40}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 hidden group-hover:block cursor-pointer z-10 "
        />
        <div
          id={"slider" + rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <Movieitem key={movie.id} movie={movie} />
          ))}
        </div>

        <MdChevronRight
          onClick={() => slide(500)}
          size={40}
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 hidden group-hover:block cursor-pointer z-10 "
        />
      </div>
    </>
  );
};

export default MovieRow;
