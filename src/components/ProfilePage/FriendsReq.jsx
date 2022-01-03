import React from 'react'
import { Tabs, Card, Input } from 'antd'

const FreindMentorList = () => {
  const { TabPane } = Tabs
  const { Search } = Input
  return (
    <>
      <div className="mainCardFML">
        <div className="title_FML">Friend Req</div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tab 1" key="1">
            <ul>
              <li>Hello</li>
              <li>Hi</li>
              <li>Bye</li>
            </ul>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <ul>
              <li>Bye</li>
              <li>Hi</li>
              <li>Hello</li>
            </ul>
            <Search
              className="mentorSreach"
              placeholder="input search text"
              enterButton
            />
          </TabPane>
        </Tabs>
      </div>
    </>
  )
}

export default FreindMentorList
