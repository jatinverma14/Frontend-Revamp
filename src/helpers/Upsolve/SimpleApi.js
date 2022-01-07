async function SimpleAPIData(
  setFirstPage,
  setLastPage,
  page,
  setPreviousPage,
  setNextPage,
  setCurrentPage,
  setData,
  setLoader,
  platform
) {
  const creds = JSON.parse(localStorage.getItem('creds'))
  const acessToken = creds.access
  const response = await platform(acessToken, page)

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
      // window.location = '/home'
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
    // window.location = '/home'
  }
}

export default SimpleAPIData
