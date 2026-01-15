import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthProvider';
import EditProfileForm from '../components/EditProfileForm/EditProfileForm';
import { deleteUser } from '../API/user/user';
import showToast from '../utils/toastUtils';
import { useNavigate } from "react-router-dom";
import { Circles } from 'react-loader-spinner'
import randomImage from '../API/randomImage/randomImage';
import { getUser } from '../utils/localStorage';

const Profile = () => {
  const { logout, token } = useAuth();

  const navigate = useNavigate();

  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [animeImg, setAnimeImg] = useState("")

  const [isEdit, setIsEdit] = useState({ condition: false, type: "" });

  useEffect(() => {
    // Fetch random anime image
    async function getRandomImage() {
      try {
        setImgLoading(true)
        const res = await randomImage();
        const randomIndex = Math.floor(Math.random() * res.length);
        setAnimeImg(res[randomIndex].image);
      } catch (error) {
        console.error('Error fetching random image:', error);
      } finally {
        setImgLoading(false)
      }
    }

    getRandomImage();
  }, []);


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
      // Logout after successful deletion
      logout();
      setLoading(false);
      navigate('/login');
      showToast("User was successfully Deleted");
    } catch (error) {
      setLoading(false);
      showToast(error.message, "error");
    }
  }

  // If no user is found, redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <div
        className={`${loading ? "bg-black" : "bg-white"
          }  w-full h-max lg:min-h-[100vh] relative pb-6`}
      >
        {loading ? (
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
          </div>
        ) : (
          <>
            {
               imgLoading ?
                <div className="w-[100%] h-[300px] bg-cover bg-top mb-4 animate-pulse bg-gray-600" />
                :
                <div className='w-[100%] h-[250px] md:h-[300px] relative'>
                  <img
                    src={`${animeImg}`}
                    alt=""
                    decoding='async' 
                    fetchPriority='high'
                    className="hidden md:block w-[100%] h-full opacity-50 bg-cover bg-top mb-4"
                  />
                  <img
                    src={`${animeImg}`}
                    alt=""
                    decoding='async' 
                    fetchPriority='high'
                    className="absolute inset-0 left-1/2 transform -translate-x-1/2 z-10 w-full md:w-[500px] h-full bg-gray-200 bg-opacity-70 bg-cover bg-top mb-4"
                  />
                  <div className="hidden md:block absolute inset-0 w-[100%] h-[250px] md:h-[300px] bg-black opacity-90" />
                </div>

            }
            <div className="mx-auto w-[max-content] my-4 ">
              <div>
                <p className="text-[40px] font-medium break-all over mb-3">
                  {user?.username || 'Guest'}
                </p>
                <div>
                  <div className='mb-3'>
                    <p className="mb-2 text-[20px] font-semibold">
                      User Email
                    </p>
                    <p className="text-gray-600">{user?.email || 'N/A'}</p>
                  </div>
                  <div className='mb-3'>
                    <p className="mb-2 text-[20px] font-semibold">User ID</p>
                    <p className="text-gray-600 ">{user?._id || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4 md:gap-y-0">
                {/* Edit User button */}
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-[3px] hover:bg-blue-700"
                  onClick={() => handleEditClick("Edit User")}
                >
                  Edit User
                </button>
                {/* Change Password button */}
                <button
                  className="px-4 py-2 text-white bg-yellow-500 rounded-[3px] hover:bg-yellow-700"
                  onClick={() => handleEditClick("Change Password")}
                >
                  Change Password
                </button>
                {/* Delete User button */}
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded-[3px] hover:bg-red-700"
                  onClick={handleDeleteClick}
                >
                  Delete User
                </button>
              </div>
              {/* Logout button */}
              <button
                className="px-4 py-2 mt-4 text-gray-700 bg-gray-300 rounded-[3px] hover:bg-gray-400"
                onClick={handleLogoutClick}
              >
                Logout
              </button>

              {/* Modal for editing user information */}
              {isEdit.condition && (
                <>
                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <EditProfileForm
                      user={user}
                      token={token}
                      setIsEdit={setIsEdit}
                      type={isEdit.type}
                      setUser={setUser}
                      setLoading={setLoading}
                    />
                  </div>
                  <div
                    className={`${isEdit.condition ? "opacity-25 fixed" : "opacity-0"
                      } inset-0 z-40 bg-black`}
                  ></div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;