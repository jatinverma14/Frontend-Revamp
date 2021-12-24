import React, { useState, useEffect } from 'react'
import Validate from './Validate'
import '../../styles/Upsolve/upsolve.css'
import { Spin, Alert } from 'antd';
import logo from '../../assets/SitesImages/Codechef/codechef-png.png'
import refresh from '../../assets/Upsolve/reload.png'
import { CodechefAPI } from '../../actions/Upsolve';
import Toggle from './Toggle';
import Carousel_Upsolve from './CarouselUpsolve';
import Lastpages from './Lastpages';

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
              <Toggle siteName="AtCoder" update = {update} logo={logo} imgWidth="220px" imgHeight="55px" setUpdate={setUpdate} refresh={refresh} wn={wn} setWN={setWN} />
              <br></br>

              {conData.map((res) => {
                return (
                  <>
                    {res.problems.length > 0 ? (
                      <>
                        <Carousel_Upsolve platform = "codechef" name = {res.name} problems = {res.problems} wn = {wn}  />
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
