import SimpleAPIData from "./SimpleApi";
import PracticeAPI from "./PracticeApi";
import virtualAPI from "./VirtualApi";

function APIData(datarequired,setFirstPage,
  setLastPage,
  page,
  setPreviousPage,
  setNextPage,
  setCurrentPage,
  setData,
  setLoader,platform, PracticeToggle,setPracticeToggle,virtualDataToggle,
  setvirtualDataToggle)

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
      PracticeToggle,setPracticeToggle,
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
      virtualDataToggle,
      setvirtualDataToggle,
      setPreviousPage,
      setNextPage,
      setCurrentPage,
      setData,
      setLoader,platform)
  }
  
}

export default APIData