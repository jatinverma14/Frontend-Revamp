import React, { useEffect, useState } from 'react'
import Validate from './Validate'
import '../../styles/Upsolve/upsolve.css'
import logo from '../../assets/SitesImages/Atcoder/atcoder.png'
import refresh from '../../assets/Upsolve/reload.png'
import { AtcoderAPI } from '../../actions/Upsolve';
import Toggle from './Toggle';
import Carousel_Upsolve from './CarouselUpsolve';
import Lastpages from './Lastpages';

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
                            <Toggle siteName="AtCoder" update = {update} logo={logo} imgWidth="fit-content" imgHeight="50px" setUpdate={setUpdate} refresh={refresh} wn={wn} setWN={setWN} ChangePage={ChangePage} />
                            <br></br>

                            {conData.map((res) => {
                                return (
                                    <>
                                        {res.problems.length > 0 ? (
                                            <>
                                                <Carousel_Upsolve platform = "atcoder" name={res.name} problems={res.problems} wn={wn} />
                                                <br></br>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                )
                            })}
                            <div className="paginate">
                            <Lastpages page = {page} setLoader = {setLoader} pageNumbers = {pageNumbers} setPage = {setPage} setCurPage = {setCurPage} last = {last}/>
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
