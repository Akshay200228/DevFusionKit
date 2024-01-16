// Notification.jsx
import { IoNotificationsOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';

const Notification = () => {
    const [isRinging, setIsRinging] = useState(false);

    useEffect(() => {
        const ringingInterval = setInterval(() => {
            setIsRinging(true);
            setTimeout(() => setIsRinging(false), 500); // Ringing duration: 500ms
        }, 5000);

        return () => clearInterval(ringingInterval);
    }, []);

    return (
        <div className={`hidden border-2 border-blue-700 rounded-xl lg:block ${isRinging && 'ringing'}`}>
            <IoNotificationsOutline className={`p-0.5 w-10 h-10 text-blue-600 ${isRinging && 'ringing'}`} />
        </div>
    );

};

export default Notification;
