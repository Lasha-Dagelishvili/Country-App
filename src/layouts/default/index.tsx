import Footer from '@/components/base/footer/footer'
import Navbar from '@/components/base/navbar/navbar'
import { PageContainer } from '@/components/base/page-container/page-container'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <>
            <Navbar />
            <PageContainer>
                <Outlet />
            </PageContainer>
            <Footer />
        </>
    )
}

export default DefaultLayout
