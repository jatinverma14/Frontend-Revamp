import React from 'react'
import { Card, Input } from 'antd'

const MyMentor = (props) => {
  const { Search } = Input
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card title="Card title" bordered={false} className="cardStyle">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
          {props.mentor == 1 ? (
            <Search
              className="mentorSreach"
              placeholder="input search text"
              enterButton
            />
          ) : (
            <></>
          )}
        </Card>
      </div>
    </>
  )
}

export default MyMentor
