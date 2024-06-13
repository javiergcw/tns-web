
import '/app/globals.css'

import HeaderInitial from '@/app/components/others/headerInitial'
import CardNew from '@/app/components/news/cardNew'
import blogList from '@/app/data/blogData'
import { Provider } from 'react-redux';
import store from '../../app/store/store'
import MainLayout from '@/app/components/layouts/mainLayout'


const blog = () => {

    return (
        <Provider store={store}>
            <MainLayout>
            <HeaderInitial />
            <br />
            <div className="flex flex-wrap justify-center gap-4">
                {blogList.map((data, index) => (
                    <div key={index} className="w-full md:w-1/3 ">
                        <CardNew {...data} />
                    </div>
                ))}
            </div>
            <br />
            </MainLayout>
        </Provider>
    )
}

export default blog