//** React Imports
import React from 'react'

//** Coreui Components
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

//** Icons
import { QuoteAltLeft } from '@styled-icons/boxicons-solid/QuoteAltLeft'
import { MailSend } from '@styled-icons/remix-line/MailSend'

//** Third Party Components
import PropTypes from 'prop-types'

function EmailCard({ status }) {
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

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="d-flex justify-content-between">
          <span className="font-weight-bold">Atlanta Falcons</span>
          <CBadge
            color={handleBadge(status).color}
            shape="rounded-pill"
            className="px-3 d-flex align-items-center "
          >
            {handleBadge(status).label}
          </CBadge>
        </CCardHeader>
        <CCardBody className="d-inline-block">
          <CRow>
            <CCol xs={3} className="pl-1">
              <QuoteAltLeft height={42} className="text-secondary" />
            </CCol>
            <CCol xs={9} className="p-0">
              <p>lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur</p>
            </CCol>
          </CRow>
          <div className="d-flex align-items-end justify-content-between">
            <div>
              <span>
                <MailSend height={18} className="mx-1 mb-1" />
                Sender
              </span>
              <h6>Abeasta Dasna</h6>
            </div>
            <div>
              <small>2022/May/09</small>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

EmailCard.propTypes = {
  status: PropTypes.number,
}

export default EmailCard
