import React, { useEffect, useState } from 'react'
import Validate from './Validate'
import { Row, Col } from 'antd';
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";
import '../../styles/Upsolve/upsolve.css'
import logo from '../../assets/SitesImages/Atcoder/atcoder.png'
import refresh from '../../assets/Upsolve/reload.png'
import { Switch } from 'antd';
import { AtcoderAPI } from '../../actions/Upsolve';
import CommonCard from './CommonContestCard';
import CommonQues from './CommonQues';
import RESPONSIVE from '../../utils/Upsolveresponsive';
import Toggle from './Toggle';
import Pages from './Pages';

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

        AtcoderAPI(setFirst, setLast,
            page, Prac,
            setPrev,
            setNext, setCurPage, setData, setLoader)
    }, [page, Prac, update])
    if (last != null) {
        for (let i = 1; i <= last; i++) {
            pageNumbers.push(i)
        }
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
    return (
        <>
            {/* <Navbar></Navbar> */}

            <br></br>
            {loader ? (
                // <Spinner className="loading-animation" animation="border" />
                <p>hello</p>
            ) : (
                <div className="body">
                    {conData.length > 0 ? (
                        <>
                            <Toggle siteName = "AtCoder" logo = {logo} imgWidth = "fit-content" imgHeight = "50px" setUpdate = {setUpdate} refresh = {refresh} wn = {wn} setWN = {setWN}  ChangePage = {ChangePage}/>
                            <br></br> 

                            {conData.map((res) => {
                                return (
                                    <>
                                        {res.problems.length > 0 ? (
                                            <>
                                                <Row gutter={[16, 10]} className="contestRow">
                                                    <Col span={5}>

                                                        <CommonCard name = {res.name}/>
                                                    </Col>
                                                    <Col span={19}>
                                                        <Carousel responsive={RESPONSIVE}>
                                                            {res.problems.map((prob) => {
                                                                if (prob.status === 'solved') {
                                                                    if (wn == false) {
                                                                        return (
                                                                            <Col span={19}>
                                                                                <div className="solved">
                                                                                    <CommonQues platform="atcoder" url={prob.url} index={prob.index} name={prob.name} className="green" tags={prob.tags} status="SOLVED" />
                                                                                </div>
                                                                            </Col>
                                                                        )
                                                                    }
                                                                } else if (prob.status === 'wrong') {
                                                                    return (
                                                                        <Col span={19}>
                                                                            {' '}
                                                                            <div className="wrong">

                                                                                <CommonQues platform="atcoder" url={prob.url} index={prob.index} name={prob.name} className="red" tags={prob.tags} status="WRONG" />

                                                                            </div>
                                                                        </Col>
                                                                    )
                                                                } else if (prob.status === 'upsolved') {
                                                                    if (wn == false) {
                                                                        return (
                                                                            <Col span={19}>
                                                                                <div className="upsolved">
                                                                                    <CommonQues platform="atcoder" url={prob.url} index={prob.index} name={prob.name} className="blue" tags={prob.tags} status="UNSOLVED" />

                                                                                </div>
                                                                            </Col>
                                                                        )
                                                                    }
                                                                } else if (prob.status == 'not_attempt') {
                                                                    return (
                                                                        <Col span={19}>
                                                                            {' '}
                                                                            <div className="not_attempted">
                                                                                <CommonQues platform="atcoder" url={prob.url} index={prob.index} name={prob.name} className="viol" tags={prob.tags} status="NOT ATTEMPTED" />

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
                                       {Pages(page, setLoader, setPage)}
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
