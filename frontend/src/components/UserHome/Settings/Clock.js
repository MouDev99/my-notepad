import React, { useEffect, useState } from 'react';

import './Clock.css';

function Clock() {
    const { time, date } = getFormattedDateTime();
    const [seconds, setSeconds] = useState( new Date().getSeconds() );

    useEffect(() => {
        let timeInterval = setInterval(() => {
           setSeconds(new Date().getSeconds());
        }, 1000);
        return () => clearInterval(timeInterval);
    }, [seconds]);

    return (
       <div className="clock">
          <div className="time"> { time } </div>
          <div className="date"> { date } </div>
       </div>
    )
};

function getFormattedDateTime() {
    const currDate = new Date();

    const hours = currDate.getHours();
    const minutes = currDate.getMinutes();
    const  seconds = currDate.getSeconds();

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const am_or_pm = hours < 12 ? "AM" : "PM";

    return {
        time: `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${am_or_pm}`,
        date: currDate.toDateString()
    };
};

export default Clock;
