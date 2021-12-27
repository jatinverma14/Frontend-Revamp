import React, { useState, useEffect } from 'react'
import { codechef } from './upsolve.actions'
import { atcoder } from './upsolve.actions'
import { codeforces } from './upsolve.actions'
import Validate from '../pages/Upsolve/Validate'

// export async function APIData(
 async function SimpleAPIData(
  setFirstPage,
  setLastPage,
  page,
  setPreviousPage,
  setNextPage,
  setCurrentPage,
  setData,
  setLoader,platform
) {
  const creds = JSON.parse(localStorage.getItem('creds'))
  const acessToken = creds.access
  const response = await platform(acessToken, page);

  if (response.status === 200) {
    const data = await response.json()

    if (data.status === 'OK') {
      if (data.result.length > 0) {
        const newLinks = data.links
        await setFirstPage(newLinks.first.split('=')[1])

        await setLastPage(newLinks.last.split('=')[1])

        if (newLinks.prev !== null) {
          setPreviousPage(newLinks.prev.split('=')[1])
        }
        if (newLinks.next !== null) {
          setNextPage(newLinks.next.split('=')[1])
        }
        await setLastPage(data.meta.last_page)
        await setCurrentPage(data.meta.current_page)
      } else {
        localStorage.setItem(
          'err',
          'Codechef upsolve is available when you participate in atleast one contest'
        )
        window.location = '/home'
      }
    } else {
      localStorage.setItem('err', 'No contest found for this handle')
      window.location = '/home'
    }

    const result = await data.result
    await setData(result)
    setLoader(false)
  } else if (response.status == 500) {
    localStorage.setItem('err', 'No contest found for this handle')
    window.location = '/home'
  } else {
    const data = await response.json()
    localStorage.setItem('err', data.error)
    window.location = '/home'
  }
}

// export async function AtcoderAPI(
 async function PracticeAPI(
  setFirstPage,
  setLastPage,
  page,
  Prac,
  setPreviousPage,
  setNextPage,
  setCurrentPage,
  setData,
  setLoader,platform
) {
  const creds = JSON.parse(localStorage.getItem('creds'))
  const acessToken = creds.access
  const response = await atcoder(acessToken, page, Prac)
  if (response.status === 200) {
    const data = await response.json()
    if (data.status === 'OK' && data.result.length > 0) {
      const newLinks = data.links
      setFirstPage(newLinks.first.split('=')[1])
      setLastPage(newLinks.last.split('=')[1])
      if (newLinks.prev !== null) {
        setPreviousPage(newLinks.prev.split('=')[1])
      }
      if (newLinks.next !== null) {
        setNextPage(newLinks.next.split('=')[1])
      }
      setLastPage(data.meta.last_page)
      setCurrentPage(data.meta.current_page)
      const result = await data.result
      await setData(result)
    } else if (Prac == true) {
      localStorage.setItem(
        'err',
        'Please practice or compete to view this page'
      )
      window.location = '/home'
    } else {
      setPrac(true)
    }

    setLoader(false)
  } else {
    const data = await response.json()

    if (
      data.error ===
      "You haven't Entered your Atcoder Handle in your Profile.. Update Now!"
    ) {
      localStorage.setItem('err', data.error)
      window.location = '/home'
    }
  }
}

// export async function virtualAPI(
 async function virtualAPI(
  setFirstPage,
  setLastPage,
  page,
  vir,
  setVir,
  setPreviousPage,
  setNextPage,
  setCurrentPage,
  setData,
  setLoader,platform
) {
  const creds = JSON.parse(localStorage.getItem('creds'))
  const acessToken = creds.access

  const response = await codeforces(acessToken, vir, page)
  if (response.status == 200) {
    const data = await response.json()

    if (data.status === 'OK') {
      if (data.result.length > 0) {
        const newLinks = data.links
        setFirstPage(newLinks.first.split('=')[1])
        setLastPage(newLinks.last.split('=')[1])
        if (newLinks.prev !== null) {
          setPreviousPage(newLinks.prev.split('=')[1])
        }
        if (newLinks.next !== null) {
          setNextPage(newLinks.next.split('=')[1])
        }
        await setLastPage(data.meta.last_page)
        setCurrentPage(data.meta.current_page)
      } else if (vir == false) {
        setVir(true)
      } else {
        localStorage.setItem(
          'err',
          'Codeforces upsolve is available when you participate in atleast one contest(official/virtual)'
        )
        window.location = '/home'
      }
    }

    const result = await data.result
    await setData(result)
    setLoader(false)
  } else {
    setLoader(false)
    localStorage.setItem('err', data.error)
    window.location = '/home'
  }
}

function APIData(datarequired,setFirstPage,
  setLastPage,
  page,
  setPreviousPage,
  setNextPage,
  setCurrentPage,
  setData,
  setLoader,platform, Prac,vir,
  setVir)

{
  
  if(datarequired === "simpleData")
  {
  
    SimpleAPIData(setFirstPage,
      setLastPage,
      page,
      setPreviousPage,
      setNextPage,
      setCurrentPage,
      setData,
      setLoader,platform);
  }
  else if(datarequired === "PracticeData")
  {
    PracticeAPI(setFirstPage,
      setLastPage,
      page,
      Prac,
      setPreviousPage,
      setNextPage,
      setCurrentPage,
      setData,
      setLoader,platform)
  }
  else if(datarequired === "virtualData")
  {
    virtualAPI(setFirstPage,
      setLastPage,
      page,
      vir,
      setVir,
      setPreviousPage,
      setNextPage,
      setCurrentPage,
      setData,
      setLoader,platform)
  }
  
}


export default APIData