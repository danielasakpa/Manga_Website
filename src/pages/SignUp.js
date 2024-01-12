import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authBackground from "../assets/authBackground.jpg";
import googleLogo from "../assets/googleLogo.svg";
import { createUser } from "../utils/userUtils";
import showToast from '../utils/toastUtils';
import { BallTriangle } from 'react-loader-spinner'
import { useAuth } from "../Auth/AuthProvider";

const SignUp = () => {

  const navigate = useNavigate();

  const { token } = useAuth();

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focused, setFocused] = useState("false");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [])

  const handleSignUp = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const signUpParams = {
      username,
      email,
      password
    }

    try {
      await createUser(signUpParams);
      setIsLoading(false);
      navigate('/login');
      showToast(`User was successfully Created`);
    } catch (error) {
      setIsLoading(false);
      showToast(error.message, "error");
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

        <form action="" >
          {/* Name Input */}
          <div className="relative mb-5">
            <input
              type="text"
              placeholder="Name"
              className="peer h-full w-full rounded-md border-2 border-gray-500 !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              value={username}
              pattern={`^[A-Za-z0-9]{3,16}$`}
              required
              focused={focused}
              onBlur={() => setFocused("true")}
              onChange={(e) => setUserName(e.target.value)}
            />
            <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Username should be 3-16 characters and shouldn't include any special character!</span>
            <label className="absolute peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0 left-3 -translate-y-1/2 bg-white px-1 duration-300">
              Name
            </label>
          </div>

          {/* Email Input */}
          <div className="relative mb-5">
            <input
              type="email"
              placeholder="Email"
              className="peer h-full w-full rounded-md border-2 border-gray-500 !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              value={email}
              // pattern={`[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+`}
              pattern={`[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+`}
              required
              focused={focused}
              onBlur={() => setFocused("true")}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">It should be a valid email address!</span>
            <label className="absolute peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0 left-3 -translate-y-1/2 bg-white px-1 duration-300">
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative mb-5">
            <input
              type="password"
              placeholder="Password"
              className="peer h-full w-full rounded-md border-2 border-gray-500 !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              value={password}
              pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
              required
              focused={focused}
              onBlur={() => setFocused("true")}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!</span>
            <label className="absolute peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0 left-3 -translate-y-1/2 bg-white px-1 duration-300">
              Password
            </label>
          </div>

          {/* Confirm Password Input */}
          <div className="relative mb-5">
            <input
              type="password"
              placeholder="Confirm Password"
              className="peer h-full w-full rounded-md border-2 border-gray-500 !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              value={confirmPassword}
              pattern={password}
              onFocus={() => setFocused("true")}
              required
              focused={focused}
              onBlur={() => setFocused("true")}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Passwords don't match!</span>
            <label className="absolute peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0 left-3 -translate-y-1/2 bg-white px-1 duration-300">
              Confirm Password
            </label>
          </div>

          {/* Confirm Password Input */}
          <div className="relative mb-5">
            <input
              type="file"
              accept="image/*"
              name="profileImage"
              className="peer h-full w-full rounded-md border-2 border-gray-500 !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Passwords don't match!</span>
            <label className="absolute peer-placeholder-shown:top-1/2 peer-focus:top-0 top-0 left-3 -translate-y-1/2 bg-white px-1 duration-300">
              Confirm Password
            </label>
          </div>

          {/* Checkbox input */}
          <div className="flex items-center gap-2 my-4">
            <input type="checkbox" />
            <label>Send notification to my email</label>
          </div>

          {/* Buttons */}
          <button
            className="h-11 w-full text-center font-semibold text-white bg-[#1B6FA8] hover:bg-[#155580] rounded-lg  mb-5"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <button
            className="h-11 w-full flex gap-2 justify-center items-center border-2 border-gray-400 rounded-lg text-gray-500 mb-4">
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
      {isLoading && (
        <>
          <div
            className={`flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
          >
            <BallTriangle
              height="80"
              width="80"
              radius={5}
              color="#ffffff"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
          <div className={`"opacity-25 fixed inset-0 z-40 bg-black`}></div>
        </>
      )}
    </section>
  );
};

export default SignUp;
