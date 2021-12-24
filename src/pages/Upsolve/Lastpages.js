import React from 'react'
import '../../styles/Upsolve/upsolve.css'
export default function Lastpages(props) {
    return (
        <>
            <nav className="paginator">
                <ul className="pagination">

                    {props.page != 1 ? (
                        <a
                            onClick={() => {
                                setTimeout(() => {
                                    props.setLoader(true)
                                }, 1000)

                                props.setPage(first)
                            }}
                            className="page-link"
                        >
                            First
                        </a>
                    ) : (
                        <></>
                    )}
                    {props.page != 1 ? (
                        <a
                            onClick={() => {
                                setTimeout(() => {
                                    props.setLoader(true)
                                }, 1000)

                                props.setPage(prev)
                            }}
                            className="page-link"
                        >{`<`}</a>
                    ) : (
                        <></>
                    )}

                    {props.pageNumbers.map((number) => (
                        <li key={number} className="page-item">
                            <a
                                style={{ padding: '15px' }}
                                onClick={() => {
                                    setTimeout(() => {
                                        props.setLoader(true)
                                    }, 1000)
                                    props.setPage(number)
                                    setTimeout(100)
                                    props.setCurPage(number)
                                }}
                                className={`${props.page == number ? `active-page` : 'page-link'
                                    }`}
                            >
                                {number}
                            </a>
                        </li>
                    ))}
                    {props.page != props.last ? (
                        <a
                            onClick={() => {
                                setTimeout(() => {
                                    props.setLoader(true)
                                }, 1000)
                                props.setPage(next)
                                props.setCurPage(next)
                            }}
                            className="page-link"
                        >{`>`}</a>
                    ) : (
                        <></>
                    )}
                    {props.page != props.last ? (
                        <a
                            onClick={() => {
                                setTimeout(() => {
                                    props.setLoader(true)
                                }, 1000)
                                props.setPage(props.last)
                                props.setCurPage(props.last)
                            }}
                            className="page-link"
                        >
                            Last
                        </a>
                    ) : (
                        <></>
                    )}
                </ul>
            </nav>
        </>
    )
}
