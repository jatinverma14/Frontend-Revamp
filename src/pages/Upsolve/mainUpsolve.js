import React, { useState, useEffect } from 'react'
import Validate from './Validate'
import Toggle from './Toggle'
import Carousel_Upsolve from './CarouselUpsolve'
import Lastpages from './Lastpages'
import { Spin, Alert } from 'antd'
// import { CodechefAPI } from '../../actions/Upsolve'
import { codechef } from '../../actions/upsolve.actions'
import { codeforces } from '../../actions/upsolve.actions'
import {atcoder} from '../../actions/upsolve.actions'
import  APIData  from '../../actions/Upsolve'
import logo from '../../assets/SitesImages/Codechef/codechef-png.png'
import refresh from '../../assets/Upsolve/reload.png'
import '../../styles/Upsolve/upsolve.css'

const mainUpsolve = (requiredData,platform,siteName) => {
  let [update, setUpdate] = useState(0)
  const [notAttemptedToggle, setnotAttemptedToggle] = useState(false)
  const pageNumbers = []
  const [nextpage, setnextPage] = useState(1)
  const [loader, setLoader] = useState(false)
  const [previousPage, setpreviousPage] = useState(null)
  const [next, setNext] = useState(2)
  const [firstPage, setFirstPage] = useState(1)
  const [lastPage, setLastpage] = useState(null)
  const [APIdata, setData] = useState([])


  const [virtualPracticeToggle, setvirtualPracticeToggle] = useState(false)
  const [PracticeToggle, setPracticeToggle] = useState(false)

  const [currentPage, setcurrentPage] = useState(1)

  useEffect(() => {
    setFirstPage(null)
    setLastpage(null)
    setnextPage(nextpage)
    setpreviousPage(null)
    setNext(null)
    Validate()

    // CodechefAPI(
    //   setFirstPage,
    //   setLastpage,
    //   nextpage,
    //   setpreviousPage,
    //   setNext,
    //   setcurrentPage,
    //   setData,
    //   setLoader
    // )
    // if (required === "SimpleData") {
        APIData(requiredData,setFirstPage,
      setLastpage,
      nextpage,
      setpreviousPage,
      setNext,
      setcurrentPage,
      setData,
      setLoader,platform, PracticeToggle,virtualPracticeToggle,
      setvirtualPracticeToggle)
    // }
    // else if(required === "SimpleData")

    
    
  },[nextpage, virtualPracticeToggle, notAttemptedToggle,PracticeToggle,update])

  if (lastPage != null) {
    for (let i = 1; i <= lastPage; i++) {
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
              <Toggle
                siteName= {siteName}
                update={update}
                // platform = {platform}
                logo={logo}
                imgWidth="220px"
                imgHeight="55px"
                setUpdate={setUpdate}
                refresh={refresh}
                notAttemptedToggle={notAttemptedToggle}
                setnotAttemptedToggle={setnotAttemptedToggle}
              />
              {APIdata.map((res) => {
                return (
                  <>
                    {res.problems.length > 0 ? (
                      <>
                        <Carousel_Upsolve
                          platform=  {platform}
                          name={res.name}
                          problems={res.problems}
                          notAttemptedToggle={notAttemptedToggle}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )
              })}

              <div className="paginate">
                <Lastpages
                  page={nextpage}
                  setLoader={setLoader}
                  pageNumbers={pageNumbers}
                  prev={previousPage}
                  first={firstPage}
                  setnextPage={setnextPage}
                  setcurrentPage={setcurrentPage}
                  next={next}
                  lastPage={lastPage}
                />
              </div>
              {/* <Footer /> */}
            </>
          ) : (
            // <Loading />
            <p>Loading</p>
          )}
        </div>
      )}
    </>
  )
}
export default mainUpsolve
