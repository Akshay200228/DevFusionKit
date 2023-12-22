// useAvatarUpload.js
import { useState, useEffect } from 'react';

const useAvatarUpload = (token, cloudinaryUrl) => {
    const [uploadStatus, setUploadStatus] = useState({ loading: false, success: false, error: null });

    useEffect(() => {
        const uploadAvatar = async () => {
            setUploadStatus({ loading: true, success: false, error: null });

            try {
                const response = await fetch('http://localhost:8000/api/users/upload-avatar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ url: cloudinaryUrl }),
                });

                if (!response.ok) {
                    throw new Error('Failed to upload Cloudinary URL to the server');
                }

                // Store Cloudinary URL in local storage
                localStorage.setItem('userAvatar', cloudinaryUrl);

                setUploadStatus({ loading: false, success: true, error: null });
            } catch (error) {
                setUploadStatus({ loading: false, success: false, error: error.message });
            }
        };

        if (cloudinaryUrl) {
            uploadAvatar();
        }
    }, [token, cloudinaryUrl]);

    return uploadStatus;
};

export default useAvatarUpload;
