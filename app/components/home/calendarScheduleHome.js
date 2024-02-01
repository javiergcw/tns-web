'use client'

import React from 'react';

const CardComponent = ({ title, description, buttonText, imgSrc, imgAlt }) => {
  return (
    <div className="flex flex-row items-center rounded-lg overflow-hidden shadow-lg">
      <img src={imgSrc} alt={imgAlt} className="block w-1/3" />
      <div className="flex flex-col justify-between p-4 bg-white w-2/3 h-full">
        <div>
          <h2 className="text-[#444444] text-xl font-bold">{title}</h2>
          <p className="text-[#626262] text-sm">{description}</p>
        </div>
        <button className="inline-flex items-center px-6 py-2 border border-[#2991D6] text-white rounded-full bg-[#2991D6] hover:bg-[#2673b1]">
          <span className="inline-block mr-2">
            <svg className="fill-current w-4 h-4" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18a6 6 0 110-12 6 6 0 010 12zm0-10a4 4 0 100 8 4 4 0 000-8zm6-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
            </svg>
          </span>
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
        buttonText="See schedule"
        imgSrc="/images/others/schedule.png"
        imgAlt="Schedule"
      />
      <CardComponent
        title="Calendar"
        description="Conoce el calendario de nuestro colegio"
        buttonText="See calendar"
        imgSrc="/images/others/calendar.png"
        imgAlt="Calendar"
      />
    </div>
  );
};

export default CalendarScheduleHome;
