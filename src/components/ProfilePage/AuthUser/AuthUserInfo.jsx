// AuthUserInfo.jsx
import Button from "@/components/homeLayout/Button";
import EditProfileForm from "./EditProfileForm";
import { HiMiniUsers } from "react-icons/hi2";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from 'next/link';


const AuthUserInfo = ({
  user,
  token,
  currentUser,
  followerCount,
  followingCount,
  isEditModalOpen,
  closeEditModal,
  handleUpdateSuccess,
  openEditModal,
}) => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center md:text-left">{currentUser.name}</h1>
      <p className="my-2 text-center text-gray-600 md:text-left">{user.username}</p>
      <Button
        variant="blueOutline"
        color="outline"
        onClick={openEditModal}
        className="w-full mb-4 font-bold hover:bg-blue-100 active:bg-blue-400"
      >
        Edit Profile
      </Button>
      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <EditProfileForm
            user={currentUser}
            token={token}
            onClose={closeEditModal}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </div>
      )}
      <div className="flex items-center justify-start">
        <div className="flex items-center space-x-2">
          <HiMiniUsers className="text-xl text-blue-500" />
          {/* <FaUsers className="text-xl text-blue-500" /> */}
          <span className="font-bold text-gray-700">{followerCount}</span>
          <span className="text-gray-500">Followers</span>
        </div>
        <div className="h-6 mx-2 border-l-2 border-gray-300" />
        <div className="flex items-center space-x-2">
          <span className="font-bold text-gray-700">{followingCount}</span>
          <span className="text-gray-500">Following</span>
        </div>
      </div>

      <hr className="my-2 border-t border-gray-300" />

      {/* Additional user details */}
      <div className='space-y-2 text-start'>
        <p className="text-gray-600 md:text-left">{user.email}</p>
        {currentUser.cityName && currentUser.stateName && (
          <p className="text-gray-600 md:text-left">{currentUser.cityName}, {currentUser.stateName}</p>
        )}
      </div>

      {currentUser.cityName || currentUser.stateName || currentUser.portfolio || currentUser.linkedin || currentUser.github ? (
        <div className="flex justify-start mt-4 space-x-4">
          {currentUser.portfolio && (
            <Link href={currentUser.portfolio} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl" />
            </Link>
          )}
          {currentUser.github && (
            <Link href={currentUser.github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-2xl" />
            </Link>
          )}
          {currentUser.linkedin && (
            <Link href={currentUser.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl" />
            </Link>
          )}
        </div>
      ) : null}
    </>
  );
};

export default AuthUserInfo;