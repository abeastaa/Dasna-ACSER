// ** React Imports
import React, { useState, useContext, useRef } from 'react'

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

// ** Contexts
import { LoginContext } from '../../../contexts/loginContext'

// ** Custom Hooks
import useRequest from '../../../utility/useRequest'

// ** Third Party Libraries
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

// ** Icons
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { EyeFill } from '@styled-icons/bootstrap/EyeFill'
import { EyeSlash } from '@styled-icons/bootstrap/EyeSlash'
import { CToast } from '@coreui/react'

// ** Logo
import Logo from '../../../assets/images/logtrans.png'
import NameLogo from '../../../assets/images/textlogotra.png'

// ** Toast
const createToast = (text, color) => {
  return (
    <CToast animation={true} color="danger">
      <CToastHeader closeButton className="justify-content-between">
        Error
      </CToastHeader>
      <CToastBody className="text-white">{text}</CToastBody>
    </CToast>
  )
}

// ** Validation Schema
const validationSchema = yup.object({
  username: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string('Enter your password').required('Password is required'),
})

function Login() {
  // ** Hooks
  const navigate = useNavigate()
  const { request } = useRequest()

  // ** Context
  const { setToken } = useContext(LoginContext)

  // ** Ref
  const toaster = useRef()

  // ** States
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState(0)
  const [visiblePassword, setVisiblePassword] = useState(false)

  // ** Submit Login In Back-End
  const handleLoginRequest = (data) => {
    setIsLoading(true)
    request(false, 'login', 'POST', data).then((res) => {
      console.log(res)
      if (res.status === 200 && res.data.accessToken) {
        localStorage.setItem('token', res.data.accessToken)
        setToken(res.data.accessToken)
        navigate('/')
      }
      if (res.status === 201) {
        setToast(createToast(res.data.msg))
      }
      if (res.response && res.response.status === 401) {
        setToast(createToast(res.response.data.msg))
      }
      if (res.status === 500) {
        setToast(createToast('Sorry, something went wrong!'))
      }
      setIsLoading(false)
    })
  }

  // Formik hook
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLoginRequest(values)
    },
  })

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12} lg={8}>
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

                  <CForm onSubmit={formik.handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <div className="mb-3">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          autoComplete="email"
                          name="username"
                          type="text"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          // errors={formik.touched.username && Boolean(formik.errors.username)}
                        />
                      </CInputGroup>
                      <small className="text-danger">
                        {formik.touched.username && formik.errors.username}
                      </small>
                    </div>
                    <div className="mb-3 position-relative">
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Password"
                          autoComplete="password"
                          name="password"
                          type={!visiblePassword ? 'password' : 'text'}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          // errors={formik.touched.username && Boolean(formik.errors.username)}
                        />
                      </CInputGroup>
                      <small className="text-danger">
                        {formik.touched.password && formik.errors.password}
                      </small>
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
                    </div>
                    <CRow>
                      <CCol xs={12}>
                        <CButton
                          type="submit"
                          color="primary"
                          className="w-100 px-4"
                          disabled={isLoading}
                        >
                          Login
                          {isLoading && <CSpinner color="success" size="sm" className="mx-1" />}
                        </CButton>
                      </CCol>
                      {/* <CCol xs={12} className="text-center">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                      <CCol xs={12} className="text-center">
                        <Link to="/register">
                          <CButton color="link" className="text-right d-inline-block d-md-none">
                            Register Now!
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-none d-md-block"
                style={{ width: '30%' }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>

      <CToaster ref={toaster} push={toast} placement="top-end" />
    </div>
  )
}

export default Login
