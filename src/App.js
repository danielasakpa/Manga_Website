import React from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter, ScrollRestoration } from "react-router-dom";
import { MangaProvider } from './context/MangaContext';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <MangaProvider>
        <BrowserRouter>
          <MainRouter />
          {/* <ScrollRestoration /> */}
        </BrowserRouter>
        <ToastContainer newestOnTop />
      </MangaProvider>
    </div>
  )
}

export default App