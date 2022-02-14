import React from 'react'
import { Space, Row, Col } from 'antd'
import PlaylistCard from '../../components/Playlist/PlaylistCard'
import Typography from '../../components/Playlist/Typography'
import { cards as data, pages } from '../../components/Ladders-Practice/data'
import img from '../../assets/topicwise/trello.png'

const globalStyles = {
  color: '#fff',
  margin: '5vh 20vw',
}

function Playlists({ id }) {
  // console.log(id)
  return (
    <>
      <Space style={globalStyles} direction="vertical">
        <Row>
          <Typography
            img={img}
            heading={pages[2].heading}
            subheading={pages[2].subheading}
          />
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {data.map((item, index) => {
            return (
              <Col xs={24} md={12} lg={8} key={index}>
                <PlaylistCard
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

export default Playlists
