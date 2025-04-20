// UserProfile.js
import React from 'react';

const UserProfile = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      {/* Profile Header */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <img
            src="https://via.placeholder.com/150" // Replace with actual profile image URL
            alt="User Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
          />
        </div>

        {/* User Details */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Ashish</h2>
          <p className="text-sm text-gray-500 mt-1">+91 84850 51501</p>

          {/* About/Status */}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">About</h3>
            <p className="text-sm text-gray-600">Busy 🚀</p>
          </div>

          {/* Additional Options (Optional) */}
          <div className="mt-6 flex justify-center space-x-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
              Chat
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;