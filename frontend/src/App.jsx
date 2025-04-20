// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Collection from './pages/Collection'
// import About from './pages/About'
// import Contact from './pages/Contact'
// import Product from './pages/Product'
// import Cart from './pages/Cart'
// import PlaceOrder from './pages/PlaceOrder'
// import Orders from './pages/Orders'
// import Navbar from './component/Navbar'
import Login from './pages/Login.jsx'
// import Fotter from './component/Fotter.jsx'
// import SearchBar from './component/SearchBar.jsx'
import { ToastContainer, toast } from 'react-toastify';
import UserProfile from './pages/Profile.jsx';
import ChatPage from './pages/ChatPage.jsx';
import Chatbot from './components/Chatbot.jsx';
import VoiceRecognition from './components/VoiceRecognition.jsx';
// import Chatbot from './pages/Chatbot.jsx';

function App() {

  return (
    <>
      <div>
        {/* <Navbar/> */}
        {/* <ToastContainer/> */}
        {/* <SearchBar/> */}
        <Routes>
          {/* <Route path='/' element={<Home/>} /> */}
          <Route path='/login' element={<Login/>} />
          <Route path='/profile' element={<UserProfile/>} />
          {/* <Route path='/' element={<ChatPage/>} /> */}
          {/* <Route path='/' element={<VoiceRecognition />} /> */}
          <Route path='/' element={<Chatbot/>} />
          
        </Routes>
        {/* <Fotter/> */}
      </div>
    </>
  )
}

export default App
