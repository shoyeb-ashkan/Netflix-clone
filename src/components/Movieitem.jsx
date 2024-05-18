import React, { useState } from "react";
import { createImageUrl } from "../Services/movieServices";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../Services/firebase";
import { useUserAuth } from "../context/AuthContext";

const Movieitem = ({ movie }) => {
  const { title, backdrop_path, poster_path } = movie;
  const [like, setLike] = useState(false);
  const { user } = useUserAuth();

  const markFavourite = async () => {
    const userEmail = user?.email;

    if (userEmail) {
      const userDoc = doc(db, "users", userEmail);
      setLike(!like);

      await updateDoc(userDoc, {
        favourite: arrayUnion({ ...movie }),
      });
    } else {
      alert("Please login to save the movie");
    }
  };
  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
      <img
        className="w-full h-40 block object-cover object-top"
        src={createImageUrl(backdrop_path ?? poster_path, "w500")}
        alt={title}
      />
      <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
        <p className="whitespace-normal text-xs flex justify-center items-center h-full">
          {movie.title}
        </p>
        <p onClick={markFavourite}>
          {like ? (
            <FaHeart className="absolute top-2 left2 text-gray-300" size={20} />
          ) : (
            <FaRegHeart
              className="absolute top-2 left2 text-gray-300"
              size={20}
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default Movieitem;
