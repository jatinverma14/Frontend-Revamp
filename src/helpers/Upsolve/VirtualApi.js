async function virtualAPI(
  setFirstPage,
  setLastPage,
  page,
  virtualDataToggle,
  setvirtualDataToggle,
  setPreviousPage,
  setNextPage,
  setCurrentPage,
  setData,
  setLoader,
  platform
) {
  const creds = JSON.parse(localStorage.getItem('creds'))
  const acessToken = creds.access

  const response = await platform(acessToken, virtualDataToggle, page)
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
      } else if (virtualDataToggle == false) {
        setvirtualDataToggle(true)
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

export default virtualAPI
