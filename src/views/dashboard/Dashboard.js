import React, { useState, useEffect, useContext } from 'react'

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
  CSpinner,
} from '@coreui/react'

//** Custom Component
import EmailCard from 'src/components/EmailCard'

//** Icons
import { SortAmountDesc, SortAmountAsc } from '@styled-icons/icomoon/'

const Dashboard = () => {
  // ** Hooks
  const { request } = useRequest()
  // ** states
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sortTypes, setSortTypes] = useState({
    escalated: 'asc',
    critical: 'asc',
    potential: 'asc',
    churned: 'asc',
  })
  // ** Handle sorting Data
  const dataToRender = (list, direction) => {
    if (direction === 'desc') {
      return list.sort((a, b) => {
        return b.date > a.date ? 1 : -1
      })
    } else if (direction === 'asc') {
      return list.sort((a, b) => {
        return a.date > b.date ? 1 : -1
      })
    }
  }

  // ** Handle change sort
  const handleSort = (column) => {
    if (sortTypes[column] === 'asc') {
      setSortTypes({ ...sortTypes, [column]: 'desc' })
    } else {
      setSortTypes({ ...sortTypes, [column]: 'asc' })
    }
  }

  // ** Handle get initial data
  const handleGetData = async () => {
    setIsLoading(true)
    const res = await request(true, 'protected', 'GET')
    console.log(res)
    if (res.response && res.response.status === 401) {
      localStorage.removeItem('token')
    } else {
      setData(res.data.value)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetData()
  }, [])

  return (
    <CRow c>
      {isLoading ? (
        <CCol className="d-flex align-self-center justify-content-center">
          <CSpinner color="primary" variant="grow" />
        </CCol>
      ) : (
        <>
          <CCol sm={12} md={6} lg={3}>
            <CAccordion alwaysOpen flush activeItemKey={1} className="mb-3">
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
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
                  {data && data.alreadyEscalated.length ? (
                    <>
                      <div
                        className="mb-2 text-primary"
                        role="button"
                        onClick={() => {
                          handleSort('escalated')
                        }}
                      >
                        <small className="mx-2">Sort</small>
                        <SortAmountDesc
                          height={18}
                          className={sortTypes.escalated === 'desc' ? 'fa-rotate-180' : null}
                        />
                      </div>
                      {dataToRender(data.alreadyEscalated, sortTypes.escalated).map(
                        (item, index) => {
                          return <EmailCard key={index} data={item} />
                        }
                      )}
                    </>
                  ) : (
                    <span>There is no Email.</span>
                  )}
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          </CCol>
          <CCol sm={12} md={6} lg={3}>
            <CAccordion alwaysOpen flush activeItemKey={1} className="mb-3">
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
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
                  {data && data.critical.length ? (
                    <>
                      <div
                        className="mb-2 text-primary"
                        role="button"
                        onClick={() => {
                          handleSort('critical')
                        }}
                      >
                        <small className="mx-2">Sort</small>
                        <SortAmountDesc
                          height={18}
                          className={sortTypes.critical === 'desc' ? 'fa-rotate-180' : null}
                        />
                      </div>
                      {dataToRender(data.critical, sortTypes.critical).map((item, index) => {
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
            <CAccordion alwaysOpen flush activeItemKey={1} className="mb-3">
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
                  <span className="text-success">POTENTIAL ESCALATIONS</span>
                </CAccordionHeader>
                <CAccordionBody className="mb-4 bg-success bg-opacity-25">
                  {data && data.likelyBeEscalated.length ? (
                    <>
                      <div
                        className="mb-2 text-primary"
                        role="button"
                        onClick={() => {
                          handleSort('potential')
                        }}
                      >
                        <small className="mx-2">Sort</small>
                        <SortAmountDesc
                          height={18}
                          className={sortTypes.potential === 'desc' ? 'fa-rotate-180' : null}
                        />
                      </div>
                      {dataToRender(data.likelyBeEscalated, sortTypes.potential).map(
                        (item, index) => {
                          return <EmailCard key={index} data={item} />
                        }
                      )}
                    </>
                  ) : (
                    <span>There is no Email.</span>
                  )}
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          </CCol>
          <CCol sm={12} md={6} lg={3}>
            <CAccordion alwaysOpen flush activeItemKey={1} className="mb-3">
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
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
                  {data && data.churned.length ? (
                    <>
                      <div
                        className="mb-2 text-primary"
                        ole="button"
                        onClick={() => {
                          handleSort('churned')
                        }}
                      >
                        <small className="mx-2">Sort</small>
                        <SortAmountDesc
                          height={18}
                          className={sortTypes.churned === 'desc' ? 'fa-rotate-180' : null}
                        />
                      </div>
                      {dataToRender(data.churned, sortTypes.churned).map((item, index) => {
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
        </>
      )}
    </CRow>
  )
}

export default Dashboard
