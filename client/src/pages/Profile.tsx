import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

  // Mock function to simulate account deletion
  const handleDeleteAccount = () => {
    // Ideally, this would trigger an API call to delete the account
    setIsDeleted(true);
    alert("Your account has been deleted.");
    navigate("/login"); // Redirect to login after account deletion
  };

  if (isDeleted) {
    return <div>Your account has been deleted. Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-4">Profile</h1>
      <p className="mb-4">Here, users can view and manage their account information.</p>
      
      {/* Add a Delete Account button */}
      <button
        onClick={handleDeleteAccount}
        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
      >
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
