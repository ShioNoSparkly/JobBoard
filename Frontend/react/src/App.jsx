import {Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Jobspage from './pages/Jobspage'
import Loginpage from './pages/Loginpage'
import RegisterPage from './pages/RegisterPage'
import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Routes>
  <Route path='/' element={<MainLayout/>}>

        <Route index element={<Jobspage/>}/>
        
        {/* <Route path='*' element={<NotFound/>}/> */}
  
  </Route>
</Routes>
    </>
  )
}

export default App
