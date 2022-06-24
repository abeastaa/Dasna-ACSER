//** React Imports
import React from 'react'

//** Coreui Components
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

//** Icons
import { QuoteAltLeft } from '@styled-icons/boxicons-solid/QuoteAltLeft'
import { MailSend } from '@styled-icons/remix-line/MailSend'

//** Third Party Components
import PropTypes from 'prop-types'

function EmailCard({ data }) {
  //** Handle Choose Badge
  const handleBadge = (status) => {
    let badge = {}
    switch (status) {
      case 3:
        badge.color = 'dark'
        badge.label = 'Low'
        break
      case 2:
        badge.color = 'warning'
        badge.label = 'Medium'
        break
      case 1:
        badge.color = 'danger'
        badge.label = 'High'
        break
      default:
        break
    }
    return badge
  }

  const handleDateTime = (date) => {
    const newDate = new Date(date)
    return (
      <>
        <p className="font-size-6 m-0">{newDate.toDateString()}</p>
        <p className="font-size-6 m-0">{newDate.toLocaleTimeString()}</p>
      </>
    )
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between">
          <span className="font-size-6 font-weight-bold">{data.title}</span>
          <CBadge
            color={handleBadge(data.criticality).color}
            shape="rounded-pill"
            className="px-2 d-flex align-items-center "
            style={{ height: 30 }}
          >
            {handleBadge(data.criticality).label}
          </CBadge>
        </CCardHeader>
        <CCardBody className="d-inline-block">
          <CRow>
            <CCol xs={3} className="pl-1">
              <QuoteAltLeft height={42} className="text-secondary" />
            </CCol>
            <CCol xs={9} className="p-0">
              <p className="font-size-6 m-0">{data.keyWords}</p>
            </CCol>
          </CRow>
          <CRow className="d-flex align-items-end justify-content-between mt-2">
            <CCol sm={6} className="d-flex flex-column justify-content-end">
              <p className="font-size-6 m-0">
                <MailSend height={18} className="mx-1" />
                Sender
              </p>
              <p style={{ fontWeight: 'bold' }} className="font-size-6 m-0">
                {data.sender}
              </p>
            </CCol>
            <CCol sm={6}>{handleDateTime(data.date)}</CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

EmailCard.propTypes = {
  data: PropTypes.object,
}

export default EmailCard
