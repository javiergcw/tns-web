import DrawerLayout from "@/app/components/layout/drawerLayout";
import AdmissionsTable from "@/app/components/admisiones/admissionTable";

const AdmissionsView = () => {
    return (
        <DrawerLayout>
            <div className="flex flex-col h-screen p-6 bg-bgPrimary">
                <h1 className="text-4xl font-extrabold text-blue-800 mb-4 text-center">
                    Admisiones
                </h1>
                <div className="flex-grow flex justify-center items-start">
                    <div className="bg-white rounded-lg shadow-lg pt-8 pb-6 mb-8 mx-4 md:mx-8 lg:mx-12">
                        <div className="h-full overflow-y-auto"> {/* Ajuste de altura y scroll interno */}
                            <AdmissionsTable />
                        </div>
                    </div>
                </div>
            </div>
        </DrawerLayout>
    );
};

export default AdmissionsView;
