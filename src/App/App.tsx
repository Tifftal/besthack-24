import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.modules.scss'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
