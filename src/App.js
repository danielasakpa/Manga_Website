import React from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter, ScrollRestoration } from "react-router-dom";
import { MangaProvider } from './context/MangaContext';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from 'react-toastify';

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