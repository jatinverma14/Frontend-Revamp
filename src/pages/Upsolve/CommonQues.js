import React from 'react'
import { Popover, Button } from 'antd';
import Tags from '../../assets/Upsolve/tags-icon2.png'

export default function CommonQues(props) {
    return (
        <>
            <a href={props.url} target="_blank">

                <h7 style={{ background: "none", color: "white" }}>
                    {props.index}-{props.name}
                </h7>
            </a>
            <br></br>

            {(props.platform != "atcoder" ) ?(<Popover style={{ color: " white" }} content={<div>
                <div className="tagsbox">

                    {
                        props.tags.substr(
                            2,
                            props.tags.length - 1
                        )}
                </div>
            </div>
            } >
                <img
                className='TagImage'
                    src={Tags}
                ></img>
            </Popover>
            ) : (" ")}

            <h7 style={{ background: "none" }} className={props.className}>{props.status}</h7>
        </>
    )
}
