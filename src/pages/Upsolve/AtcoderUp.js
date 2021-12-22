import React, { useEffect, useState } from 'react'
import Validate from './Validate'
import { Row, Col } from 'antd';
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";
import '../../styles/Upsolve/upsolve.css'
import { atcoder } from './upsolve.actions'

import logo from '../../assets/SitesImages/Atcoder/atcoder.png'
import refresh from '../../assets/Upsolve/reload.png'
import { Switch } from 'antd';


const Atcoder = () => {
    const pageNumbers = []

    const [page, setPage] = useState(1)
    const [loader, setLoader] = useState(false)
    const [prev, setPrev] = useState(null)
    const [next, setNext] = useState(2)
    const [first, setFirst] = useState(1)
    const [last, setLast] = useState(null)
    const [conData, setData] = useState([])
    const [Prac, setPrac] = useState(false)
    const [wn, setWN] = useState(false)
    let [update, setUpdate] = useState(0)
    const [curPage, setCurPage] = useState(1)
    useEffect(() => {
        Validate()
        setFirst(1)
        setLast(null)
        setPage(page)
        setPrev(null)
        setNext(null)
        async function fetchData() {
            const creds = JSON.parse(localStorage.getItem('creds'))
            const acc = creds.access
            const response = await atcoder(acc, page, Prac)
            if (response.status === 200) {
                const data = await response.json()
                //  console.log(data);
                if (data.status === 'OK' && data.result.length > 0) {
                    //console.log("yipee");
                    const newLinks = data.links
                    setFirst(newLinks.first.split('=')[1])
                    setLast(newLinks.last.split('=')[1])
                    if (newLinks.prev !== null) {
                        setPrev(newLinks.prev.split('=')[1])
                    }
                    if (newLinks.next !== null) {
                        setNext(newLinks.next.split('=')[1])
                    }
                    setLast(data.meta.last_page)
                    setCurPage(data.meta.current_page)
                    const result = await data.result
                    await setData(result)
                } else if (Prac == true) {
                    localStorage.setItem(
                        'err',
                        'Please practice or compete to view this page'
                    )
                    window.location = '/home'
                } else {
                    setPrac(true)
                }

                setLoader(false)
            } else {
                const data = await response.json()

                if (
                    data.error ===
                    "You haven't Entered your Atcoder Handle in your Profile.. Update Now!"
                ) {
                    localStorage.setItem('err', data.error)
                    window.location = '/home'
                }
            }
        }
        fetchData()
    }, [page, Prac, update])
    if (last != null) {
        for (let i = 1; i <= last; i++) {
            pageNumbers.push(i)
        }
    }
    const responisve = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
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


    function ChangePage(checked) {

        (val) => {
            setPrac(!Prac)
            setTimeout(() => {
                setLoader(true)
            }, 1000)

            setPage(1)
        }
    }


    function onChange() {



        setWN(!wn);
    }






    return (
        <>
            {/* <Navbar></Navbar>
      <br></br>
      <br></br>
      <br></br>
      <br></br> */}
            <br></br>
            {loader ? (
                // <Spinner className="loading-animation" animation="border" />
                <p>hello</p>
            ) : (
                <div className="body">
                    {conData.length > 0 ? (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex' }}>
                                    <h3 textAlign="center">ATCODER</h3>
                                    <img style={{ width: '60px', height: '50px' }} src={logo} />
                                </div>

                                <div style={{ display: 'flex', float: 'right' }}>
                                    <div style={{ float: 'right', borderRadius: '5px' }}>
                                        <h6
                                            style={{
                                                fontSize: "0.8rem", paddingRight: "1rem",
                                                padding: '3px',
                                                color: 'white',
                                                marginTop: '2px',
                                            }}
                                        >
                                            Include Practice
                                        </h6>
                                        <div style={{ display: 'block', marginLeft: '25px' }}>
                                            <Switch style={{ backgroundcolor: "white" }} defaultUnChecked onChange={ChangePage} />
                                            {/* <ToggleButton
                        inactiveLabel={''}
                        activeLabel={''}
                        value={Prac || false}
                        onToggle={(val) => {
                          setPrac(!Prac)
                          setTimeout(() => {
                            setLoader(true)
                          }, 1000)
                          setPage(1)
                        }}
                      /> */}
                                        </div>
                                    </div>
                                    <div style={{ float: 'right', borderRadius: '5px' }}>
                                        <h6
                                            style={{

                                                padding: '3px',
                                                fontSize: "0.8rem",
                                                color: 'white',
                                                marginTop: '2px',
                                            }}
                                        >
                                            Only Wrong/Not Attempted
                                        </h6>
                                        <div style={{ display: 'block', marginLeft: '45px' }}>
                                            <Switch defaultUnChecked onChange={onChange} />

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
                                                style={{ width: '50px', height: '52px' }}
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
                                                <Row gutter={[16, 10]} className="contestRow">
                                                    <Col span={4}>
                                                        <div style = {{width: "14rem"}} className="contestName">
                                                            <h6
                                                                style=
                                                                {{
                                                                    background: "none",
                                                                    color: "black",
                                                                    fontSize: "0.9rem"

                                                                }}>{res.name}</h6>
                                                        </div>
                                                    </Col>
                                                    <Col span={20}>
                                                        <Carousel responsive={responisve}>
                                                            {res.problems.map((prob) => {
                                                                if (prob.status === 'solved') {
                                                                    if (wn == false) {
                                                                        return (
                                                                            <Col span={19}>
                                                                                <div className="solved">
                                                                                    <a href={prob.url} target="_blank">

                                                                                        <h7 style={{ background: "none", color: "white" }}>
                                                                                            {prob.index}-{prob.name}
                                                                                        </h7>
                                                                                    </a>
                                                                                    <br></br>


                                                                                    <h7 style={{ background: "none" }} className="green">SOLVED</h7>
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
                                                                                    <h7 style={{ background: "none" }}>
                                                                                        {prob.index}-{prob.name}
                                                                                    </h7>
                                                                                </a>
                                                                                <br></br>

                                                                                <h7 style={{ background: "none" }} className="red">WRONG</h7>
                                                                            </div>
                                                                        </Col>
                                                                    )
                                                                } else if (prob.status === 'upsolved') {
                                                                    if (wn == false) {
                                                                        return (
                                                                            <Col span={19}>
                                                                                <div className="upsolved">
                                                                                    <a href={prob.url} target="_blank">
                                                                                        <h7 style={{ background: "none" }}>
                                                                                            {prob.index}-{prob.name}
                                                                                        </h7>
                                                                                    </a>
                                                                                    <br></br>

                                                                                    <h7 style={{ background: "none" }} className="blue">UPSOLVED</h7>
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
                                                                                    <h7 style={{ background: "none", color: "white" }}>
                                                                                        {prob.index}-{prob.name}
                                                                                    </h7>
                                                                                </a>
                                                                                <br></br>

                                                                                <h7 style={{ background: "none" }} className="viol">NOT ATTEMPTED</h7>
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
                                                style={{
                                                    padding: '15px', position: "relative",
                                                    top: "-0.9rem"
                                                }}
                                                onClick={() => {
                                                    setTimeout(() => {
                                                        setLoader(true)
                                                    }, 1000)
                                                    setPage(next)
                                                }}
                                                className="page-link"
                                            >{`>`}</a>
                                        ) : (
                                            <></>
                                        )}
                                        {page != last ? (
                                            <a
                                                style={{
                                                    padding: '15px', position: "relative",
                                                    top: "-0.9rem"
                                                }}
                                                onClick={() => {
                                                    setTimeout(() => {
                                                        setLoader(true)
                                                    }, 1000)
                                                    setPage(last)
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
                        <p>hello</p>
                        // <Loading />
                    )}
                </div>
            )}
        </>
    )
}
export default Atcoder
