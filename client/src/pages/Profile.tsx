import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile: React.FC = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Mock function to simulate account deletion
  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const userID = localStorage.getItem('userID'); 
    console.log("handleDelete userID", userID);
    try {
      const response = await axios.delete('http://localhost:3007/api/delete', {
            data: { userID }, // Send userID in the request body
      });
      if (response.status === 200) {
        alert('Your account has been deleted.');
        setIsDeleted(true); // Indicate deletion state
        navigate('/login'); // Redirect to login after account deletion
      }
    } catch (error: any) {
        setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.put('http://localhost:3007/api/users/update', {
        username,
        email
      });
      setMessage('Profile updated successfully!');
      setIsEditing(false); // Close the editing form after successful update
    } catch (error: any) {
      setMessage(`Error: ${error.response ? error.response.data : error.message}`);
    }
  };

  if (isDeleted) {
    return <div>Your account has been deleted. Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-4">Profile</h1>
      <p className="mb-4">Here, users can view and manage their account information.</p>
      
      {/* Show message if profile update or error occurred */}
      {message && <p className="text-red-500">{message}</p>}

      {!isEditing ? (
        <div>
          <div className="mb-4">
            <strong>Username:</strong> {username || 'Not set'}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {email || 'Not set'}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-between">
            <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
              Update Profile
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Delete Account button */}
      <div className="mt-6">
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
