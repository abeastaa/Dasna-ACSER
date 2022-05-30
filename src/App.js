import React, { useState, useEffect, useMemo } from 'react'
import './scss/style.scss'
import { LoginContext } from './contexts/loginContext'

import Routers from './routes/routes'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const providerValue = useMemo(() => {
    return { token, setToken }
  })

  return (
    <LoginContext.Provider value={providerValue}>
      <Routers />
    </LoginContext.Provider>
  )
}

export default App
