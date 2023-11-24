'use client'

import React from 'react';

const CardComponent = ({ title, description, buttonText, imgSrc, imgAlt }) => {
  return (
    <div className="flex flex-row items-center rounded-lg overflow-hidden shadow-lg">
      <img src={imgSrc} alt={imgAlt} className="block w-1/3" />
      <div className="flex flex-col justify-between p-4 bg-blue-500 w-2/3 h-full">
        <div>
          <h2 className="text-white text-lg font-bold">{title}</h2>
          <p className="text-white text-sm">{description}</p>
        </div>
        <button className="self-start px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const CalendarScheduleHome = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around items-center my-10">
      <CardComponent
        title="Schedule"
        description="Conoce el horario de nuestro colegio"
        buttonText="see schedule"
        imgSrc="images/others/schedule.png"
        imgAlt="Schedule"
      />
      <CardComponent
        title="Calendar"
        description="Conoce el calendario de nuestro colegio"
        buttonText="see calendar"
        imgSrc="images/others/calendar.png"
        imgAlt="Calendar"
      />
    </div>
  );
};

export default CalendarScheduleHome;
