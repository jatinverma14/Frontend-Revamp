import React from 'react'
import { Switch } from 'antd';

export default function Toggle(props) {
    return (
        <>
            <div className='Sitename' >
                <divd>
                    <h3 >{props.siteName}</h3>
                    <img style={{ width: props.imgWidth, height: props.imgHeight, background: "white" }} src={props.logo} />
                </divd>

                <div className='Right-Side'>
                    <div >
                        <h6>Include Practice </h6>
                        <div>
                            <Switch  defaultUnChecked onChange={props.ChangePage} />

                        </div>
                    </div>
                    <div >
                        <h6>
                            Only Wrong/Not Attempted
                        </h6>
                        <div>
                            <Switch defaultUnChecked onChange= {()=>{props.setnotAttemptedToggle(!props.notAttemptedToggle);}} />
                        </div>
                    </div>
                    <div>
                        <button className='btnUpdate'
                            title="solved? update"
                            
                            onClick={(e) => {
                                props.setUpdate(props.update + 1)
                            }}
                        >
                            <img className='refreshImg'
                                src={props.refresh}
                            ></img>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
