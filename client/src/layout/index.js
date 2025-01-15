import React from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import Navbar from '../components/Navbar';

const AuthLayouts = ({children}) => {
  return (
    <>
        <header className=' justify-center items-center shadow-md bg-white h-32'>
          <Navbar/>
        </header>

        { children }
    </>
  )
}

export default AuthLayouts