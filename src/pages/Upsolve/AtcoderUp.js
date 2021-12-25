import React, { useEffect, useState } from 'react'
import Validate from './Validate'
import Toggle from './Toggle';
import Carousel_Upsolve from './CarouselUpsolve';
import Lastpages from './Lastpages';
import { AtcoderAPI } from '../../actions/Upsolve';
import '../../styles/Upsolve/upsolve.css'
import logo from '../../assets/SitesImages/Atcoder/atcoder.png'
import refresh from '../../assets/Upsolve/reload.png'

const Atcoder = () => {
    const pageNumbers = []
    const [nextpage, setPage] = useState(1)
    const [loader, setLoader] = useState(false)
    const [prvPage, setprvPage] = useState(null)
    const [next, setNext] = useState(2)
    const [firstPage, setFirst] = useState(1)
    const [last, setLast] = useState(null)
    const [APIdata, setData] = useState([])
    const [Prac, setPrac] = useState(false)
    const [notAttemptedToggle, setnotAttemptedToggle] = useState(false)
    let [update, setUpdate] = useState(0)
    const [curPage, setCurPage] = useState(1)
    useEffect(() => {
        Validate()
        setFirst(1)
        setLast(null)
        setPage(nextpage)
        setprvPage(null)
        setNext(null)

        AtcoderAPI(setFirst, setLast,
            nextpage, Prac,
            setprvPage,
            setNext, setCurPage, setData, setLoader)
    }, [nextpage, Prac, update])
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

            {loader ? (
                // <Spinner className="loading-animation" animation="border" />
                <p>Loading</p>
            ) : (
                <div className="body">
                    {APIdata.length > 0 ? (
                        <>
                            <Toggle siteName="AtCoder" update = {update} logo={logo} imgWidth="fit-content" imgHeight="50px" setUpdate={setUpdate} refresh={refresh} notAttemptedToggle={notAttemptedToggle} setnotAttemptedToggle={setnotAttemptedToggle} ChangePage={ChangePage} />

                            {APIdata.map((res) => {
                                return (
                                    <>
                                        {res.problems.length > 0 ? (
                                            <>
                                                <Carousel_Upsolve platform = "atcoder" name={res.name} problems={res.problems} notAttemptedToggle={notAttemptedToggle} />
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                )
                            })}
                            <div className="paginate">
                            <Lastpages page = {nextpage} prev = {prvPage} setLoader = {setLoader} first = {firstPage} next = {next} pageNumbers = {pageNumbers} setPage = {setPage} setCurPage = {setCurPage} last = {last}/>
                            </div>

                            {/* <Footer /> */}
                        </>
                    ) : (
                        <p>Loading</p>
                        // <Loading />
                    )}
                </div>
            )}
        </>
    )
}
export default Atcoder
