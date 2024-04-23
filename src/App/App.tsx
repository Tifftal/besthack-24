import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import MainPage from './pages/MainPage'

import styles from './App.module.scss'


function App() {

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/' element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
