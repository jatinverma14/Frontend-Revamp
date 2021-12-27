import React from 'react'
import { Popover, Button } from 'antd'
import Tags from '../../assets/Upsolve/tags-icon2.png'

export default function CommonQues(props) {
  return (
    <>
      <div className="Cardcont">
        <a className="qname" href={props.url} target="_blank">
          <h7 className="Cardcont">
            {props.index}-{props.name}
          </h7>
        </a>
      </div>
      {props.platform != 'atcoder' ? (
        <Popover
          content={
            <div>
              <div className="tagsbox">
                {props.tags.substr(2, props.tags.length - 1)}
              </div>
            </div>
          }
        >
          <img className="TagImage" src={Tags}></img>
        </Popover>
      ) : (
        ' '
      )}

      <h7 className={`${props.className} Cardcont`}>{props.status}</h7>
    </>
  )
}
