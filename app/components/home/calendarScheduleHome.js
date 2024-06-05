
'use client'
import React from 'react';
import ReadBlueButton from '../others/button/readBlueButton';

const CardComponent = ({ title, description, buttonTextLabel, imgSrc, imgAlt, url }) => {
  return (
    <div className="flex flex-row items-center rounded-lg overflow-hidden ">
      <img src={imgSrc} alt={imgAlt} className="block w-1/3" />
      <div className="flex flex-col justify-between p-4 bg-white w-2/3 h-full">
        <div>
          <h2 className="text-[#444444] text-xl font-bold">{title}</h2>
          <p className="text-[#626262] text-sm">{description}</p>
        </div>

        <div className='pt-2'>
          <ReadBlueButton buttonText={buttonTextLabel} redirectUrl={url} />

        </div>

      </div>
    </div>
  );
};
const CardComponentTwo = ({ title, description, buttonTextLabel, imgSrc, imgAlt, url }) => {
  return (
    // `flex-row-reverse` para invertir el orden, haciendo que la imagen esté a la derecha.
    <div className="flex flex-row-reverse items-center rounded-lg overflow-hidden">
      <img src={imgSrc} alt={imgAlt} className="block w-1/3" />
      <div className="flex flex-col justify-between p-4 bg-white w-2/3 h-full text-right">
        <div>
          <h2 className="text-[#444444] text-xl font-bold">{title}</h2>
          <p className="text-[#626262] text-sm">{description}</p>
        </div>
        <div className='pt-2 flex justify-end'>
          <ReadBlueButton buttonText={buttonTextLabel} redirectUrl={url} />
        </div>
      </div>
    </div>
  );
};




const CalendarScheduleHome = () => {
  return (
    <div className="flex flex-col md:flex-row items-center mb-10 w-full">
      <div className="flex-grow">
        <CardComponent
          title="Schedule"
          description="Conoce el horario de nuestro colegio"
          buttonTextLabel="See schedule"
          imgSrc="/images/others/schedule.png"
          imgAlt="Schedule"
          url="https://drive.google.com/file/d/1eobMZQVtlE7bKdDe2D8NRNq4rnUNkxtl/view"
        />
      </div>
      <div className="w-px bg-gray-300 mx-6 my-4 md:my-0 self-stretch"></div> 
      <div className="flex-grow">
        <CardComponentTwo
          title="Calendar"
          description="Conoce el calendario de nuestro colegio"
          buttonTextLabel="See calendar"
          imgSrc="/images/others/calendar.png"
          imgAlt="Calendar"
          url="https://drive.google.com/file/d/16rKV402b2ENKiaGBD-VpSkMr38b1Q3b9/view"
        />
      </div>
    </div>
  );
};


export default CalendarScheduleHome;
