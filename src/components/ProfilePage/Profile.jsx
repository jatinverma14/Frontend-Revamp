import React from 'react'
import { Card } from 'antd'

const Profile = () => {
  const { Meta } = Card
  return (
    <>
      <Card
        className="profileCard"
        hoverable
        cover={
          <img
            alt="example"
            src="https://cdn2.vectorstock.com/i/1000x1000/47/61/web-developer-design-vector-6584761.jpg"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
    </>
  )
}

export default Profile
