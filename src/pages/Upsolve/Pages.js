import React from 'react'

export default function Pages(page , setLoader, setPage) {
    
        {page != 1 ? (
            <a
                style={{ padding: '15px' }}
                onClick={() => {
                    setTimeout(() => {
                        setLoader(true)
                    }, 1000)

                    setPage(first)
                }}
                className="page-link"
            >
                First
            </a>
        ) : (
            <></>
        )}
            {page != 1 ? (
                <a
                    style={{ padding: '15px' }}
                    onClick={() => {
                        setTimeout(() => {
                            setLoader(true)
                        }, 1000)

                        setPage(prev)
                    }}
                    className="page-link"
                >{`<`}</a>
            ) : (
                <></>
            )}
}
