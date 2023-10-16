import { useState, useEffect } from 'react';
import axios from 'axios';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getCookie('token'); // Get the user's token from cookies

    if (token) {
      // Replace 'userId' with the dynamic user ID that you want to fetch
      fetchUserData(token, '652a2755e12d8bc9dc9ec249'); // Pass the dynamic user ID here
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  // Modify the function to accept a dynamic user ID
  const fetchUserData = async (token, userId) => {
    try {
      console.log("Sending request to: http://localhost:8000/api/users/" + userId);
      
      const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response data:", response.data);

      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  return { user, error, isLoading };
}
