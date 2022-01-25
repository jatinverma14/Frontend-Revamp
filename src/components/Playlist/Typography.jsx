import React from 'react'

const basePositionStyles = {
  display: 'flex',
  margin: '1rem 5rem',
}

export const baseTypographyStyles = {
  fontFamily: 'Inter, sans-serif',
  color: '#fff',
}

const headingStyles = {
  ...baseTypographyStyles,
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '0',
  lineHeight: '3rem',
  paddingTop: '1rem',
}

const subHeadingStyles = {
  ...baseTypographyStyles,
  fontSize: '0.7rem',
  fontWeight: 'bold',
  width: '100%',
}

function Typography({ img, heading, subheading }) {
  return (
    <div style={basePositionStyles}>
      <div>
        <img src={img} alt="" height={120} width={120} />
      </div>
      <div style={{ margin: '0 0 0 1rem' }}>
        <h1 style={headingStyles}>
          {heading}
          <span style={{ color: '35AE9A' }}>.</span>
        </h1>
        <p style={subHeadingStyles}>{subheading}</p>
      </div>
    </div>
  )
}

export default Typography
