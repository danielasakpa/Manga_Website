import { Link } from "react-router-dom";
import {
  AtSymbolIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import authBackground from "../assets/authBackground.jpg";
import googleLogo from "../assets/googleLogo.svg";

const SignUp = () => {
  return (
    <section className="bg-white text-sm md:grid md:grid-cols-2 justify-items-center">
      <div className=" max-w-sm mx-auto px-4 py-16 ">
        <div className="text-center mb-9">
          <h2 className="text text-3xl font-medium mb-4">
            Welcome <span className="text-[#1B6FA8]">back</span>!
          </h2>
          <p className="text-sm text-gray-500">
            Discover manga, manhua manwa, track your progress, have fun read
            manga.
          </p>
        </div>

        <form action="">
          {/* Name Input */}
          <div className="relative mb-7">
            <input
              type="text"
              placeholder="Name"
              className="peer h-11 w-full border-2 border-gray-400 rounded-lg pl-4 pr-12 text-gray-500 text-sm placeholder-transparent"
            />
            <label className="absolute peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0 left-3 -translate-y-1/2 bg-white px-1 duration-300">
              Name
            </label>
            <UserIcon className="h-5 w-5 absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Email Input */}
          <div className="relative mb-7">
            <input
              type="email"
              placeholder="Email"
              className="peer h-11 w-full border-2 border-gray-400 rounded-lg pl-4 pr-12 text-gray-500 text-sm placeholder-transparent"
            />
            <label className="absolute peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0 left-3 -translate-y-1/2 bg-white px-1 duration-300">
              Email
            </label>
            <AtSymbolIcon className="h-5 w-5 absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Password Input */}
          <div className="relative mb-7">
            <input
              type="password"
              placeholder="Password"
              className="peer h-11 w-full border-2 border-gray-400 rounded-lg pl-4 pr-12 text-gray-500 text-sm placeholder-transparent"
            />
            <label className="absolute peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0 left-3 -translate-y-1/2 bg-white px-1 duration-300">
              Password
            </label>

            <LockClosedIcon className="h-5 w-5 absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              className="peer h-11 w-full border-2 border-gray-400 rounded-lg pl-4 pr-12 text-gray-500 text-sm placeholder-transparent"
            />
            <label className="absolute peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0 left-3 -translate-y-1/2 bg-white px-1 duration-300">
              Confirm Password
            </label>

            <LockClosedIcon className="h-5 w-5 absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Checkbox input */}
          <div className="flex items-center gap-2 my-4">
            <input type="checkbox" />
            <label>Send notification to my email</label>
          </div>

          {/* Buttons */}
          <button className="h-11 w-full  text-center font-semibold text-white bg-[#1B6FA8] hover:bg-[#155580] rounded-lg  mb-5">
            Sign Up
          </button>
          <button className="h-11 w-full flex gap-2 justify-center items-center border-2 border-gray-400 rounded-lg text-gray-500 mb-4">
            <img
              src={googleLogo}
              alt="google"
              className="h-6 w-6 inline-block"
            />
            <span>Sign in with Google</span>
          </button>
        </form>

        <div className="text-center font-semibold text-gray-600">
          <p className="mb-3">
            Already have an account?{" "}
            <Link to="/login" className="text-[#1B6FA8]">
              Log in
            </Link>
          </p>
          <p>
            Go back to{" "}
            <Link to="/" className="text-[#1B6FA8]">
              Home page
            </Link>
          </p>
        </div>
      </div>

      <img
        src={authBackground}
        className="h-full w-full"
        alt="auth background"
      />
    </section>
  );
};

export default SignUp;
