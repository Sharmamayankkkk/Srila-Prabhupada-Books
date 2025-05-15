import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
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

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className={cn("flex justify-center items-center space-x-4 md:space-x-6", className)}>
      <div className="flex flex-col items-center">
        <div className="countdown-digit">
          {timeLeft.hasOwnProperty('days') ? formatTime(timeLeft['days' as keyof typeof timeLeft] as number) : '00'}
        </div>
        <span className="countdown-label">Days</span>
      </div>
      
      <div className="flex items-center justify-center h-16 text-2xl font-light text-gray-600">:</div>
      
      <div className="flex flex-col items-center">
        <div className="countdown-digit">
          {timeLeft.hasOwnProperty('hours') ? formatTime(timeLeft['hours' as keyof typeof timeLeft] as number) : '00'}
        </div>
        <span className="countdown-label">Hours</span>
      </div>
      
      <div className="flex items-center justify-center h-16 text-2xl font-light text-gray-600">:</div>
      
      <div className="flex flex-col items-center">
        <div className="countdown-digit">
          {timeLeft.hasOwnProperty('minutes') ? formatTime(timeLeft['minutes' as keyof typeof timeLeft] as number) : '00'}
        </div>
        <span className="countdown-label">Minutes</span>
      </div>
      
      <div className="flex items-center justify-center h-16 text-2xl font-light text-gray-600">:</div>
      
      <div className="flex flex-col items-center">
        <div className="countdown-digit">
          {timeLeft.hasOwnProperty('seconds') ? formatTime(timeLeft['seconds' as keyof typeof timeLeft] as number) : '00'}
        </div>
        <span className="countdown-label">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;