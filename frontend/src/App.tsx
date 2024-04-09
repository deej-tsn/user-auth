
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Error from './pages/Error'
import About from './pages/About'
import ForgottenPassword from './pages/ForgottenPassword'
import {RequireAuth} from './class/RequireAuth'

function App() {

  return (
    <div className=' w-screen h-screen'>
    <BrowserRouter>
          <Routes>

            <Route path='' element={
            <RequireAuth>
              <Home user={{Name : "", Rank : ""}}/>
            </RequireAuth>}/>
            <Route path='register' element = {<Register/>}/>
            <Route path='login' element = {<Login/>}/>
            <Route path='about' element = {<About/>}/>
            <Route path='forgottenpassword' element = {<ForgottenPassword/>}/>
            <Route path='*' element= {<Error/>}/>
            <Route path='test' element= {
                            <RequireAuth>
                              <div>Test</div>
                            </RequireAuth>} />
          </Routes>
        
        </BrowserRouter>
    </div>
   
  )
}

export default App
