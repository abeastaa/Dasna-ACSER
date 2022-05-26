import React, { useState, useEffect } from 'react'

// ** Custom Hooks
import useRequest from '../../utility/useRequest'

import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CBadge,
  CCol,
  CRow,
} from '@coreui/react'

//** Custom Component
import EmailCard from 'src/components/EmailCard'

//** Icons
import { SortAmountDesc, SortAmountAsc } from '@styled-icons/icomoon/'

const Dashboard = () => {
  // ** Hooks
  const { jwtRequests } = useRequest()

  // ** states
  const [data, setData] = useState(null)

  // ** get initial data from back-end
  const handleGetData = async () => {
    const res = jwtRequests('', 'GET')
    setData(null)
  }

  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <>
      <CRow
      // className="row-cols-sm-12 row-cols-md-6 row-cols-md-3"
      >
        <CCol sm={12} md={6} lg={3}>
          <CAccordion alwaysOpen flush activeItemKey={2} className="mb-3">
            <CAccordionItem itemKey={1}>
              <CAccordionHeader className="text-success">
                <CBadge
                  color="danger"
                  position="top-start"
                  className="mx-2 p-2"
                  shape="rounded-pill"
                >
                  {data ? data.likelyBeEscalated.length : 0}
                </CBadge>
                <span className="text-success">LIKELY TO BE ESCALATED</span>
              </CAccordionHeader>
              <CAccordionBody className="mb-4 bg-success bg-opacity-25">
                {data && data.likelyBeEscalated ? (
                  <>
                    <div className="mb-2 text-primary">
                      <small className="mx-2">Sort</small>
                      <SortAmountDesc height={18} />
                    </div>
                    {data.likelyBeEscalated.map((item, index) => {
                      return <EmailCard key={index} data={item} />
                    })}
                  </>
                ) : (
                  <span>There is no Email.</span>
                )}
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCol>
        <CCol sm={12} md={6} lg={3}>
          <CAccordion alwaysOpen flush activeItemKey={2} className="mb-3">
            <CAccordionItem itemKey={1}>
              <CAccordionHeader className="text-">
                <CBadge
                  color="danger"
                  position="top-start"
                  className="mx-2 p-2"
                  shape="rounded-pill"
                >
                  {data ? data.alreadyEscalated.length : 0}
                </CBadge>
                <span className="text-success">ALREADY ESCALATED</span>
              </CAccordionHeader>
              <CAccordionBody className="mb-4 bg-success bg-opacity-25">
                {data && data.alreadyEscalated ? (
                  <>
                    <div className="mb-2 text-primary">
                      <small className="mx-2">Sort</small>
                      <SortAmountDesc height={18} />
                    </div>
                    {data.alreadyEscalated.map((item, index) => {
                      return <EmailCard key={index} data={item} />
                    })}
                  </>
                ) : (
                  <span>There is no Email.</span>
                )}
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCol>
        <CCol sm={12} md={6} lg={3}>
          <CAccordion alwaysOpen flush activeItemKey={2} className="mb-3">
            <CAccordionItem itemKey={1}>
              <CAccordionHeader className="text-">
                <CBadge
                  color="danger"
                  position="top-start"
                  className="mx-2 p-2"
                  shape="rounded-pill"
                >
                  {data ? data.critical.length : 0}
                </CBadge>
                <span className="text-danger">CRITICAL</span>
              </CAccordionHeader>
              <CAccordionBody className="mb-4 bg-danger bg-opacity-25">
                {data && data.critical ? (
                  <>
                    <div className="mb-2 text-primary">
                      <small className="mx-2">Sort</small>
                      <SortAmountDesc height={18} />
                    </div>
                    {data.critical.map((item, index) => {
                      return <EmailCard key={index} data={item} />
                    })}
                  </>
                ) : (
                  <span>There is no Email.</span>
                )}
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCol>
        <CCol sm={12} md={6} lg={3}>
          <CAccordion alwaysOpen flush activeItemKey={2} className="mb-3">
            <CAccordionItem itemKey={1}>
              <CAccordionHeader className="text-">
                <CBadge
                  color="danger"
                  position="top-start"
                  className="mx-2 p-2"
                  shape="rounded-pill"
                >
                  {data ? data.churned.length : 0}
                </CBadge>
                <span className="text-warning">CHURNED</span>
              </CAccordionHeader>
              <CAccordionBody className="mb-4 bg-warning bg-opacity-25">
                {data && data.churned ? (
                  <>
                    <div className="mb-2 text-primary">
                      <small className="mx-2">Sort</small>
                      <SortAmountDesc height={18} />
                    </div>
                    {data.critical.map((item, index) => {
                      return <EmailCard key={index} data={item} />
                    })}
                  </>
                ) : (
                  <span>There is no Email.</span>
                )}
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
