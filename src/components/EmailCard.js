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
        <small>{newDate.toDateString()}</small>
        <br />
        <small>{newDate.toLocaleTimeString()}</small>
      </>
    )
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between">
          <span className="font-weight-bold">{data.title}</span>
          <CBadge
            color={handleBadge(data.criticality).color}
            shape="rounded-pill"
            className="px-3 d-flex align-items-center "
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
              <p>{data.keyWords}</p>
            </CCol>
          </CRow>
          <CRow className="d-flex align-items-start justify-content-between">
            <CCol sm={7}>
              <span>
                <MailSend height={18} className="mx-1 mb-1" />
                Sender
              </span>
              <h6>{data.sender}</h6>
            </CCol>
            <CCol sm={5}>{handleDateTime(data.date)}</CCol>
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
