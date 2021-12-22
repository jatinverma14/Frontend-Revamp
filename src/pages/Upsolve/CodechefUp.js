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
import 'antd/dist/antd.css';

//actions import
import { codechef } from './upsolve.actions'


const Codechef = () => {
  //Validate();
  const pageNumbers = []

  const [page, setPage] = useState(1)
  const [loader, setLoader] = useState(false)
  const [prev, setPrev] = useState(null)
  const [next, setNext] = useState(2)
  const [first, setFirst] = useState(1)
  const [last, setLast] = useState(null)
  const [conData, setData] = useState([])
  const [curPage, setCurPage] = useState(1)
  let [update, setUpdate] = useState(0)
  const [wn, setWN] = useState(false)
  useEffect(() => {
    setFirst(null)
    setLast(null)
    setPage(page)
    setPrev(null)
    setNext(null)
    Validate()
    async function fetchData() {
      //Validate();

      const creds = JSON.parse(localStorage.getItem('creds'))
      console.log(creds);
      const acc = creds.access
      const response = await codechef(acc, page)
      if (response.status === 200) {
        const data = await response.json()

        if (data.status === 'OK') {
          
          if (data.result.length > 0) {

            const newLinks = data.links
            await setFirst(newLinks.first.split('=')[1])


            await setLast(newLinks.last.split('=')[1])

            if (newLinks.prev !== null) {
              setPrev(newLinks.prev.split('=')[1])
            }
            if (newLinks.next !== null) {
              setNext(newLinks.next.split('=')[1])
            }
            await setLast(data.meta.last_page)
            await setCurPage(data.meta.current_page)
          }
          else {
            localStorage.setItem(
              'err',
              'Codechef upsolve is available when you participate in atleast one contest'
            )
            window.location = '/home'
          }
        } else {
          
          localStorage.setItem('err', 'No contest found for this handle')
          window.location = '/home'
        }

        const result = await data.result
        await setData(result)
        setLoader(false)
      } else if (response.status == 500) {
        localStorage.setItem('err', 'No contest found for this handle')
        window.location = '/home'
      } else {
        const data = await response.json()
        localStorage.setItem('err', data.error)
        window.location = '/home'
      }
    }

    fetchData()
  }, [page, update])
  if (last != null) {
    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i)
    }
  }

  // changed by me
  //toggle ki jagah switch
  function onChange(checked) {


    setWN(!wn);
  }
  //till here


  const responisve = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    // width: 150,
  };


 








  return (
    <>
      {/* <Navbar /> */}
      <br></br>
      {/* <br></br>
      <br></br>
      <br></br> */}
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
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img style={{ width: '220px', height: '55px' }} src = {logo} />
                <div style={{ display: 'flex', float: 'right' }}>
                  <div style={{ float: 'right', borderRadius: '5px' }}>
                    <h6
                      style={{
                        padding: '3px',
                        color: 'white',
                        fontSize: "0.8rem",
                        marginTop: '2px',
                      }}
                    >
                      Only Wrong/Not Attempted
                    </h6>
                    <div style={{ display: 'block', marginLeft: '45px' }}>
                      


                      <Switch style = {{backgroundcolor: "white"}} defaultUnChecked onChange={onChange} />
                    </div>
                  </div>

                  <div>
                    <button
                      title="solved? update"
                      style={{ float: 'right', borderRadius: '35px' }}
                      onClick={(e) => {
                        setUpdate(update + 1)
                      }}
                    >
                      <img
                        style={{ width: '40px', height: '40px' }}
                        src={refresh}
                      ></img>
                    </button>
                  </div>
                </div>
              </div>

              <br></br>

              {conData.map((res) => {
                return (
                  <>
                    {res.problems.length > 0 ? (

                      <>
                        <Row gutter={[16,10]} className="contestRow">
                          <Col span = {5} >
                            <div style={{ color: "white"}} className="contestName">
                              <h6 
                              style=
                              { {background: "none",
                               color: "black",
                               fontSize: "0.9rem"
                               
                               }}
                                >{res.name}</h6>

                            </div>
                          </Col>
                          <Col span = {19} >


                            <Carousel responsive={responisve}>
                              {res.problems.map((prob) => {
                                if (prob.status === 'solved') {
                                  if (wn == false) {
                                    return (
                                      <Col span={19}>
                                        <div className="solved">
                                          <a href={prob.url} target="_blank">
                                            
                                            <h7 style = { {background : "none", color: "white"}}>
                                              {prob.index}-{prob.name}
                                            </h7>
                                          </a>
                                          <br></br>

                                          <Popover style={{color: " white"}} content={<div>
                                            <div className="tagsbox">
                                             
                                              {
                                                prob.tags.substr(
                                                  2,
                                                  prob.tags.length - 1
                                                )}
                                            </div>
                                          </div>


                                          } >
                                            <img
                                              style={{
                                                width: '25px',
                                                height: '15px',
                                                float: 'right',
                                                background: "none",
                                                // position="right",
                                                marginTop: '14px',
                                              }}
                                              src={Tags}
                                            ></img> 


                                           </Popover>


                                          <h7 style = {{background: "none"}} className="green">SOLVED</h7>
                                        </div>
                                      </Col>
                                    )
                                  }
                                } else if (prob.status === 'wrong') {
                                  return (
                                    <Col span={19}>
                                      {' '}
                                      <div className="wrong">
                                        <a href={prob.url} target="_blank">
                                          <h7 style = {{background: "none"}}>
                                            {prob.index}-{prob.name}
                                          </h7>
                                        </a>
                                        <br></br>
                                         <Popover content={<div>
                                            <div className="tagsbox">
                                              
                                              {
                                                prob.tags.substr(
                                                  2,
                                                  prob.tags.length - 1
                                                )}
                                            </div>
                                          </div>


                                          } >
                                            <img
                                              style={{
                                                width: '25px',
                                                height: '15px',
                                                float: 'right',
                                                // position="right",
                                                marginTop: '14px',
                                              }}
                                              src={Tags}
                                            ></img> 


                                           </Popover>
                                        <h7 style = {{background: "none"}} className="red">WRONG</h7>
                                      </div>
                                    </Col>
                                  )
                                } else if (prob.status === 'upsolved') {
                                  if (wn == false) {
                                    return (
                                      <Col span={19}>
                                        <div className="upsolved">
                                          <a href={prob.url} target="_blank">
                                            <h7 style = {{background: "none"}}>
                                              {prob.index}-{prob.name}
                                            </h7>
                                          </a>
                                          <br></br>
                                          <Popover content={<div>
                                            <div className="tagsbox">
                                             
                                              {
                                                prob.tags.substr(
                                                  2,
                                                  prob.tags.length - 1
                                                )}
                                            </div>
                                          </div>


                                          } >
                                            <img
                                              style={{
                                                width: '25px',
                                                height: '15px',
                                                float: 'right',
                                                // position="right",
                                                marginTop: '14px',
                                              }}
                                              src={Tags}
                                            ></img> 


                                           </Popover>
                                          <h7 style = {{background: "none"}} className="blue">UPSOLVED</h7>
                                        </div>
                                      </Col>
                                    )
                                  }
                                } else if (prob.status == 'not_attempt') {
                                  return (
                                    <Col span={19}>
                                      {' '}
                                      <div className="not_attempted">
                                        <a href={prob.url} target="_blank">
                                          <h7 style = {{background: "none",  color: "white"}}>
                                            {prob.index}-{prob.name}
                                          </h7>
                                        </a>
                                        <br></br>
                                        <Popover content={<div>
                                            <div className="tagsbox">
                                            
                                              {
                                                prob.tags.substr(
                                                  2,
                                                  prob.tags.length - 1
                                                )}
                                            </div>
                                          </div>


                                          } >
                                            <img
                                              style={{
                                                width: '25px',
                                                height: '15px',
                                                float: 'right',
                                                // position="right",
                                                background: "none",
                                                marginTop: '14px',
                                              }}
                                              src={Tags}
                                            ></img> 


                                           </Popover>
                                        <h7 style = {{background: "none" }} className="viol">NOT ATTEMPTED</h7>
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
                    {page != 1 ? (
                      <a
                        style={{ padding: '15px' }}
                        onClick={() => {
                          setTimeout(() => {
                            setLoader(true)
                          }, 1000)

                          setPage(first)
                        }}
                        className="page-link"
                      >
                        First
                      </a>
                    ) : (
                      <></>
                    )}
                    {page != 1 ? (
                      <a
                        style={{ padding: '15px' }}
                        onClick={() => {
                          setTimeout(() => {
                            setLoader(true)
                          }, 1000)

                          setPage(prev)
                        }}
                        className="page-link"
                      >{`<`}</a>
                    ) : (
                      <></>
                    )}

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
