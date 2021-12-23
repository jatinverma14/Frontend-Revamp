import React from 'react'

export default function CommonCard(props) {
    return (
        <div>
            <div style={{ color: "white"}} className="contestName">
                              <h6 
                              style=
                              { {background: "none",
                               color: "black",
                               fontSize: "0.9rem"
                               
                               }}
                                >{props.name}</h6>

                            </div>
        </div>
    )
}
