import FormCuaderno from '@/Components/FormCuaderno';
import Leaflet from '@/Components/Maps/Leaflet';
import OpenLayersMap from '@/Components/Maps/OpenLayersMap';
import Table_1_2_Fito from '@/Components/Table_1_2_Fito';
import Table_2_1_Fito from '@/Components/Table_2_1_Fito';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    console.log(auth);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
                <div className="p-5">
                    <Leaflet/>
                </div>
                <div className='p-5'>
                    <FormCuaderno/>
                </div>
                
                <div className="p-5">
                    <Table_1_2_Fito/>
                    <Table_2_1_Fito/>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}
