import React from 'react';
import PrivateRoute from '@/app/components/privateRoute';
import AdmissionsView from '@/app/components/admisiones/admissionesView';
import DrawerLayout from '@/app/components/layout/drawerLayout';

const Admisiones = () => {
  return (
    <DrawerLayout>
    <div>
      <AdmissionsView />
    </div>
    </DrawerLayout>
  );
};

export default Admisiones;
