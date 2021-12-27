import React, { useState, useEffect } from 'react'
// import Validate from './Validate'
import { codeforces } from '../../actions/upsolve.actions'
// import codeforcesAPIData from '../../actions/Upsolve'
// import Toggle from './Toggle'
// import Carousel_Upsolve from './CarouselUpsolve'
// import Lastpages from './Lastpages'
// import logo from '../../assets/SitesImages/Codeforces/codeforces.png'
// import refresh from '../../assets/Upsolve/reload.png'
// import '../../styles/Upsolve/upsolve.css'
// import 'react-multi-carousel/lib/styles.css'

// function Codeforces() {
//   const pageNumbers = []

//   const [nextpage, setnextPage] = useState(1)
//   const [currentPage, setcurrentPage] = useState(1)
//   const [loader, setLoader] = useState(false)
//   const [previousPage, setpreviousPage] = useState(null)
//   const [next, setNext] = useState(2)
//   const [firstPage, setFirstPage] = useState(1)
//   const [lastPage, setLastpage] = useState()
//   const [APIdata, setData] = useState([])
//   const [virtualPracticeToggle, setvirtualPracticeToggle] = useState(false)
//   let [update, setUpdate] = useState(0)

//   const [notAttemptedToggle, setnotAttemptedToggle] = useState(false)

//   const width = { width: 200 }

//   useEffect(() => {
//     setFirstPage(1)
//     setLastpage(null)
//     setnextPage(nextpage)
//     setpreviousPage(null)
//     setNext(null)
//     Validate()

//     // CodeforcesAPI(
//     //   setFirstPage,
//     //   setLastpage,
//     //   nextpage,
//     //   virtualPracticeToggle,
//     //   setvirtualPracticeToggle,
//     //   setpreviousPage,
//     //   setNext,
//     //   setcurrentPage,
//     //   setData,
//     //   setLoader
//     // )

//     codeforcesAPIData(
//       "virtualData", setFirstPage,
//       setLastpage,
//       nextpage,
//       setpreviousPage,
//       setNext,
//       setcurrentPage,
//       setData,
//       setLoader, "codeforces", virtualPracticeToggle,
//       setvirtualPracticeToggle
//     )

//   }, [nextpage, virtualPracticeToggle, notAttemptedToggle, update])
//   if (lastPage != null) {
//     for (let i = 1; i <= lastPage; i++) {
//       pageNumbers.push(i)
//     }
//   }

//   function ChangePage(checked,virtualPracticeToggle,setvirtualPracticeToggle) {

//      async (val) => {
//       await setvirtualPracticeToggle(!virtualPracticeToggle)
//       setTimeout(() => {
//         setLoader(true)
//       }, 1000)

//       setnextPage(1)
//     }
//   }

//   function onChange() {
//     setnotAttemptedToggle(!notAttemptedToggle)
//   }

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
//               <img className="ImgLogo" src={logo} />

//               <Toggle
//                 siteName="Codeforces"
//                 update={update}
//                 platform = "codeforces"
//                 setUpdate={setUpdate}
//                 refresh={refresh}
//                 notAttemptedToggle={notAttemptedToggle}
//                 setnotAttemptedToggle={setnotAttemptedToggle}
//                 // ChangePage={ChangePage(virtualPracticeToggle,setvirtualPracticeToggle)}
                
//               />

//               {APIdata.map((res) => {
//                 return (
//                   <>
//                     {res.problems.length > 0 ? (
//                       <>
//                         <Carousel_Upsolve
//                           platform={codeforces}
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
//                   setLoader={setLoader}
//                   pageNumbers={pageNumbers}
//                   prev={previousPage}
//                   setnextPage={setnextPage}
//                   setcurrentPage={setcurrentPage}
//                   first={firstPage}
//                   lastPage={lastPage}
//                   next={next}
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
// export default Codeforces



import mainUpsolve from "./mainUpsolve";

// function Codeforces() {
//   mainUpsolve ("virtualData", "codeforces")

// }


// import React from 'react'

function CodeforcesUp() {
  return (
    <>
    {mainUpsolve("virtualData",codeforces,"codeforces")}
    </>
  )
}

export default CodeforcesUp

