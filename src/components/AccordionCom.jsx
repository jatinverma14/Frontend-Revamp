import React from 'react'
import 'antd/dist/antd.css'
import { Card } from 'antd'
import '../styles/Accordion/accordion.css'

export default function SimpleAccordion({ problem }) {
  return (
    <>
      <Card className="mainCard">
        <Card
          className="problemName"
          type="inner"
          title={problem.name}
          extra={
            <a
              className="solveLink"
              target="blank"
              href={`https://codeforces.com/contest/${problem.contestId}`}
            >
              Solve
            </a>
          }
        >
          <strong>Duration</strong> : {problem.duration / 60 / 60} hours
        </Card>
      </Card>
    </>
  )
}
