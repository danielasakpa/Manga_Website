import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthProvider';
import EditProfileForm from '../components/EditProfileForm/EditProfileForm';
import { deleteUser } from '../API/user/user';
import showToast from '../utils/toastUtils';
import { useNavigate } from "react-router-dom";
import { Circles } from 'react-loader-spinner'
import randomImage from '../API/randomImage/randomImage';

const Profile = () => {
  const { logout, token } = useAuth();

  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
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

  return (
    <>
      <div
        className={`${loading ? "bg-black" : "bg-white"
          }  w-full min-h-[100vh] relative pb-6`}
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
            <img
            src={`${animeImg}`}
            alt=""
            className="w-[100%] h-[300px] bg-cover bg-top mb-4"
          />
          }
            <div className="mx-auto w-[max-content]">
              <div className="mb-4">
                <p className="text-[40px] font-medium mb-3">
                  {user?.username}
                </p>
                <div>
                  <>
                    <p className="mb-2 text-[20px] font-semibold">
                      User Email
                    </p>
                    <p className="text-gray-600">{user?.email}</p>
                  </>
                  <>
                    <p className="mb-2 text-[20px] font-semibold">User ID</p>
                    <p className="text-gray-600">{user?._id}</p>
                  </>
                </div>
              </div>
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                {/* Edit User button */}
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
                  onClick={() => handleEditClick("Edit User")}
                >
                  Edit User
                </button>
                {/* Change Password button */}
                <button
                  className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-700"
                  onClick={() => handleEditClick("Change Password")}
                >
                  Change Password
                </button>
                {/* Delete User button */}
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700"
                  onClick={handleDeleteClick}
                >
                  Delete User
                </button>
              </div>
              {/* Logout button */}
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
