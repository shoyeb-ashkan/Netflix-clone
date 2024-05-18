import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";

const Login = () => {
  const [rememberLogin, setRememberLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);

      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setErr("Invalid email or password.");
          break;
        case "auth/wrong-password":
          setErr("Invalid email or password.");
          break;
        case "auth/invalid-credential":
          setErr("Invalid email or password.");
          break;
        default:
          setErr("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <div className="w-full h-screen">
      <img
        className=" hidden sm:block absolute w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/41c789f0-7df5-4219-94c6-c66fe500590a/3149e5eb-4660-4e3d-9e65-b1e615229c64/IN-en-20240513-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="large background"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen" />

      <div className="fixed w-full px-4 py-24 z-20">
        <div className="max-w-[450px] h-[500px] mx-auto bg-black/80 rounded-lg">
          <div className="max-w-[320px] mx-auto  py-16">
            <h1 className="text-3xl font-nsans-bold capitalize">sign in</h1>
            <form
              action="submit"
              className="flex flex-col py-4 w-full"
              onSubmit={handleSubmit}
            >
              <input
                className="p-3 my-2 bg-gray-700 rounded"
                type="email"
                placeholder="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="p-3 my-2 bg-gray-700 rounded"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {err ? (
                <p className="font-nsans-bold pt-2 text-sm text-red-600">
                  {err}
                </p>
              ) : (
                ""
              )}
              <button className="bg-red-600 py-3 my-6 rounded font-nsans-bold">
                Sign In
              </button>

              <div className="flex justify-between items-center text-gray-600">
                <p>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={rememberLogin}
                    value={email}
                    onChange={() => setRememberLogin(!rememberLogin)}
                  />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="my-4">
                <span className="text-gray-600 mr-2">New to Netflix?</span>
                <Link to="/signup">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
