import Footer from '@/app/components/home/footer/footer';
import Navbar from '@/app/components/home/navbar';
import FooterTwo from '@/app/components/home/footer/footerTwo';
import HeaderInitial from '@/app/components/others/headerInitial';
import AdmissionStepper from '@/app/components/forms/formtest'; // Asegúrate que la ruta sea correcta
import { Provider } from 'react-redux';
import store from '../../app/store/store';
import { createAdmission } from '@/app/services/admissionService'; // Importa el servicio
import FormInscription from '@/app/components/forms/formInscription';

export default function Admissions() {
    const handleCreateAdmission = async (formData) => {
        try {
            await createAdmission(formData);
            alert('Admisión creada exitosamente');
        } catch (error) {
            alert('Error al crear la admisión');
            console.error(error);
        }
    };

    return (
        <Provider store={store}>
            <Navbar />
            <HeaderInitial />


            <AdmissionStepper onSubmit={handleCreateAdmission} />

            <FooterTwo />
            <Footer />
        </Provider>
    );
}
