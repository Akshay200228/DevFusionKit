'use client';
import { useState, useEffect } from 'react';

const CountdownTimer = ({ expirationTime, onTimeout }) => {
  const calculateTimeLeft = () => {
    const difference = expirationTime - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      onTimeout(); // Trigger the callback when the timer expires
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="text-gray-600">
      {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}:
      {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
    </div>
  );
};

export default CountdownTimer;
