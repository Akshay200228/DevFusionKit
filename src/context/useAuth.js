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
    console.log("token sadsadsad", token)

    if (token) {
      fetchUserData(token);
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const fetchUserData = (token) => {
    axios
      .get('http://localhost:8000/api/users/652a2755e12d8bc9dc9ec249', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
        setError(err);
        setIsLoading(false);
      });
  };

  return { user, error, isLoading };
}
