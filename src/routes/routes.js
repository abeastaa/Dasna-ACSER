import React, { useContext, Suspense } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { LoginContext } from '../contexts/loginContext'
// Pages
const Login = React.lazy(() => import('../views/pages/login/Login'))
const Register = React.lazy(() => import('../views/pages/register/Register'))
const Page404 = React.lazy(() => import('../views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('../views/pages/page500/Page500'))

// Containers
const DefaultLayout = React.lazy(() => import('../layout/DefaultLayout'))

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

function Routers() {
  const { token } = useContext(LoginContext)
  return (
    <Router>
      <Suspense fallback={loading}>
        <Routes>
          {token ? (
            <>
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route exact path="*" element={<DefaultLayout />} />
            </>
          ) : (
            <>
              <Route path="/login" name="Login Page" element={<Login />} />
              <Route path="/register" name="Register Page" element={<Register />} />
              <Route path="*" element={<Navigate to="login" replace />} />
            </>
          )}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default Routers
