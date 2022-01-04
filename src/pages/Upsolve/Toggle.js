import React from 'react'
import { Switch } from 'antd'

export default function Toggle(props) {
  return (
    <>
      <div className="Sitename">
        <divd>
          <h3>{props.siteName}</h3>
          <img
            style={{
              width: props.imgWidth,
              height: props.imgHeight,
              background: 'white',
            }}
            src={props.logo}
          />
        </divd>

        <div className="Right-Side">
          <div
            className={props.siteName !== 'codechef' ? 'Toggle' : 'noDisplay'}
          >
            <h6>Include Practice </h6>
            <div>
              <Switch
                defaultUnChecked
                onChange={(val) => {
                  props.setPracticeToggle(!props.PracticeToggle)
                  props.setvirtualPracticeToggle(!props.virtualPracticeToggle)
                  props.setnextPage(1)
                }}
              />
            </div>
          </div>
          <div>
            <h6>Only Wrong/Not Attempted</h6>
            <div>
              <Switch
                defaultUnChecked
                onChange={() => {
                  props.setnotAttemptedToggle(!props.notAttemptedToggle)
                }}
              />
            </div>
          </div>
          <div>
            <button
              className="btnUpdate"
              title="solved? update"
              onClick={(e) => {
                props.setUpdate(props.update + 1)
              }}
            >
              <img className="refreshImg" src={props.refresh}></img>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
