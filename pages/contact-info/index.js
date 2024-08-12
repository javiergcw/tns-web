import React from 'react';
import ContactEmail from '@/app/components/contact-info/contactInfo';
import MainLayout from '@/app/components/layout/mainLayout';
import DrawerLayout from '@/app/components/layout/drawerLayout';
import PrivateRoute from '@/app/components/privateRoute';

const ContactInfo = () => {
    const email = 'info@tucorreo.com';

    return (
        <DrawerLayout>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <ContactEmail email={email} />
            </div>
        </DrawerLayout>
    );
};

export default PrivateRoute (ContactInfo);
