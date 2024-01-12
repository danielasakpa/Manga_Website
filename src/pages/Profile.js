// Protected.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthProvider';
import EditProfileForm from '../components/EditProfileForm';
import { Circles } from 'react-loader-spinner'
import { deleteUser } from '../utils/userUtils';
import showToast from '../utils/toastUtils';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { logout, token } = useAuth();

    const navigate = useNavigate();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [isEdit, setIsEdit] = useState({ condition: false, type: "" });
    const [newUser, setNewUser] = useState(user);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Object.keys(newUser).length > 0) {
            localStorage.setItem('user', JSON.stringify(newUser));
        }

        setUser(JSON.parse(localStorage.getItem("user")))
    }, [newUser])

    const handleEditClick = (type) => {
        setIsEdit({ condition: true, type });
    };

    const handleLogoutClick = () => {
        logout();
    };

    const handleDeleteClick = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {

            await deleteUser(user._id, token);
            logout();
            setIsLoading(false);
            navigate('/login');
            showToast("User was successfully Deleted");
        } catch (error) {
            setIsLoading(false);
            // Handle error
            showToast(error.message, "error");
        };
    }


    return (
        <>
            <div className={`${isLoading ? "bg-black" : "bg-white"} w-full h-[100vh] flex justify-center items-center relative`}>
                {
                    isLoading ?
                        <div className="popOut flex items-center justify-center">
                            <Circles
                                height="35"
                                width="35"
                                color="#ffffff"
                                ariaLabel="circles-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div> :
                        <div>
                            <h2 className="text-3xl font-semibold mb-4">User Profile Page</h2>
                            <div className="mb-4">
                                <p className="text-[25px] font-medium">{user.username}</p>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                    onClick={() => handleEditClick("Edit User")}
                                >
                                    Edit User
                                </button>
                                <button
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                                    onClick={() => handleEditClick("Change Password")}
                                >
                                    Change Password
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                    onClick={handleDeleteClick}
                                >
                                    Delete User
                                </button>
                            </div>
                            <button
                                className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                onClick={handleLogoutClick}
                            >
                                Logout
                            </button>

                            {/* Modal for editing user information */}
                            {isEdit.condition && (
                                <>
                                    <div className="fixed inset-0 flex items-center justify-center z-50">
                                        <EditProfileForm user={user} token={token} setIsEdit={setIsEdit} type={isEdit.type} setNewUser={setNewUser} setIsLoading={setIsLoading} />
                                    </div>
                                    <div className={`${isEdit.condition ? "opacity-25 fixed" : "opacity-0"} inset-0 z-40 bg-black`}></div>
                                </>
                            )}
                        </div>
                }
            </div>
        </>
    );
};

export default Profile;
