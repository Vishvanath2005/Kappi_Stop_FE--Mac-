import React from 'react'
import Main_Router from './routes/Main_Router'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
     <Toaster position="top-center" />
     <Main_Router />
    </div>
  )
}

export default App