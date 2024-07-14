// pages/settings.js
import React from 'react';
import MainLayout from '@/app/components/layout/drawerLayout'; // Ajusta la ruta según tu estructura
import SMTPForm from '@/app/components/settingsForm';// Asegúrate de ajustar la ruta
import PrivateRoute from '@/app/components/privateRoute'; // Importa el HOC PrivateRoute

const SettingsPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-start px-20">
        <SMTPForm />
      </div>
    </MainLayout>
  );
};

// Envuelve SettingsPage con PrivateRoute para proteger la ruta
export default PrivateRoute(SettingsPage);
