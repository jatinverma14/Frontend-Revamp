import React from 'react'
import { Row, Col } from 'antd'
import Carousel from 'react-multi-carousel'
import CommonCard from './CommonContestCard'
import CommonQues from './CommonQues'
import RESPONSIVE from '../../utils/Upsolveresponsive'
import 'react-multi-carousel/lib/styles.css'

export default function Carousel_Upsolve(props) {
  return (
    <>
      <Row gutter={[16, 10]} className="contestRow">
        <Col span={5}>
          <CommonCard name={props.name} />
        </Col>
        <Col span={19}>
          <Carousel
            customTransition="all .5"
            transitionDuration={500}
            responsive={RESPONSIVE}
          >
            {props.problems.map((prob) => {
              if (prob.status === 'solved') {
                if (props.notAttemptedToggle == false) {
                  return (
                    <Col span={19}>
                      <div className="solved">
                        <CommonQues
                          sitename={props.sitename}
                          url={prob.url}
                          index={prob.index}
                          name={prob.name}
                          className="green"
                          tags={prob.tags}
                          status="SOLVED"
                        />
                      </div>
                    </Col>
                  )
                }
              } else if (prob.status === 'wrong') {
                return (
                  <Col span={19}>
                    {' '}
                    <div className="wrong">
                      <CommonQues
                        sitename={props.sitename}
                        url={prob.url}
                        index={prob.index}
                        name={prob.name}
                        className="red"
                        tags={prob.tags}
                        status="WRONG"
                      />
                    </div>
                  </Col>
                )
              } else if (prob.status === 'upsolved') {
                if (props.notAttemptedToggle == false) {
                  return (
                    <Col span={19}>
                      <div className="upsolved">
                        <CommonQues
                          sitename={props.sitename}
                          url={prob.url}
                          index={prob.index}
                          name={prob.name}
                          className="blue"
                          tags={prob.tags}
                          status="UNSOLVED"
                        />
                      </div>
                    </Col>
                  )
                }
              } else if (prob.status == 'not_attempt') {
                return (
                  <Col span={19}>
                    {' '}
                    <div className="not_attempted">
                      <CommonQues
                        sitename={props.sitename}
                        url={prob.url}
                        index={prob.index}
                        name={prob.name}
                        className="viol"
                        tags={prob.tags}
                        status="NOT ATTEMPTED"
                      />
                    </div>
                  </Col>
                )
              }
            })}
          </Carousel>
        </Col>
      </Row>
    </>
  )
}
