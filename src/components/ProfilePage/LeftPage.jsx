import React from 'react'
import FreindMentorList from './FriendsReq'
import MyMentors_MyList from './MyMentors_MyList'

const LeftPage = () => {
  return (
    <>
      <div className="mentor_friend">
        <FreindMentorList />
        <div className="mymentors">
          <MyMentors_MyList mentor={1} />
        </div>
        <div className="todoList">
          <MyMentors_MyList mentor={0} />
        </div>
      </div>
    </>
  )
}

export default LeftPage
