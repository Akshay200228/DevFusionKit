import { useState, useEffect } from 'react';
import axios from 'axios';
import getCookie from './getCookie';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie('token');
        console.log("object: ", token)
        if (token) {
          const apiUrl = process.env.NEXT_PUBLIC_NEXUS_URL;
          const response = await axios.get(`${apiUrl}/api/users/authUser`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          setIsLoading(false);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  return { user, error, isLoading };
}
