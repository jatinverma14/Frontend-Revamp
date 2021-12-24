import React, { useState, useEffect } from 'react'
import { codechef } from './upsolve.actions'
import { atcoder } from './upsolve.actions'
import { codeforces } from './upsolve.actions'
import Validate from '../pages/Upsolve/Validate'

export async function CodechefAPI(setFirst, setLast,
    page,
    setPrev,
    setNext, setCurPage, setData, setLoader) {

    const creds = JSON.parse(localStorage.getItem('creds'))
    const acc = creds.access
    const response = await codechef(acc, page)
    if (response.status === 200) {
        const data = await response.json()

        if (data.status === 'OK') {

            if (data.result.length > 0) {

                const newLinks = data.links
                await setFirst(newLinks.first.split('=')[1])


                await setLast(newLinks.last.split('=')[1])

                if (newLinks.prev !== null) {
                    setPrev(newLinks.prev.split('=')[1])
                }
                if (newLinks.next !== null) {
                    setNext(newLinks.next.split('=')[1])
                }
                await setLast(data.meta.last_page)
                await setCurPage(data.meta.current_page)
            }
            else {
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

export async function AtcoderAPI(setFirst, setLast,
    page, Prac,
    setPrev,
    setNext, setCurPage, setData, setLoader) {
    const creds = JSON.parse(localStorage.getItem('creds'))
    const acc = creds.access
    const response = await atcoder(acc, page, Prac)
    if (response.status === 200) {
        const data = await response.json()
        if (data.status === 'OK' && data.result.length > 0) {

            const newLinks = data.links
            setFirst(newLinks.first.split('=')[1])
            setLast(newLinks.last.split('=')[1])
            if (newLinks.prev !== null) {
                setPrev(newLinks.prev.split('=')[1])
            }
            if (newLinks.next !== null) {
                setNext(newLinks.next.split('=')[1])
            }
            setLast(data.meta.last_page)
            setCurPage(data.meta.current_page)
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

export async function CodeforcesAPI(setFirst, setLast,
    page, vir,setVir,
    setPrev,
    setNext, setCurPage, setData ,setLoader) {
    const creds = JSON.parse(localStorage.getItem('creds'))
    const acc = creds.access

    const response = await codeforces(acc, vir, page)
    if (response.status == 200) {
        const data = await response.json()

        if (data.status === 'OK') {
            if (data.result.length > 0) {
                const newLinks = data.links
                setFirst(newLinks.first.split('=')[1])
                setLast(newLinks.last.split('=')[1])
                if (newLinks.prev !== null) {
                    setPrev(newLinks.prev.split('=')[1])
                }
                if (newLinks.next !== null) {
                    setNext(newLinks.next.split('=')[1])
                }
                await setLast(data.meta.last_page)
                setCurPage(data.meta.current_page)
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



