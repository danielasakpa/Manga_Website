import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authBackground from "../assets/images/authBackground.jpg";
import googleLogo from "../assets/svg/googleLogo.svg";
import { createUser } from "../API/user/user";
import showToast from '../utils/toastUtils';
import { TailSpin } from 'react-loader-spinner'
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
      navigate('/login');
      showToast(`User was successfully Created`, "success");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <section className="text-sm bg-white md:grid md:grid-cols-2 justify-items-center">
      <div className="max-w-sm px-4 py-16 mx-auto ">
        <div className="text-center mb-9">
          <h2 className="mb-4 text-3xl font-medium text">
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
              className="peer h-full w-full rounded-[3px] border-2 border-gray-500 !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              value={username}
              pattern={`^[A-Za-z0-9]{3,16}$`}
              required
              focused={focused}
              onBlur={() => setFocused("true")}
              onChange={(e) => setUserName(e.target.value)}
            />
            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Username should be 3-16 characters and shouldn't include any special character!</span>
            <label className="absolute top-0 px-1 duration-300 -translate-y-1/2 bg-white peer-placeholder-shown:top-1/2 peer-focus:top-0 left-3">
              Name
            </label>
          </div>

          {/* Email Input */}
          <div className="relative mb-5">
            <input
              type="email"
              placeholder="Email"
              className="peer h-full w-full rounded-[3px] border-2 border-gray-500 !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              value={email}
              pattern={`[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+`}
              required
              focused={focused}
              onBlur={() => setFocused("true")}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">It should be a valid email address!</span>
            <label className="absolute top-0 px-1 duration-300 -translate-y-1/2 bg-white peer-placeholder-shown:top-1/2 peer-focus:top-0 left-3">
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative mb-5">
            <input
              type="password"
              placeholder="Password"
              className="peer h-full w-full rounded-[3px] border-2 border-gray-500 !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              value={password}
              pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
              required
              focused={focused}
              onBlur={() => setFocused("true")}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!</span>
            <label className="absolute top-0 px-1 duration-300 -translate-y-1/2 bg-white peer-placeholder-shown:top-1/2 peer-focus:top-0 left-3">
              Password
            </label>
          </div>

          {/* Confirm Password Input */}
          <div className="relative mb-5">
            <input
              type="password"
              placeholder="Confirm Password"
              className="peer h-full w-full rounded-[3px] border-2 border-gray-500 !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
              value={confirmPassword}
              pattern={password}
              onFocus={() => setFocused("true")}
              required
              focused={focused}
              onBlur={() => setFocused("true")}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Passwords don't match!</span>
            <label className="absolute top-0 px-1 duration-300 -translate-y-1/2 bg-white peer-placeholder-shown:top-1/2 peer-focus:top-0 left-3">
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
            className="h-11 w-full text-center font-semibold text-white bg-[#1B6FA8] hover:bg-[#155580] rounded-[3px] mb-5"
            onClick={handleSignUp}
          >
            {isLoading ? <TailSpin
              height="20"
              width="20"
              color="#ffffff"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            /> : "Sign Up"}
          </button>
          <button
            className="flex items-center justify-center w-full gap-2 mb-4 text-gray-500 border-2 border-gray-400 rounded-[3px] h-11">
            <img
              src={googleLogo}
              alt="google"
              className="inline-block w-6 h-6"
            />
            <span>Sign in with Google</span>
          </button>
        </form>

        <div className="font-semibold text-center text-gray-600">
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
        className="w-full h-full"
        alt="auth background"
      />
    </section>
  );
};

export default SignUp;
