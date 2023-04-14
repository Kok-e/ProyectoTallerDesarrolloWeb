import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { AppBar, Toolbar, Typography } from '@mui/material';

import './App.css'


function App() {

  return (
    
    <div className="App"> 
  <AppBar position="fixed" sx={{ backgroundColor: 'transparent' }}>
      <Toolbar>
        <Typography variant="h6" component="div"   sx={{ flexGrow: 1 }}>
          <img src="..\..\img\titulo.png" alt="titulo de la pagina" style={{ width: '25%' }} />
        </Typography>
      </Toolbar>
    </AppBar>
    </div>
  )
}

export default App
