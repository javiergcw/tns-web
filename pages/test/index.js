import React from 'react';
import BugComponent from '@/app/components/bugs/bugList'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import BugList from '@/app/components/bugs/bugList';
import CreateBugComponent from '@/app/components/bugs/createBug';
import ShoppingSummary from '@/app/components/stadistics/stadistics';

const BugsPage = () => {
  return (
    <div>
      <BugList/>
    </div>
  );
};

export default BugsPage;
