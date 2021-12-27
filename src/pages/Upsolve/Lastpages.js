import React from 'react'
import '../../styles/Upsolve/upsolve.css'

export default function lastpages(props) {
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

                props.setnextPage(props.first)
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

                props.setnextPage(props.prev)
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
                  props.setnextPage(number)
                  setTimeout(100)
                  props.setcurrentPage(number)
                }}
                className={`${
                  props.page == number ? `active-page` : 'page-link'
                }`}
              >
                {number}
              </a>
            </li>
          ))}
          {props.page != props.lastPage ? (
            <a
              onClick={() => {
                setTimeout(() => {
                  props.setLoader(true)
                }, 1000)
                props.setnextPage(props.next)
                props.setcurrentPage(props.next)
              }}
              className="page-link"
            >{`>`}</a>
          ) : (
            <></>
          )}
          {props.page != props.lastPage ? (
            <a
              onClick={() => {
                setTimeout(() => {
                  props.setLoader(true)
                }, 1000)
                props.setnextPage(props.lastPage)
                props.setcurrentPage(props.lastPage)
              }}
              className="page-link"
            >
              last
            </a>
          ) : (
            <></>
          )}
        </ul>
      </nav>
    </>
  )
}
