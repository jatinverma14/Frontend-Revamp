import React from 'react'
import { Carousel } from 'antd'
import MyMentor from './MyMentors_MyList'

const BestThree = () => {
  function onChange(a, b, c) {
    console.log(a, b, c)
  }

  return (
    <>
      <Carousel afterChange={onChange}>
        <div>
          {' '}
          <h3 className="contentStyle">
            <MyMentor />
          </h3>{' '}
        </div>
        <div>
          {' '}
          <h3 className="contentStyle">
            <MyMentor />
          </h3>{' '}
        </div>
        <div>
          {' '}
          <h3 className="contentStyle">
            <MyMentor />
          </h3>{' '}
        </div>
      </Carousel>
    </>
  )
}

export default BestThree
