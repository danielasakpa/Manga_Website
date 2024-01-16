import { useState } from "react";
import { updateUser } from '../utils/userUtils';
import { XCircleIcon } from "@heroicons/react/24/outline";
import showToast from '../utils/toastUtils';

const EditProfileForm = ({ user, token, setIsEdit, type, setUser, setLoading }) => {

    const [username, setUserName] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [focused, setFocused] = useState("false");

    const handleEditUser = async (e, type) => {
        e.preventDefault();

        setLoading(true);

        setIsEdit(false);

        const editUserParams = {
            username,
            email,
            password
        };

        try {

            const userData = await updateUser(user._id, editUserParams, token);
            setUser(userData);
            setLoading(false);
            type === "Edit User" ? showToast("User Data successfully updated") : showToast("User Password successfully updated");
        } catch (error) {
            setLoading(false);
            // Handle error
            showToast(`Error updating user`, "error");
        }
    };


    const handleCloseMenu = () => {
        setIsEdit(false);
    }


    return (
        <form className="w-[90%] md:w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-end mb-4">
                <button onClick={handleCloseMenu}>
                    <XCircleIcon className="w-7 h-7 text-black" />
                </button>
            </div>

            <div className={`${type === "Edit User" ? "block" : "hidden"}`}>
                {/* Name Input */}
                <div className="flex flex-col gap-6 mb-1">
                    <h6
                        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        Edit Your Name
                    </h6>
                    <div className="relative mb-5">
                        <input
                            type="text"
                            placeholder={user.username.toUpperCase()}
                            className="peer w-full rounded-md border-2 border-gray-500 !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                            value={username}
                            // pattern={`^[a-z0-9_-]{3,15}$`}
                            required
                            focused={focused}
                            onBlur={() => setFocused("true")}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Username should be 3-16 characters and shouldn't include any special character!</span>
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-6 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">

                        </label>
                    </div>
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-6 mb-1">
                    <h6
                        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        Edit Your Email
                    </h6>
                    <div className="relative mb-5">
                        <input
                            type="email"
                            placeholder={user.email}
                            className="peer w-full rounded-md border-2 border-gray-500 !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                            value={email}
                            pattern={`[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+`}
                            required
                            focused={focused}
                            onBlur={() => setFocused("true")}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">It should be a valid email address!</span>
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-6 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        </label>
                    </div>
                </div>
            </div>

            <div className={`${type === "Change Password" ? "block" : "hidden"}`}>
                {/* Password Input */}
                <div className="flex flex-col gap-6 mb-1">
                    <h6
                        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        Enter Your Password
                    </h6>
                    <div className="relative mb-5">
                        <input
                            type="password"
                            placeholder="Password"
                            className="peer w-full rounded-md border-2 border-gray-500 !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                            value={password}
                            pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                            required
                            focused={focused}
                            onBlur={() => setFocused("true")}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!</span>
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-6 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        </label>
                    </div>
                </div>

                {/* Confirm Password Input */}
                <div className="flex flex-col gap-6 mb-1">
                    <h6
                        className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                        Confirm Your Password
                    </h6>
                    <div className="relative mb-5">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="peer w-full rounded-md border-2 border-gray-500 !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                            value={confirmPassword}
                            pattern={password}
                            onFocus={() => setFocused("true")}
                            required
                            focused={focused}
                            onBlur={() => setFocused("true")}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Passwords don't match!</span>
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-6 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        </label>
                    </div>
                </div>
            </div>


            {/* Buttons */}
            <button
                className="h-11 w-full text-center font-semibold text-white bg-[#1B6FA8] hover:bg-[#155580] rounded-lg  mb-5"
                onClick={(e) => handleEditUser(e, type)}
            >
                Update Profile
            </button>
        </form>
    )
}

export default EditProfileForm;
