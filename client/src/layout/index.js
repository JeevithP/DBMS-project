import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../pages/Footer';

const AuthLayouts = ({ children }) => {
  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-10 flex justify-center items-center shadow-md bg-white h-16"
      >
        <Navbar />
      </header>

      <main className="pt-16 bg-gray-100 min-h-screen ">
        {children}
      </main>
      <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white ">
  <Footer />
</footer>

    </>
  );
};

export default AuthLayouts;
