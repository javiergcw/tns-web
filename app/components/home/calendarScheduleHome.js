'use client'

import React from 'react';
import ReadMoreButton from '../others/button/readMoreButton';

const CardComponent = ({ title, description, buttonText, imgSrc, imgAlt }) => {
  return (
    <div className="flex flex-row items-center rounded-lg overflow-hidden ">
      <img src={imgSrc} alt={imgAlt} className="block w-1/3" />
      <div className="flex flex-col justify-between p-4 bg-white w-2/3 h-full">
        <div>
          <h2 className="text-[#444444] text-xl font-bold">{title}</h2>
          <p className="text-[#626262] text-sm">{description}</p>
        </div>
        <ReadMoreButton />

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
      <div className="hidden md:block self-stretch w-px bg-gray-300 mx-6"></div>

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
