// pages/settings.js
import React from 'react';
import MainLayout from '@/app/components/layout/drawerLayout'; // Ajusta la ruta según tu estructura
import SMTPForm from '@/app/components/settingsForm';// Asegúrate de ajustar la ruta
import PrivateRoute from '@/app/components/privateRoute'; // Importa el HOC PrivateRoute

const SettingsPage = () => {
  return (
    <div className="min-h-screen h-2 justify-center bg-gray-100 overflow-y-auto">
    <MainLayout>
      <div className="flex flex-col  px-20 bg-bgPrimary h-full">
        <SMTPForm />
      </div>
    </MainLayout>
    </div>

  );
};

// Envuelve SettingsPage con PrivateRoute para proteger la ruta
export default PrivateRoute(SettingsPage);
