import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useUserAuth } from "../context/AuthContext";
import { db } from "../Services/firebase";
import { createImageUrl } from "../Services/movieServices";
import { useEffect, useState } from "react";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [movies, setMovies] = useState([]);
  const { user } = useUserAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setMovies(doc.data().favourite);
      });
    }
  }, [user?.email]);
  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft += offset;
  };

  const unlikeShow = async (movie) => {
    const userDoc = doc(db, "users", user.email);

    await updateDoc(userDoc, {
      favourite: arrayRemove(movie),
    });
  };

  if (!user) {
    return (
      <>
        <p>fetching shows...</p>
      </>
    );
  }

  return (
    <div>
      <div>
        <img
          className="block w-full h-[500px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/41c789f0-7df5-4219-94c6-c66fe500590a/3149e5eb-4660-4e3d-9e65-b1e615229c64/IN-en-20240513-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]" />

        <div className="absolute top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-nsans-bold my-2">
            My Shows
          </h1>
          <p className="font-nsans-light text-gray-400 text-lg">{user.email}</p>
        </div>
      </div>

      <h2 className="p-4 font-nsans-bold md:text-xl capitalize">Favourites</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slide(-500)}
          size={40}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 hidden group-hover:block cursor-pointer z-10 "
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
            >
              <img
                className="w-full h-40 block object-cover object-top"
                src={createImageUrl(
                  movie.backdrop_path ?? movie.poster_path,
                  "w500"
                )}
                alt={movie.title}
              />
              <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                <p className="whitespace-normal text-xs flex justify-center items-center h-full">
                  {movie.title}
                </p>
                <p>
                  <AiOutlineClose
                    size={30}
                    className="top-2 right-2 absolute"
                    onClick={() => unlikeShow(movie)}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>

        <MdChevronRight
          onClick={() => slide(500)}
          size={40}
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 hidden group-hover:block cursor-pointer z-10 "
        />
      </div>
    </div>
  );
};

export default Profile;
