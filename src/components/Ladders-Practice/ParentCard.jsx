import React from 'react'
import { baseTypographyStyles } from './Typography'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import done from '../../assets/topicwise/correct.png'
import pause from '../../assets/topicwise/pause.png'
import people from '../../assets/topicwise/people.png'

const cardStyles = {
  height: '29vh',
  width: '15vw',
  padding: '1.5rem',
  margin: '2rem 5rem',
  boxShadow:
    '0px 0px 1px rgba(0, 0, 0, 0.2), 0px 20px 128px rgba(0, 0, 0, 0.3), 0px 0px 50px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#191C1F',
  borderRadius: '5px',
}

const headingStyles = {
  ...baseTypographyStyles,
  fontSize: '1.2rem',
  margin: '0',
}

const subheadingStyles = {
  ...baseTypographyStyles,
  fontSize: '0.8rem',
}

export default function ParentCard({
  title,
  description,
  numberOfPeople,
  completed,
  total,
}) {
  const [percentage, setPercentage] = React.useState((completed / total) * 100)
  return (
    <div style={cardStyles}>
      <div>
        <h2 style={headingStyles}>{title}</h2>
        <h5 style={subheadingStyles}>{description}</h5>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '2rem',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ paddingTop: '1.3rem' }}>
          <div style={{ padding: '0.2rem 0' }}>
            <span style={{ padding: '0 0.5rem 1rem 0' }}>
              <img src={people} alt="" height={20} width={20} />
            </span>
            <span>{numberOfPeople}</span>
          </div>
          <div style={{ padding: '0.2rem 0' }}>
            <span style={{ padding: '0 0.5rem 1rem 0' }}>
              <img src={done} alt="" height={20} width={20} />
            </span>
            <span>{completed}</span>
          </div>
          <div style={{ padding: '0.2rem 0' }}>
            <span style={{ padding: '0 0.5rem 1rem 0' }}>
              <img src={pause} alt="" height={20} width={20} />
            </span>
            <span>{total}</span>
          </div>
        </div>
        <div style={{ height: '110px', width: '110px' }}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            // background
            styles={buildStyles({
              strokeLinecap: 'butt',
              textColor: '#00B88A',
              // background:{
              //     fill:'#191C1F',
              // },
              trailColor: '#191C1F',
              pathColor: `rgba(0,184,138, 1)`,
            })}
          />
        </div>
      </div>
    </div>
  )
}
