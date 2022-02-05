import React from 'react'
import { Space, Row, Col } from 'antd'
import ParentCard from '../../components/Ladders-Practice/ParentCard'
import Typography from '../../components/Ladders-Practice/Typography'
import { cards as data, pages } from '../../components/Ladders-Practice/data'
import img from '../../assets/topicwise/trello.png'

const globalStyles = {
  color: '#fff',
  margin: '3vh 20vw',
}

function Parent(props) {
  const { type, wise } = props
  console.log(type, wise)
  return (
    <>
      <Space style={globalStyles} direction="vertical">
        <Row>
          <Typography
            img={img}
            heading={pages[0].heading}
            subheading={pages[0].subheading}
          />
        </Row>
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 30]}>
          {data.map((item, index) => {
            return (
              <Col xs={24} md={12} lg={8} key={index}>
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
