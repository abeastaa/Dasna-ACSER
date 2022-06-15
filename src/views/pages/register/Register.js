// ** React Imports
import React, { useState } from 'react'

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
} from '@coreui/react'

// ** Custom Hooks
import useRequest from '../../../utility/useRequest'

// ** Third Party Libraries
import { useFormik } from 'formik'
import * as yup from 'yup'

// ** Icons
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { AtSign } from '@styled-icons/foundation/AtSign'

// ** Logo
import Logo from '../../../assets/images/logtrans.png'
import NameLogo from '../../../assets/images/textlogotra.png'

// ** Validation Schema
const validationSchema = yup.object({
  username: yup.string('Enter your username').required('Username is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
})

const Register = () => {
  // **  Hooks
  const { request } = useRequest()

  // States
  const [isLoading, setIsLoading] = useState(false)

  // ** Submit Register In Back-End
  const handleRegisterRequest = (data) => {
    request(false, '/register', 'POST', data)
    setIsLoading(true)

    // .then((res) => {
    //   setIsLoading(false)
    //   if (res.data && res.data.accessToken) {
    //     localStorage.setItem('token', res.data.accessToken)
    //     setToken(res.data.accessToken)
    //     navigate('/')
    //   } else {
    //     setToast(createToast(res.response.data.msg))
    //   }
    // })
    // .catch((err) => {
    //   setIsLoading(false)
    //   if (err.response.status === 401) {
    //     setToast(createToast(err.response.data.msg))
    //   } else {
    //     setToast(createToast('Sorry, something went wrong!'))
    //   }
    // })
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
          <CCol md={7} lg={5} xl={4}>
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
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
