// useCloudinaryUrl.js
import { useState, useEffect } from 'react';

const useCloudinaryUrl = (initialUrlKey) => {
  const [cloudinaryUrl, setCloudinaryUrl] = useState(localStorage.getItem(initialUrlKey) || null);

  useEffect(() => {
    if (cloudinaryUrl) {
      localStorage.setItem(initialUrlKey, cloudinaryUrl);
    }
  }, [cloudinaryUrl, initialUrlKey]);

  return [cloudinaryUrl, setCloudinaryUrl];
};

export default useCloudinaryUrl;
