import React from 'react'
import { Switch } from 'antd';

export default function Toggle(props, setUpdate) {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                    <h3 textAlign="center">{props.siteName}</h3>
                    <img style={{ width: props.imgWidth, height: props.imgHeight, background: "white" }} src={props.logo} />
                </div>

                <div style={{ display: 'flex', float: 'right' }}>
                    <div style={{ float: 'right', borderRadius: '5px' }}>
                        <h6
                            style={{
                                fontSize: "0.8rem", paddingRight: "1rem",
                                padding: '3px',
                                color: 'white',
                                marginTop: '2px',
                            }}
                        >
                            Include Practice
                        </h6>
                        <div style={{ display: 'block', marginLeft: '25px' }}>
                            <Switch style={{ backgroundcolor: "white" }} defaultUnChecked onChange={props.ChangePage} />

                        </div>
                    </div>
                    <div style={{ float: 'right', borderRadius: '5px' }}>
                        <h6
                            style={{

                                padding: '3px',
                                fontSize: "0.8rem",
                                color: 'white',
                                marginTop: '2px',
                            }}
                        >
                            Only Wrong/Not Attempted
                        </h6>
                        <div style={{ display: 'block', marginLeft: '45px' }}>
                            <Switch defaultUnChecked onChange= {()=>{props.setWN(!props.wn);}} />
                        </div>
                    </div>
                    <div>
                        <button
                            title="solved? update"
                            style={{ float: 'right', borderRadius: '35px' }}
                            onClick={(e) => {
                                props.setUpdate(update + 1)
                            }}
                        >
                            <img
                                style={{ width: '50px', height: '52px' }}
                                src={props.refresh}
                            ></img>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
