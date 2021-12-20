import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useLocation,
} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/LogReg/Login'
import Register from './pages/LogReg/Register'
import CodeforcesUp from './pages/Upsolve/CodeforcesUp'
import CodechefUp from './pages/Upsolve/CodechefUp'
import AtcoderUp from './pages/Upsolve/AtcoderUp'
import Parent from './pages/Ladders-Practice/Parent'
import Profile from './pages/Profile/Profile'
import FillInfo from './pages/LogReg/FillInfo'
import './App.css'
import Questions from './pages/Ladders-Practice/Questions'
import ForgotPass from './pages/LogReg/ForgotPass'
import NewPassword from './pages/LogReg/NewPassword'
import Playlists from './pages/Playlists/Playlists'
import PlaylistQuestions from './pages/Playlists/PlaylistQuestions'
import Problems from './pages/Problems'
import queryString from 'query-string'
import ChangePassword from './pages/LogReg/ChangePassword'
import EmailVerfiedMsg from './pages/LogReg/EmailVerifiedMsg'
import Error404 from './pages/Error404'
import UpdateProfile from './pages/Profile/UpdateProfile'
import AboutUs from './pages/ExtraInfo/AboutUs'
import PrivacyPolicy from './pages/ExtraInfo/PrivacyPolicy'
import TermsAndConditions from './pages/ExtraInfo/TermsAndConditions'
import Contests from '../src/pages/Contests/Contests'
import { Layout, Menu } from 'antd'

const { Header, Footer, Content } = Layout

//react context
export const CredentialsContext = React.createContext()

const App = () => {
  //  setInterval(Validate,300*1000);
  const PlaylistsMatch = () => {
    let params = useParams()
    return (
      //passing handle as prop
      <Playlists handle={params.id} />
    )
  }
  const PlaylistList1 = () => {
    let params = useParams()
    return (
      //passing slug and handle as props
      <PlaylistQuestions slug={params.slug} handle={params.id} />
    )
  }

  const ProfileMatch = () => {
    let params = useParams()
    return (
      //passing handle as prop
      <Profile handle={params.id} />
    )
  }

  const LaddersQuestionPage1 = () => {
    let params = useParams()
    let location = useLocation()

    const dat = queryString.parse(location.search)

    const [pageNo, setPageNo] = useState(dat.page ? dat.page : '')

    return (
      // PARSEINT IS A JS FUNCTION WHICH WILL CONVERT THE THE GIVEN STRING OF NUMBERS
      // ACCORDING TO THE BASE OR RADIX SPECIFIED
      <Questions
        wise={params.wise}
        type={params.type}
        slug={params.slug}
        pageNo={pageNo}
      />
    )
  }

  const LaddersLevel1 = () => {
    let params = useParams()

    return (
      // PARSEINT IS A JS FUNCTION WHICH WILL CONVERT THE THE GIVEN STRING OF NUMBERS
      // ACCORDING TO THE BASE OR RADIX SPECIFIED
      <Parent wise={params.wise} type={params.type} />
    )
  }

  const ContestPage1 = () => {
    let location = useLocation()
    return (
      //location.search is the part of url after ? symbol
      <Contests queryStr={location.search} />
    )
  }

  const ProblemsPage1 = () => {
    let location = useLocation()
    // console.log(location.search);
    const info = queryString.parse(location.search)
    // console.log(JSON.stringify(match.params));
    return <Problems filters={info} />
  }

  const [creds, setCreds] = useState({})
  return (
    <>
      <CredentialsContext.Provider value={{ creds, setCreds }}>
        <Layout>
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              {new Array(7).fill(null).map((_, index) => {
                const key = index + 1
                return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>
              })}
            </Menu>
          </Header>
          <Content>
            <Router>
              <Routes>
                <Route path="/list/:id" element={<PlaylistsMatch />} />
                {/* All Playlists - id is username */}
                <Route path="/list/:id/:slug" element={<PlaylistList1 />} />
                {/* Questions in a Particular playlist - slug is of that problem-list */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Login/Registration */}
                <Route path="/upsolve/codeforces" element={<CodeforcesUp />} />
                {/* Codeforces upsolve */}
                <Route path="/upsolve/atcoder" element={<AtcoderUp />} />
                {/* Atcoder Upsolve */}
                <Route path="/upsolve/codechef" element={<CodechefUp />} />
                {/* Codechef upsolve */}
                <Route path="/" element={<Homepage />} /> {/* Homepage */}
                <Route path="/profile" element={<Profile />} />
                {/* Profile, id - username */}
                <Route path="/:wise/:type" element={<LaddersLevel1 />} />
                {/* wise - topic,level | type - ladder,practice */}
                <Route
                  path="/:wise/:type/:slug"
                  element={<LaddersQuestionPage1 />}
                />
                {/* wise - topic,level | type - ladder,practice | slug is selected series */}
                <Route path="/problems" element={<ProblemsPage1 />} />
                {/* Problems page */}

                <Route path="/contests" element={<ContestPage1 />} />
                {/* Contest page */}
                <Route
                  path="/change_password_request"
                  element={<ChangePassword />}
                />
                {/* request to change [passowrd] */}
                <Route path="/email-verified" element={<EmailVerfiedMsg />} />
                <Route path="/home" element={<Homepage />} /> {/* Homepage */}
                <Route path="/createProfile" element={<FillInfo />} />
                {/* Creating profile for first time login */}
                <Route path="/forgotPass" element={<ForgotPass />} />
                {/* Forgot password - email form */}
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/setNewPass" element={<NewPassword />} />
                {/* Form to set new password */}
                <Route path="/error" element={<Error404 />} />
                <Route path="/updateProfile" element={<UpdateProfile />} />
                {/* Form to update prpfile */}
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/" element={<Homepage />} /> {/* Homepage */}
                <Route path="*" element={<Error404 />} />
              </Routes>
              {/* <Route element={ErrorPage}/> */}
            </Router>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Codedigger ©2021 </Footer>
        </Layout>
      </CredentialsContext.Provider>
    </>
  )
}

export default App