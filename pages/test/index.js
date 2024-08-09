import React from 'react';
import BugComponent from '@/app/components/bugs/bugList'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import BugList from '@/app/components/bugs/bugList';
import CreateBugComponent from '@/app/components/bugs/createBug';

const BugsPage = () => {
  return (
    <div>
      <CreateBugComponent/>
    </div>
  );
};

export default BugsPage;
