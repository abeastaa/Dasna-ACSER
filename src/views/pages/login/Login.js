import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// ** Contexts
import { LoginContext } from '../../../contexts/loginContext'
import { EmailsContext } from '../../../contexts/emailsContext'
// ** Custom Hooks
import useRequest from '../../../utility/useRequest'
// import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

function Login() {
  // ** Hooks
  const navigate = useNavigate()
  const { request } = useRequest()
  const { setToken } = useContext(LoginContext)
  const { setEmails } = useContext(EmailsContext)

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({ username: '', password: '' })
  const handleSubmit = async () => {
    setIsLoading(true)
    const res = await request(false, '/Dashboard', 'POST', data)
    console.log(res)
    if (res.status === 200) {
      setToken(true)
      setEmails(res.data)
      navigate('/')
    } else {
      setIsLoading(false)
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6} lg={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        placeholder="email"
                        type="email"
                        value={data.username}
                        onChange={(e) => {
                          setData({ ...data, [e.target.name]: e.target.value })
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => {
                          setData({ ...data, [e.target.name]: e.target.value })
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                        <CButton
                          color="primary"
                          className="w-100 px-4"
                          disabled={isLoading}
                          onClick={handleSubmit}
                        >
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
