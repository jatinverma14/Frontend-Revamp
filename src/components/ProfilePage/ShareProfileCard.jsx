import React from 'react'
import { Layout, Button } from 'antd'
import { ShareAltOutlined } from '@ant-design/icons'
import '../../styles/Profile/shareProfile.css'
import AtCoder from '../../assets/SitesImages/Atcoder/atcoder.png'
import CodeChef from '../../assets/SitesImages/Codechef/Codechef-logo.jpg'
import CodeForces from '../../assets/SitesImages/Codeforces/cf-logo.png'
import Spoj from '../../assets/SitesImages/Spoj/spojShort.png'
import Uva from '../../assets/SitesImages/Uva/uva_online_judge.png'

const ShareProfile = (props) => {
  const { Header, Footer } = Layout

  return (
    <>
      <Layout className="main-layout">
        <Header className={`layout-header ${props.reqHeadClass}`}>
          {props.reqHeadClass === 'shareProHead' ? (
            <Button
              className="layout-header-button"
              type="primary"
              shape="round"
              icon={<ShareAltOutlined />}
            >
              {' '}
              SHARE PROFILE{' '}
            </Button>
          ) : (
            <>
              <span>CodeForces</span>
              <span>CodeChef</span>
              <span>AtCoder</span>
              <span>Spoj</span>
              <span>Uva</span>
            </>
          )}
        </Header>
        <Footer className={`layout-header ${props.reqFootClass}`}>
          {props.reqFootClass === 'shareProFoot' ? (
            <>
              <a href="##">
                {' '}
                <img src={Uva} alt="AtCoder Logo" />{' '}
              </a>
              <a href="##">
                {' '}
                <img src={Spoj} alt="Spoj Logo" />{' '}
              </a>
              <a href="##">
                {' '}
                <img
                  style={{ backgroundColor: 'white' }}
                  src={AtCoder}
                  alt="AtCoder Logo"
                />{' '}
              </a>
              <a href="##">
                {' '}
                <img src={CodeChef} alt="CodeChef Logo" />{' '}
              </a>
              <a href="##">
                {' '}
                <img src={CodeForces} alt="CodeForces Logo" />{' '}
              </a>
            </>
          ) : (
            <>
              <div>PROBLEM SOLVED</div>
              <div>WORLD RANK</div>
            </>
          )}
        </Footer>
      </Layout>
    </>
  )
}

export default ShareProfile
