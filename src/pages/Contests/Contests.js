import React, { useState, useEffect } from 'react'
// import Loading from '../logreg/loading.jsx'
// import Navbar from '../../components/Header/Navbar'
// import FooterSmall from '../../components/Footer/FooterSmall'
import queryString from 'query-string'
import update from 'immutability-helper'
import AccordionCom from '../../components/AccordionCom'

import 'antd/dist/antd.css'
import '../../styles/Contests/contests.css'
import { Button, Col, Switch, Input, Row } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import Modal_comm from './Modal_Com'

function ContestPage({info, queryStr}) {
  //queryStr is current url string
  const [datap, setDatap] = useState(queryStr.replace(/;/g, '&'))

  // search box
  const {Search} = Input;

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

  //available difficulty levels
  const difficultyLevels = [
    'Div. 1',
    'Div. 2',
    'Div. 3',
    'Div. 4',
    'Educational',
    'Global',
  ]

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

  //available difficulty filters
  const difficultyFilters = [
    'Div. 1',
    'Div. 2',
    'Div. 3',
    'Div. 4',
    'Educational',
    'Global',
  ]

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
    const difficultyAdd = difficultyLevels[lev]
    if (res) {
      setDifficultyQueries([...difficultyQueries, difficultyAdd])
      console.log(difficultyQueries)
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
        (item) => item != difficultyFilters[lev]
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

    var urlTo = '/contests?'

    if (isDiffChange && difficultyQueries.length > 0) {
      urlTo =
        urlTo +
        `divs=${JSON.stringify(difficultyQueries)
          .replace(/"/g, '')
          .replace(/]|[[]/g, '')}`
    }
    console.log(urlTo)

    if (gymCount) {
      urlTo = urlTo + `;gym=${JSON.stringify(gym)}`
    }

    console.log(urlTo)

    if (mentorrCount) {
      urlTo = urlTo + `;mentor=${JSON.stringify(mentorr)}`
    }
    console.log(urlTo)

    window.location.href = urlTo
  }

  //searching for a contest
  const handleSearch = (e) => {
    // e.preventDefault()
    const searchUrl = `/contests/?divs=${searchText}`
    window.location.href = searchUrl
  }

  //opening filter block
  function openNav() {
    document.getElementById('mySidenav1').classList.remove('sideNavClose')
    document.getElementById('mySidenav1').classList.add('sideNavOpen')
    document.getElementById('contests_page_id').classList.add('blur_bckgrnd')
    document.getElementById('page_heading_id').classList.add('blur_bckgrnd')
    document.getElementById('contest_nav_id').style.display = 'none'
  }

  //closing filter block
  function closeNav() {
    document.getElementById('mySidenav1').classList.remove('sideNavOpen')
    document.getElementById('mySidenav1').classList.add('sideNavClose')
    document.getElementById('contests_page_id').classList.remove('blur_bckgrnd')
    document.getElementById('page_heading_id').classList.remove('blur_bckgrnd')
    document.getElementById('contest_nav_id').style.display = 'block'
  }

  useEffect(async () => {
    await fetch(`https://api.codedigger.tech/contest/${queryStr}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${creds.access}`,
      },
    })
      .then((data) => data.json())
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
    <>
      {/* <Loading /> */}
    </>
  ) : (
    <>
      <div id="contest_nav_id">
        {/* <Navbar /> */}
      </div>
      <h3 className="page_heading" id="page_heading_id">
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

      <div id="mySidenav1" className="sidenav1">
        <Modal_comm
          difflev={difficultyLevels}
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
          <div className="contests_page" id="contests_page_id">
            <div className="roww">
              <div className="input-group">
                <div>
                  <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onChange={(e) => setSearchText(e.target.value)}
                    onSearch={handleSearch}
                    className='search_box'
                    style={{borderRadius:15}}
                  />
                </div>
              </div>
            </div>
            <Row gutter={[16,16]}>
              {console.log(problems.result)}
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
    </>
  )
}

export default ContestPage