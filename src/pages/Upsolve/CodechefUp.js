import React, { useState, useEffect } from 'react'
import Validate from './Validate'
import Toggle from './Toggle';
import Carousel_Upsolve from './CarouselUpsolve';
import Lastpages from './Lastpages';
import { Spin, Alert } from 'antd';
import { CodechefAPI } from '../../actions/Upsolve';
import '../../styles/Upsolve/upsolve.css'
import logo from '../../assets/SitesImages/Codechef/codechef-png.png'
import refresh from '../../assets/Upsolve/reload.png'

const Codechef = () => {
  let [update, setUpdate] = useState(0)
  const [notAttemptedToggle, setnotAttemptedToggle] = useState(false)
  const pageNumbers = []
  const [nextpage, setPage] = useState(1)
  const [loader, setLoader] = useState(false)
  const [prvPage, setprvPage] = useState(null)
  const [next, setNext] = useState(2)
  const [firstPage, setFirst] = useState(1)
  const [last, setLast] = useState(null)
  const [APIdata, setData] = useState([])
  const [curPage, setCurPage] = useState(1)

  useEffect(() => {
    setFirst(null)
    setLast(null)
    setPage(nextpage)
    setprvPage(null)
    setNext(null)
    Validate()

    // calling fetchApi function
    CodechefAPI(setFirst, setLast,
      nextpage,
      setprvPage,
      setNext, setCurPage, setData, setLoader)
  }, [nextpage, update])

  if (last != null) {
    for (let i = 1; i <= last; i++) {
      pageNumbers.push(i)
    }
  }       

  return (
    <>
      {/* <Navbar /> */}
      
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
          {APIdata.length > 0 ? (
            <>
              <Toggle siteName="AtCoder" update = {update} logo={logo} imgWidth="220px" imgHeight="55px" setUpdate={setUpdate} refresh={refresh} notAttemptedToggle={notAttemptedToggle} setnotAttemptedToggle={setnotAttemptedToggle} />
              {APIdata.map((res) => {
                return (
                  <>
                    {res.problems.length > 0 ? (
                      <>
                        <Carousel_Upsolve platform = "codechef" name = {res.name} problems = {res.problems} notAttemptedToggle = {notAttemptedToggle}  />
                      
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )
              })}

              <div className="paginate">
              <Lastpages page = {nextpage} setLoader = {setLoader} pageNumbers = {pageNumbers} prev = {prvPage} first = {firstPage} setPage = {setPage} setCurPage = {setCurPage} next = {next} last = {last}/>
              </div>
              {/* <Footer /> */}
            </>
          ) : (
            // <Loading />
            <p>Loading</p>

          )
          }
        </div >
      )}
    </>
  )
}
export default Codechef
