import {Outlet} from 'react-router-dom'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Loginpage from "../pages/Loginpage"
import Registerpage from "../pages/RegisterPage"
import Jobspage from "../pages/Jobspage"


function MainLayout() {
    return (
        <>

            <header>
                <Navbar />
            </header>


            <main>
<Outlet/>
            </main>
            <div>
                <Footer />
            </div>

        </>
    )
}

export default MainLayout