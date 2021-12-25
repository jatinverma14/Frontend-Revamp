import React, { useState, useEffect } from 'react'
import Validate from './Validate'
import { codeforces } from '../../actions/upsolve.actions'
import { CodeforcesAPI } from '../../actions/Upsolve';
import Toggle from './Toggle';
import Carousel_Upsolve from './CarouselUpsolve';
import Lastpages from './Lastpages';
import '../../styles/Upsolve/upsolve.css'
import "react-multi-carousel/lib/styles.css";
import logo from '../../assets/SitesImages/Codeforces/codeforces.png'
import refresh from '../../assets/Upsolve/reload.png'

function Codeforces() {
  const pageNumbers = []

  const [nextpage, setPage] = useState(1)
  const [curPage, setCurPage] = useState(1)
  const [loader, setLoader] = useState(false)
  const [prvPage, setprvPage] = useState(null)
  const [next, setNext] = useState(2)
  const [firstPage, setFirst] = useState(1)
  const [last, setLast] = useState()
  const [APIdata, setData] = useState([])
  const [virtualPracticeToggle, setvirtualPracticeToggle] = useState(false)
  let [update, setUpdate] = useState(0)

  const [notAttemptedToggle, setnotAttemptedToggle] = useState(false)


  const width = { width: 200 }

  useEffect(() => {
    setFirst(1)
    setLast(null)
    setPage(nextpage)
    setprvPage(null)
    setNext(null)
    Validate()


    CodeforcesAPI(setFirst, setLast,
      nextpage, virtualPracticeToggle, setvirtualPracticeToggle,
      setprvPage,
      setNext, setCurPage, setData, setLoader)

  }, [nextpage, virtualPracticeToggle, notAttemptedToggle, update])
  if (last != null) {
    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i)
    }
  }

  function ChangePage(checked) {

    async (val) => {
      await setvirtualPracticeToggle(!virtualPracticeToggle)
      setTimeout(() => {
        setLoader(true)
      }, 1000)

      setPage(1)
    }
  }

  function onChange() {


    setnotAttemptedToggle(!notAttemptedToggle);
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
              <img className='ImgLogo' src={logo}/>

              <Toggle siteName="Codeforces" update = {update} setUpdate={setUpdate} refresh={refresh} notAttemptedToggle={notAttemptedToggle} setnotAttemptedToggle={setnotAttemptedToggle} ChangePage={ChangePage} />
              
              {APIdata.map((res) => {
                return (
                  <>
                    {res.problems.length > 0 ? (
                      <>
                        <Carousel_Upsolve platform = {codeforces}  name = {res.name} problems = {res.problems} notAttemptedToggle = {notAttemptedToggle} />
                        
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )
              })}
              <div className="paginate">
                
                <Lastpages page = {nextpage} setLoader = {setLoader} pageNumbers = {pageNumbers} prev = {prvPage} setPage = {setPage} setCurPage = {setCurPage} first = {firstPage} last = {last} next = {next}/>
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
export default Codeforces
