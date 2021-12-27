// import React, { useEffect, useState } from 'react'
// import Validate from './Validate'
// import Toggle from './Toggle'
// import Carousel_Upsolve from './CarouselUpsolve'
// import Lastpages from './Lastpages'
// import  APIData  from '../../actions/Upsolve'
// import logo from '../../assets/SitesImages/Atcoder/atcoder.png'
// // import { AtcoderAPI } from '../../actions/Upsolve'
import {atcoder} from '../../actions/upsolve.actions'
// import refresh from '../../assets/Upsolve/reload.png'
// import '../../styles/Upsolve/upsolve.css'

// const Atcoder = () => {
//   const pageNumbers = []
//   const [nextpage, setnextPage] = useState(1)
//   const [loader, setLoader] = useState(false)
//   const [previousPage, setpreviousPage] = useState(null)
//   const [next, setNext] = useState(2)
//   const [firstPage, setFirstPage] = useState(1)
//   const [last, setLastpage] = useState(null)
//   const [APIdata, setData] = useState([])
//   const [PracticeToggle, setPracticeToggle] = useState(false)
//   const [notAttemptedToggle, setnotAttemptedToggle] = useState(false)
//   let [update, setUpdate] = useState(0)
//   const [currentPage, setcurrentPage] = useState(1)
//   useEffect(() => {
//     Validate()
//     setFirstPage(1)
//     setLastpage(null)
//     setnextPage(nextpage)
//     setpreviousPage(null)
//     setNext(null)

//     // AtcoderAPI(
//     //   setFirstPage,
//     //   setLastpage,
//     //   nextpage,
//     //   PracticeToggle,
//     //   setpreviousPage,
//     //   setNext,
//     //   setcurrentPage,
//     //   setData,
//     //   setLoader
//     // )
//     APIData("PracticeData",setFirstPage,
//       setLastpage,
//       nextpage,
//       setpreviousPage,
//       setNext,
//       setcurrentPage,
//       setData,
//       setLoader,"atcoder",PracticeToggle)


//   }, [nextpage, PracticeToggle, update])
//   if (last != null) {
//     for (let i = 1; i <= last; i++) {
//       pageNumbers.push(i)
//     }
//   }
//   // function ChangePage(checked,PracticeToggle,setPracticeToggle) {
//   //   (val) => {
//   //     setPracticeToggle(!PracticeToggle)
//   //     console.log("func runned asshole")
//   //     setTimeout(() => {
//   //       setLoader(true)
//   //     }, 1000)

//   //     setnextPage(1)
//   //   }
//   // }
//   return (
//     <>
//       {/* <Navbar></Navbar> */}

//       {loader ? (
//         // <Spinner className="loading-animation" animation="border" />
//         <p>Loading</p>
//       ) : (
//         <div className="body">
//           {APIdata.length > 0 ? (
//             <>
//               <Toggle
//                 siteName="AtCoder"
//                 update={update}
//                 platform = "atcoder"
//                 logo={logo}
//                 imgWidth="fit-content"
//                 imgHeight="50px"
//                 setUpdate={setUpdate}
//                 refresh={refresh}
//                 notAttemptedToggle={notAttemptedToggle}
//                 setnotAttemptedToggle={setnotAttemptedToggle}
//                 // ChangePage={ChangePage}
//                 PracticeToggle = {PracticeToggle}
//                 setPracticeToggle = {setPracticeToggle}
//                 setLoader = {setLoader}
//                 setnextPage = {setnextPage}
//               />

//               {APIdata.map((res) => {
//                 return (
//                   <>
//                     {res.problems.length > 0 ? (
//                       <>
//                         <Carousel_Upsolve
//                           platform="atcoder"
//                           name={res.name}
//                           problems={res.problems}
//                           notAttemptedToggle={notAttemptedToggle}
//                         />
//                       </>
//                     ) : (
//                       <></>
//                     )}
//                   </>
//                 )
//               })}
//               <div className="paginate">
//                 <Lastpages
//                   page={nextpage}
//                   prev={previousPage}
//                   setLoader={setLoader}
//                   first={firstPage}
//                   next={next}
//                   pageNumbers={pageNumbers}
//                   setnextPage={setnextPage}
//                   setcurrentPage={setcurrentPage}
//                   last={last}
//                 />
//               </div>

//               {/* <Footer /> */}
//             </>
//           ) : (
//             <p>Loading</p>
//             // <Loading />
//           )}
//         </div>
//       )}
//     </>
//   )
// }
// export default Atcoder


import React from 'react'
import mainUpsolve from "./mainUpsolve";

 function AtcoderUp() {
    
  return (
    <>
      {mainUpsolve("PraciceData", "atcoder", "atcoder")}
    </>
  )
}

export default AtcoderUp

