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
  
  const formatTime = (value: number) => value.toString().padStart(2, '0');  
  
  return (  
    <div
      className={cn(
        // Flex row by default, allow wrapping (wrap) to go to second row if needed on small screens
        "flex flex-wrap justify-center items-center gap-x-6 gap-y-4 md:flex-nowrap", 
        className
      )}
    >  
      {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => (  
        <React.Fragment key={unit}>  
          <div
            className="flex flex-col items-center min-w-[56px] md:min-w-[72px] flex-grow"
            style={{ flexBasis: '120px' }} // flex-basis to control width and force wrap on small
          >  
            <div className="countdown-digit text-4xl md:text-6xl font-semibold leading-none">  
              {timeLeft.hasOwnProperty(unit)  
                ? formatTime(timeLeft[unit as keyof typeof timeLeft] as number)  
                : '00'}  
            </div>  
            <span className="countdown-label text-sm md:text-base text-gray-600">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>  
          </div>  
          {index < 3 && (  
            <div className="hidden md:flex items-center justify-center h-16 text-4xl font-light text-gray-600 select-none">  
              :  
            </div>  
          )}  
        </React.Fragment>  
      ))}  
    </div>  
  );  
};  
  

export default CountdownTimer;