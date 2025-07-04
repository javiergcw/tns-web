"use client";
import { Provider } from 'react-redux';
import store from '@/app/store/store';
import MyJourney from '@/app/components/my_journey/MyJourney';
import MainLayout from '@/app/components/layout/mainLayout';

export default function MyJourneyPage() {
    return (
        <Provider store={store}>
            <MainLayout>
                <MyJourney />
            </MainLayout>
        </Provider>
    );
}