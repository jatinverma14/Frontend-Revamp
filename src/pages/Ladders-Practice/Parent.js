import React from 'react'
import { Space, Row, Col } from 'antd'
import ParentCard from '../../components/Ladders-Practice/ParentCard'
import Typography from '../../components/Ladders-Practice/Typography'
import { cards as data, pages } from '../../components/Ladders-Practice/data'

const globalStyles = {
  color: '#fff',
  margin: '0 20vw',
}

function Parent(props) {
  const { type, wise } = props
  console.log(type, wise)
  return (
    <>
      <Space style={globalStyles} direction="vertical">
        <Row>
          <Typography
            heading={pages[0].heading}
            subheading={pages[0].subheading}
          />
        </Row>
        <Row>
          {data.map((item, index) => {
            return (
              <Col span={8} key={index}>
                <ParentCard
                  title={item.title}
                  description={item.des}
                  numberOfPeople={item.numberOfPeople}
                  completed={item.questionsDone}
                  total={item.questionsTotal}
                />
              </Col>
            )
          })}
        </Row>
      </Space>
    </>
  )
}

export default Parent
