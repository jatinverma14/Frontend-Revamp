import React, { useState, useEffect } from 'react'
// import Loading from '../logreg/loading.jsx'
// import Navbar from '../../components/Header/Navbar'
// import FooterSmall from '../../components/Footer/FooterSmall'
import queryString from 'query-string'
import update from 'immutability-helper' // it'll be used in the func to change the difficulty. Immutability-helper is an alternative for react-addon-update (react-addon-update is no longer maintained).
import AccordionCom from '../../components/AccordionCom'
import DIFFICULTY_OBJECT from '../../utils/StaticData'
import { Button, Col, Switch, Input, Row } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import ModalForDivision from './ModalForDivision'
import '../../styles/Contests/contests.css'

function ContestPage({ queryStr, ContestAPI }) {
  //queryStr is current url string
  const [datap, setDatap] = useState(queryStr.replace(/;/g, '&'))

  //for sidenav (for adding a class)
  const [openSideNav, setOpenSideNav] = useState('')
  //for blur bckground
  const [blurBackground, setBlurBackground] = useState('')

  // search box
  const { Search } = Input

  //Parsing into json
  const [queryDefault, setQueryDefault] = useState(
    queryString.parse(
      datap,
      { parseBooleans: true },
      { arrayFormat: 'separator', arrayFormatSeparator: ';' }
    )
  )

  const creds = JSON.parse(localStorage.getItem('creds'))
  const [show, setShow] = useState(true)
  const [problems, setProblems] = useState([])
  const [error, setErrors] = useState(false)

  const [searchText, setSearchText] = useState()

  //configuring defaut display of difficulty
  const [displayDiff, setDisplayDiff] = useState(
    queryDefault.divs
      ? {
          values: [
            queryDefault.divs.includes('Div. 1'),
            queryDefault.divs.includes('Div. 2'),
            queryDefault.divs.includes('Div. 3'),
            queryDefault.divs.includes('Div. 4'),
            queryDefault.divs.includes('Educational'),
            queryDefault.divs.includes('Global'),
          ],
        }
      : { values: [false, false, false, false, false, false] }
  )

  //FIlter parameters
  const [gym, setGym] = useState(queryDefault.gym ? queryDefault.gym : false)
  const [gymCount, setGymCount] = useState(queryDefault.gym ? true : false)
  const [mentorr, setMentorr] = useState(
    queryDefault.mentor ? queryDefault.mentor : false
  )
  const [mentorrCount, setMentorrCount] = useState(
    queryDefault.mentor ? true : false
  )

  const [difficultyQueries, setDifficultyQueries] = useState(
    queryDefault.divs ? queryDefault.divs.split(',') : []
  )

  const [isDiffChange, setIsDiffChange] = useState(
    queryDefault.divs ? true : false
  )

  //Function to change the difficulty
  const changeDifficultyFilter = (event, lev) => {
    const res = event.target.checked
    setIsDiffChange(true)
    // const difficultyAdd = difficultyLevels[lev]
    const difficultyAdd = DIFFICULTY_OBJECT.difficultyLevels[lev]
    if (res) {
      setDifficultyQueries([...difficultyQueries, difficultyAdd])
      setDisplayDiff(
        update(displayDiff, {
          values: {
            [lev]: {
              $set: true,
            },
          },
        })
      )
    } else {
      const newList = difficultyQueries.filter(
        (item) => item != DIFFICULTY_OBJECT.difficultyFilter[lev]
      )
      setDifficultyQueries(newList)
      setDisplayDiff(
        update(displayDiff, {
          values: {
            [lev]: {
              $set: false,
            },
          },
        })
      )
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    let urlTo = '/contests?'

    if (isDiffChange && difficultyQueries.length > 0) {
      urlTo =
        urlTo +
        `divs=${JSON.stringify(difficultyQueries)
          .replace(/"/g, '')
          .replace(/]|[[]/g, '')}`
    }

    if (gymCount) {
      urlTo = urlTo + `;gym=${JSON.stringify(gym)}`
    }

    if (mentorrCount) {
      urlTo = urlTo + `;mentor=${JSON.stringify(mentorr)}`
    }
    window.location.href = urlTo
  }

  //searching for a contest
  const handleSearch = (e) => {
    const searchUrl = `/contests/?divs=${searchText}`
    window.location.href = searchUrl
  }

  //opening filter block
  function openNav() {
    setOpenSideNav('sideNavOpen')
    setBlurBackground('blur_bckgrnd')
  }

  //closing filter block
  function closeNav() {
    setOpenSideNav('sideNavClose')
    setBlurBackground(null)
  }

  //rendering contests
  useEffect(() => {
    ContestAPI(creds, queryStr)
      .then((res) => setProblems(res))
      .then((show) => setShow(false))
      .catch((error) => setErrors(true))
  }, [])

  //changing gym filter
  const gymChange = (e) => {
    setGym(!gym)
    setGymCount(true)
  }

  //changing mentor filter
  const mentorrChange = (e) => {
    setMentorr(!mentorr)
    setMentorrCount(true)
  }

  return show == true ? (
    <>{/* <Loading /> */}</>
  ) : (
    <>
      <div className="main_container">
        <div id="contest_nav_id">{/* <Navbar /> */}</div>
        <h3 className={`page_heading ${blurBackground}`} id="page_heading_id">
          Contests
        </h3>
        <Button className="filter_buttonnn" type="primary" onClick={openNav}>
          Filter
        </Button>
        <Button
          className="refresh_buttonnn"
          type="primary"
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>

        <div id="mySidenav1" className={`sidenav1 ${openSideNav}`}>
          {/* modal popup */}
          <ModalForDivision
            difflev={DIFFICULTY_OBJECT.difficultyLevels}
            display={displayDiff}
            change={changeDifficultyFilter}
          />
          <div className="filterHeading">
            Gym:
            <Switch
              className="switchFilter"
              defaultChecked={gym}
              onChange={gymChange}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </div>
          <div className="filterHeading">
            Solved By Mentor:
            <Switch
              className="switchFilter"
              defaultChecked={mentorr}
              onChange={mentorrChange}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </div>
          <br></br> <br></br>
          <Button className="sidenav_apply_button" onClick={handleSubmit}>
            Apply
          </Button>
          <Button className="sidenav_close_button" onClick={closeNav}>
            Close
          </Button>
        </div>

        {!problems.result ? (
          // <Loading />
          <h1>hi</h1>
        ) : (
          <>
            <div
              className={`contests_page ${blurBackground}`}
              id="contests_page_id"
            >
              <div className="roww">
                <div className="input-group">
                  {/* search box */}
                  <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onChange={(e) => setSearchText(e.target.value)}
                    onSearch={handleSearch}
                    className="search_box"
                  />
                </div>
              </div>
              <Row gutter={[16, 16]}>
                {problems.result.map((playlist, i) => {
                  return (
                    <>
                      <Col
                        span={screen.width > 768 ? 12 : 25}
                        style={{ marginBottom: '1rem' }}
                      >
                        <AccordionCom problem={playlist} />
                      </Col>
                    </>
                  )
                })}
              </Row>
            </div>
            {/* <FooterSmall /> */}
          </>
        )}
      </div>
    </>
  )
}

export default ContestPage
