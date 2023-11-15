import React from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter } from "react-router-dom";
import { MangaProvider } from './context/MangaContext';

const App = () => {
  return (
    <div>
      <MangaProvider>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </MangaProvider>
    </div>
  )
}

export default App