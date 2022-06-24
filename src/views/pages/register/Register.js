// ** React Imports
import React, { useRef, useState } from 'react'

// ** CoreUI Imports
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from '@coreui/react'

// ** Custom Hooks
import useRequest from '../../../utility/useRequest'

// ** Third Party Libraries
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

// ** Icons
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { AtSign } from '@styled-icons/foundation/AtSign'

// ** Logo
import Logo from '../../../assets/images/logtrans.png'
import NameLogo from '../../../assets/images/textlogotra.png'
import { setInterval } from 'core-js'

// ** Toast
const createToast = (text, color) => {
  return (
    <CToast animation={true} color={color}>
      <CToastBody className="text-white">{text}</CToastBody>
    </CToast>
  )
}

// ** Validation Schema
const validationSchema = yup.object({
  username: yup.string('Enter your username').required('Username is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
})

const Register = () => {
  // **  Hooks
  const { request } = useRequest()
  const navigate = useNavigate()

  // States
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState(0)

  // ** Ref
  const toaster = useRef()

  // ** Submit Register In Back-End
  const handleRegisterRequest = async (data) => {
    setIsLoading(true)
    await request(false, 'register', 'POST', data)
      .then((res) => {
        if (res.status === 200 || res.status === 207) {
          setToast(createToast(res.data.msg, res.status === 200 ? 'success' : 'warning'))
          setInterval(() => {
            window.location.replace('/login')
          }, 2000)
        }
        setIsLoading(false)
      })
      .catch((err) => {
        setToast(createToast('Something went wrong', 'danger'))
        setIsLoading(false)
      })
  }

  // Formik hook
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleRegisterRequest(values)
    },
  })

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={7} lg={6} xl={5}>
            <CCard className="mx-2">
              <CCardBody className="p-4">
                <div className="mb-5">
                  <div xs={12} className="d-flex justify-content-center">
                    <img src={Logo} alt="Logo" style={{ width: 200, height: 200 }} />
                  </div>
                  <div xs={12} className="d-flex justify-content-center">
                    <img src={NameLogo} alt="Logo" style={{ width: 200, height: 50 }} />
                  </div>
                </div>
                <CForm onSubmit={formik.handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <div className="mb-3">
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        // errors={formik.touched.username && Boolean(formik.errors.username)}
                      />
                    </CInputGroup>
                    <small className="text-danger">
                      {formik.touched.username && formik.errors.username}
                    </small>
                  </div>
                  <div className="mb-3">
                    <CInputGroup>
                      <CInputGroupText>
                        <AtSign size={18} className="font-weight-bold" />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        // errors={formik.touched.email && Boolean(formik.errors.email)}
                      />
                    </CInputGroup>
                    <small className="text-danger">
                      {formik.touched.email && formik.errors.email}
                    </small>
                  </div>
                  <div className="d-grid">
                    <CButton color="success" type="submit" disabled={isLoading}>
                      Create Account
                      {isLoading && <CSpinner color="dark" size="sm" className="mx-1" />}
                    </CButton>
                  </div>
                  <div className="my-2 d-flex justify-content-center">
                    <Link to="/login">Back To Login</Link>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </div>
  )
}

export default Register
