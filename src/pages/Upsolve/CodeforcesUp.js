import React, { useState, useEffect } from 'react'
import Validate from './Validate'
import '../../styles/Upsolve/upsolve.css'
import "react-multi-carousel/lib/styles.css";
import logo from '../../assets/SitesImages/Codeforces/codeforces.png'
import refresh from '../../assets/Upsolve/reload.png'
import { codeforces } from '../../actions/upsolve.actions'
import { CodeforcesAPI } from '../../actions/Upsolve';
import Toggle from './Toggle';
import Carousel_Upsolve from './CarouselUpsolve';
import Lastpages from './Lastpages';

function Codeforces() {
  const pageNumbers = []

  const [page, setPage] = useState(1)
  const [curPage, setCurPage] = useState(1)
  const [loader, setLoader] = useState(false)
  const [prev, setPrev] = useState(null)
  const [next, setNext] = useState(2)
  const [first, setFirst] = useState(1)
  const [last, setLast] = useState()
  const [conData, setData] = useState([])
  const [vir, setVir] = useState(false)
  let [update, setUpdate] = useState(0)

  const [wn, setWN] = useState(false)


  const width = { width: 200 }

  useEffect(() => {
    setFirst(1)
    setLast(null)
    setPage(page)
    setPrev(null)
    setNext(null)
    Validate()


    CodeforcesAPI(setFirst, setLast,
      page, vir, setVir,
      setPrev,
      setNext, setCurPage, setData, setLoader)

  }, [page, vir, wn, update])
  if (last != null) {
    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i)
    }
  }

  function ChangePage(checked) {

    async (val) => {
      await setVir(!vir)
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
      {/* <Navbar></Navbar> */}

      {loader ? (
        // <Spinner className="loading-animation" animation="border" />
        <p>hello</p>
      ) : (
        <div className="body">
          {conData.length > 0 ? (
            <>
              <img className='ImgLogo' src={logo}/>

              <Toggle siteName="Codeforces" update = {update} setUpdate={setUpdate} refresh={refresh} wn={wn} setWN={setWN} ChangePage={ChangePage} />
              <br></br>
              {conData.map((res) => {
                return (
                  <>
                    {res.problems.length > 0 ? (
                      <>
                        
                        <Carousel_Upsolve platform = {codeforces}  name = {res.name} problems = {res.problems} wn = {wn} />
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
export default Codeforces
