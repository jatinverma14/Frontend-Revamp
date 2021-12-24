import React, { useState, useEffect } from 'react'
import Validate from './Validate'
import '../../styles/Upsolve/upsolve.css'
import { Spin, Alert } from 'antd';
import Carousel from 'react-multi-carousel'
import { Row, Col } from 'antd';
import "react-multi-carousel/lib/styles.css";
import { Popover, Button } from 'antd';
import { Switch } from 'antd';
import Tags from '../../assets/Upsolve/tags-icon2.png'
import logo from '../../assets/SitesImages/Codechef/codechef-png.png'
import refresh from '../../assets/Upsolve/reload.png'
import { CodechefAPI } from '../../actions/Upsolve';
import CommonCard from './CommonContestCard';
import CommonQues from './CommonQues';
import RESPONSIVE from '../../utils/Upsolveresponsive';
import Toggle from './Toggle';
import Pages from './Pages';




const Codechef = () => {
  let [update, setUpdate] = useState(0)
  const [wn, setWN] = useState(false)
  const pageNumbers = []
  const [page, setPage] = useState(1)
  const [loader, setLoader] = useState(false)
  const [prev, setPrev] = useState(null)
  const [next, setNext] = useState(2)
  const [first, setFirst] = useState(1)
  const [last, setLast] = useState(null)
  const [conData, setData] = useState([])
  const [curPage, setCurPage] = useState(1)

  useEffect(() => {
    setFirst(null)
    setLast(null)
    setPage(page)
    setPrev(null)
    setNext(null)
    Validate()

    // calling fetchApi function
    CodechefAPI(setFirst, setLast,
      page,
      setPrev,
      setNext, setCurPage, setData, setLoader)


  }, [page, update])

  if (last != null) {
    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i)
    }
  }       

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
  };


  return (
    <>
      {/* <Navbar /> */}
      <br></br>

      {loader ? (
        // <Spinner className="loading-animation" animation="border" />
        <Spin tip="Loading...">
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
        </Spin>
      ) : (
        <div className="body">
          {conData.length > 0 ? (
            <>
              <Toggle siteName="AtCoder" logo={logo} imgWidth="220px" imgHeight="55px" setUpdate={setUpdate} refresh={refresh} wn={wn} setWN={setWN} />
              <br></br>

              {conData.map((res) => {
                return (
                  <>
                    {res.problems.length > 0 ? (

                      <>
                        <Row gutter={[16, 10]} className="contestRow">
                          <Col span={5} >

                            <CommonCard name={res.name} />

                          </Col>
                          <Col span={19} >


                            <Carousel responsive={RESPONSIVE}>
                              {res.problems.map((prob) => {
                                if (prob.status === 'solved') {
                                  if (wn == false) {
                                    return (
                                      <Col span={19}>
                                        <div className="solved">

                                          <CommonQues platform="codechef" url={prob.url} index={prob.index} name={prob.name} className="green" tags={prob.tags} status="SOLVED" />
                                        </div>
                                      </Col>
                                    )
                                  }
                                } else if (prob.status === 'wrong') {
                                  return (
                                    <Col span={19}>
                                      {' '}
                                      <div className="wrong">

                                        <CommonQues platform="codechef" url={prob.url} index={prob.index} name={prob.name} className="red" tags={prob.tags} status="WRONG" />

                                      </div>
                                    </Col>
                                  )
                                } else if (prob.status === 'upsolved') {
                                  if (wn == false) {
                                    return (
                                      <Col span={19}>
                                        <div className="upsolved">
                                          <CommonQues platform="codechef" url={prob.url} index={prob.index} name={prob.name} className="blue" tags={prob.tags} status="UNSOLVED" />
                                        </div>
                                      </Col>
                                    )
                                  }
                                } else if (prob.status == 'not_attempt') {
                                  return (
                                    <Col span={19}>
                                      {' '}
                                      <div className="not_attempted">

                                        <CommonQues platform="codechef" url={prob.url} index={prob.index} name={prob.name} className="viol" tags={prob.tags} status="NOT ATTEMPTED" />
                                      </div>
                                    </Col>
                                  )
                                }
                              })}
                            </Carousel>
                          </Col>
                        </Row>
                        <br></br>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )
              })}

              <div className="paginate">
                <nav className="paginator">
                  <ul className="pagination">
                    {Pages(page,setLoader, setPage, )}

                    {pageNumbers.map((number) => (
                      <li key={number} className="page-item">
                        <a
                          style={{ padding: '15px' }}
                          onClick={() => {
                            setTimeout(() => {
                              setLoader(true)
                            }, 1000)
                            setPage(number)
                            setTimeout(100)
                            setCurPage(number)
                          }}
                          className={`${page == number ? `active-page` : 'page-link'
                            }`}
                        >
                          {number}
                        </a>
                      </li>
                    ))}
                    {page != last ? (
                      <a
                        style={{ padding: '15px' }}
                        onClick={() => {
                          setTimeout(() => {
                            setLoader(true)
                          }, 1000)
                          setPage(next)
                          setCurPage(next)
                        }}
                        className="page-link"
                      >{`>`}</a>
                    ) : (
                      <></>
                    )}
                    {page != last ? (
                      <a
                        style={{ padding: '15px' }}
                        onClick={() => {
                          setTimeout(() => {
                            setLoader(true)
                          }, 1000)
                          setPage(last)
                          setCurPage(last)
                        }}
                        className="page-link"
                      >
                        Last
                      </a>
                    ) : (
                      <></>
                    )}
                  </ul>
                </nav>
              </div>
              {/* <Footer /> */}
            </>
          ) : (
            // <Loading />
            <p>hello
            </p>

          )
          }
        </div >
      )}
    </>
  )
}
export default Codechef
