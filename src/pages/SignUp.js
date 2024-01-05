import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AtSymbolIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import authBackground from "../assets/authBackground.jpg";
import googleLogo from "../assets/googleLogo.svg";
import { createUser } from "../utils/userUtils";

const SignUp = () => {

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focused, setFocused] = useState("false");


  const handleSignUp = async (e) => {
    e.preventDefault();

    const signUpParams = {
      username,
      email,
      password
    }

    console.log(signUpParams)


    try {
      const response = await createUser(signUpParams);
      console.log(response.message);
      // Handle success, e.g., redirect or show a success message
    } catch (error) {
      console.error(error.message);
      // Handle error, e.g., display error message to the user
    }
  }


  return (
    <section className="bg-white text-sm md:grid md:grid-cols-2 justify-items-center">
      <div className=" max-w-sm mx-auto px-4 py-16 ">
        <div className="text-center mb-9">
          <h2 className="text text-3xl font-medium mb-4">
            Welcome <span className="text-[#1B6FA8]">back</span>!
          </h2>
          <p className="text-sm text-gray-500">
            Discover manga, manhua and manwa, track your progress, have fun read
            manga.
          </p>
        </div>

        <form action="">
          {/* Name Input */}
          <div className="relative mb-16">
            <input
              type="text"
              placeholder="Name"
              className="peer h-11 w-full border-2 border-gray-400 rounded-lg pl-4 pr-12 text-gray-500 text-sm placeholder-transparent"
              value={username}
              pattern={`^[A-Za-z0-9]{3,16}$`}
              required
              focused={focused}
              onBlur={() => setFocused("true")}
              onChange={(e) => setUserName(e.target.value)}
            />
            <span className="absolute -bottom-12 form-span">Username should be 3-16 characters and shouldn't include any special character!</span>
            <label className="absolute peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0 left-3 -translate-y-1/2 bg-white px-1 duration-300">
              Name
            </label>
            <UserIcon className="h-5 w-5 absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Email Input */}
          <div className="relative mb-16">
            <input
              type="email"
              placeholder="Email"
              className="peer h-11 w-full border-2 border-gray-400 rounded-lg pl-4 pr-12 text-gray-500 text-sm placeholder-transparent"
              value={email}
              // pattern={`[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+`}
              pattern={`[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+`}
              required
              focused={focused}
              onBlur={() => setFocused("true")}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="absolute -bottom-12 form-span">It should be a valid email address!</span>
            <label className="absolute peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0 left-3 -translate-y-1/2 bg-white px-1 duration-300">
              Email
            </label>
            <AtSymbolIcon className="h-5 w-5 absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Password Input */}
          <div className="relative mb-16">
            <input
              type="password"
              placeholder="Password"
              className="peer h-11 w-full border-2 border-gray-400 rounded-lg pl-4 pr-12 text-gray-500 text-sm placeholder-transparent"
              value={password}
              pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
              required
              focused={focused}
              onBlur={() => setFocused("true")}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="absolute -bottom-12 form-span">Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!</span>
            <label className="absolute peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0 left-3 -translate-y-1/2 bg-white px-1 duration-300">
              Password
            </label>

            <LockClosedIcon className="h-5 w-5 absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Confirm Password Input */}
          <div className="relative mb-16">
            <input
              type="password"
              placeholder="Confirm Password"
              className="peer h-11 w-full border-2 border-gray-400 rounded-lg pl-4 pr-12 text-gray-500 text-sm placeholder-transparent"
              value={confirmPassword}
              pattern={password}
              onFocus={() => setFocused("true")}
              required
              focused={focused}
              onBlur={() => setFocused("true")}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="absolute -bottom-8 form-span">Passwords don't match!</span>
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
          <button
            className="h-11 w-full  text-center font-semibold text-white bg-[#1B6FA8] hover:bg-[#155580] rounded-lg  mb-5"
            onClick={handleSignUp}
          >
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
