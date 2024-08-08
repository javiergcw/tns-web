import React from 'react';
import BugComponent from '@/app/components/test/bugList'; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import BugList from '@/app/components/test/bugList';
import CreateBugComponent from '@/app/components/test/createBug';

const BugsPage = () => {
  return (
    <div>
      <CreateBugComponent/>
    </div>
  );
};

export default BugsPage;
