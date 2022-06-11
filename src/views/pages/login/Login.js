import React, { useState, useContext, Suspense, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// ** Contexts
import { LoginContext } from '../../../contexts/loginContext'
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
  CSpinner,
  CToastBody,
  CToastClose,
  CToaster,
  CToastHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { EyeFill } from '@styled-icons/bootstrap/EyeFill'
import { EyeSlash } from '@styled-icons/bootstrap/EyeSlash'
import { CToast } from '@coreui/react'

// ** Logo
import Logo from '../../../assets/images/logtrans.png'
import NameLogo from '../../../assets/images/textlogotra.png'

// ** Toast
const createToast = (text) => {
  return (
    <CToast animation={true} color="danger">
      <CToastHeader closeButton className="justify-content-between">
        Error
      </CToastHeader>
      <CToastBody className="text-white">{text}</CToastBody>
    </CToast>
  )
}

function Login() {
  // ** Hooks
  const navigate = useNavigate()
  const { request } = useRequest()

  const { setToken } = useContext(LoginContext)

  const toaster = useRef()

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(0)
  const [data, setData] = useState({ username: '', password: '' })
  const [visiblePassword, setVisiblePassword] = useState(false)

  // ** Handle Change input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
    if (errors[e.target.name] && e.target.value.length > 0) {
      setErrors((prev) => {
        delete prev[e.target.name]
        return prev
      })
    }
  }

  // ** Handle Submit and login
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.values(data).every((item) => item.length > 0)) {
      setErrors({})
      setIsLoading(true)
      request(false, '/login', 'POST', data)
        .then((res) => {
          setIsLoading(false)
          if (res.data && res.data.accessToken) {
            localStorage.setItem('token', res.data.accessToken)
            setToken(res.data.accessToken)
            navigate('/')
          } else {
            setToast(createToast(res.response.data.msg))
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.response.status === 401) {
            setToast(createToast(err.response.data.msg))
          } else {
            setToast(createToast('Sorry, something went wrong!'))
          }
          setIsLoading(false)
        })
    } else {
      let newErrors = {}
      for (const key in data) {
        // console.log(key)
        if (!data[key].length > 0) {
          newErrors = { ...newErrors, [key]: `${key} is required` }
        }
        setErrors(newErrors)
      }
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
                  <CRow className="d-flex justify-content-center mb-5">
                    <CCol xs={12} className="d-flex justify-content-center">
                      <img src={Logo} alt="Logo" style={{ width: 200, height: 200 }} />
                    </CCol>
                    <CCol xs={12} className="d-flex justify-content-center">
                      <img src={NameLogo} alt="Logo" style={{ width: 200, height: 50 }} />
                    </CCol>
                  </CRow>

                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <div className="mb-3 d-flex flex-column">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          name="username"
                          placeholder="email"
                          type="email"
                          value={data.username}
                          onChange={(e) => {
                            handleChange(e)
                          }}
                        />
                      </CInputGroup>
                      {errors.username && <small className="text-danger">{errors.username}</small>}
                    </div>
                    <div className="mb-3 d-flex flex-column position-relative">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          name="password"
                          type={!visiblePassword ? 'password' : 'text'}
                          placeholder="Password"
                          autoComplete="current-password"
                          value={data.password}
                          onChange={(e) => {
                            handleChange(e)
                          }}
                        />
                      </CInputGroup>
                      {visiblePassword ? (
                        <EyeFill
                          size={18}
                          className="visible-show-icon"
                          onClick={() => {
                            setVisiblePassword(!visiblePassword)
                          }}
                        />
                      ) : (
                        <EyeSlash
                          size={18}
                          className="visible-show-icon"
                          onClick={() => {
                            setVisiblePassword(!visiblePassword)
                          }}
                        />
                      )}
                      {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>
                    <CRow>
                      <CCol xs={12}>
                        <CButton
                          type="submit"
                          color="primary"
                          className="w-100 px-4"
                          disabled={isLoading}
                        >
                          {!isLoading ? 'Login' : <CSpinner color="success" size="sm" />}
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

      <CToaster ref={toaster} push={toast} placement="top-end" />
    </div>
  )
}

export default Login
