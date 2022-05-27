import React, { useState, useEffect, useMemo } from 'react'
import './scss/style.scss'
import { LoginContext } from './contexts/loginContext'
import { EmailsContext } from './contexts/emailsContext'

import Routers from './routes/routes'

function App() {
  const [token, setToken] = useState(false)
  const [emails, setEmails] = useState(null)

  const providerValue = useMemo(() => {
    return { token, setToken }
  })

  const providerEmail = useMemo(() => {
    return { emails, setEmails }
  })

  return (
    <LoginContext.Provider value={providerValue}>
      <EmailsContext.Provider value={providerEmail}>
        <Routers />
      </EmailsContext.Provider>
    </LoginContext.Provider>
  )
}

export default App
