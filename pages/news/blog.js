import '/app/globals.css'

import HeaderInitial from '@/app/components/others/headerInitial'
import CardNew from '@/app/components/news/cardNew'
import blogList from '@/app/data/blogData'
import { Provider } from 'react-redux';
import store from '../../app/store/store'
import MainLayout from '@/app/components/layout/mainLayout'

const blog = () => {

    return (
        <Provider store={store}>
            <MainLayout>
                
                <HeaderInitial />
                <br />
                <h1 className="text-3xl font-bold text-center mt-4">In The New School we learn for life</h1>
                <br/>
                <div className="flex flex-wrap justify-center gap-4 text-black">
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
