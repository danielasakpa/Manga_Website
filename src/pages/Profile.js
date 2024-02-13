// Protected.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthProvider';
import { useUser } from '../context/UserContext';
import EditProfileForm from '../components/EditProfileForm/EditProfileForm';
import { Circles } from 'react-loader-spinner'
import { deleteUser } from '../utils/userUtils';
import showToast from '../utils/toastUtils';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { logout, token } = useAuth();

    const { user, loading, setUser, setLoading } = useUser();

    const navigate = useNavigate();

    const [isEdit, setIsEdit] = useState({ condition: false, type: "" });

    const handleEditClick = (type) => {
        setIsEdit({ condition: true, type });
    };

    const handleLogoutClick = () => {
        logout();
    };

    const handleDeleteClick = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {

            await deleteUser(user._id, token);
            logout();
            setLoading(false);
            navigate('/login');
            showToast("User was successfully Deleted");
        } catch (error) {
            setLoading(false);
            // Handle error
            showToast(error.message, "error");
        };
    }


    return (
        <>
            <div className={`${loading ? "bg-black" : "bg-white"} w-full h-[100vh] flex justify-center items-center relative`}>
                {
                    loading ?
                        <div className="flex items-center justify-center popOut">
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
                            <h2 className="mb-4 text-3xl font-semibold">User Profile Page</h2>
                            <div className="mb-4">
                                <p className="text-[25px] font-medium">{user?.username}</p>
                                <p className="text-gray-600">{user?.email}</p>
                            </div>
                            <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                                <button
                                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
                                    onClick={() => handleEditClick("Edit User")}
                                >
                                    Edit User
                                </button>
                                <button
                                    className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-700"
                                    onClick={() => handleEditClick("Change Password")}
                                >
                                    Change Password
                                </button>
                                <button
                                    className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700"
                                    onClick={handleDeleteClick}
                                >
                                    Delete User
                                </button>
                            </div>
                            <button
                                className="px-4 py-2 mt-4 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
                                onClick={handleLogoutClick}
                            >
                                Logout
                            </button>

                            {/* Modal for editing user information */}
                            {isEdit.condition && (
                                <>
                                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                                        <EditProfileForm user={user} token={token} setIsEdit={setIsEdit} type={isEdit.type} setUser={setUser} setLoading={setLoading} />
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
