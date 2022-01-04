async function PracticeAPI(
  setFirstPage,
  setLastPage,
  page,
  PracticeToggle,
  setPracticeToggle,
  setPreviousPage,
  setNextPage,
  setCurrentPage,
  setData,
  setLoader,
  platform
) {
  const creds = JSON.parse(localStorage.getItem('creds'))
  const acessToken = creds.access
  const response = await platform(acessToken, page, PracticeToggle)
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
    } else if (PracticeToggle == true) {
      localStorage.setItem(
        'err',
        'Please practice or compete to view this page'
      )
      window.location = '/home'
    } else {
      setPracticeToggle(true)
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

export default PracticeAPI
