import { useEffect, useState } from 'react';
import './App.css';
import Properties from './components/Properties';
import AddProperties from './components/AddProperties';
import ViewProperties from './components/ViewProperties';

function App() {
  const [property, setProperty] = useState(null)
  const [oldProperty, setOldProperty] = useState(null)
  const [typeFilter, setTypeFilter] = useState(null)
  const [data, setData] = useState(null)
  const [dropDown, setDropDown] = useState(true)
  const [search, setSearch] = useState(true)
  const [viewMore, setViewMore] = useState(true)
  const [singleBtn, setSingleBtn] = useState(false)
  const [singleData, setSingleData] = useState(null)

  //ENV VARIABLES
  const backendUrl = process.env.REACT_APP_BACKEND_URL

  //Fetching Properties

  const fetchData = async () => {
    try {
      const url = `${backendUrl}/properties`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
        },
      })
      if (!response.ok && response.code != 1) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json() // Parse the JSON
      if (data?.data && Array.isArray(data.data)) {
        setProperty(data?.data.slice(0, 9))
        setOldProperty(data?.data)
        setData(data?.data)
        const typeArray = []
        data?.data.map((item) => {
          if (!typeArray.includes(item?.type)) typeArray.push(item?.type)
        })

        setTypeFilter(typeArray)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSearch = (value) => {
    value = value.toLowerCase()
    if (value.trim() == "") {
      setProperty(oldProperty)
      setDropDown(true)
      return
    }

    setDropDown(false)
    const filterData = oldProperty.filter((item) => item.title.toLowerCase().includes(value) || item.location.toLowerCase().includes(value))
    setProperty(filterData)
  }
  const handleFilter = (value) => {
    value = value.toLowerCase()
    if (value.trim() == "") {
      setProperty(oldProperty)
      setSearch(true)
      return
    }
    setSearch(false)
    const filterData = oldProperty.filter((item) => item.type.toLowerCase() == value)
    setProperty(filterData)
  }

  useState(() => {
    if (dropDown && search) {
      setProperty(data)
      setOldProperty(data)
    }
  }, [handleFilter, handleSearch])

  return (
    <>
      <div className="container">
        <div className="mt-3 d-flex justify-content-between">
          <h2 className='text-secondary'>Mini Property Listing Dashboard</h2>
          <button className='btn btn-primary' onClick={() => {
            const propertyForm = document.getElementById("propertyForm");
            if (propertyForm) {
              propertyForm.style.display = "block";

              // Scroll to the element smoothly
              propertyForm.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
              });
            }
          }}>Add Property</button>
        </div>
        <div className="row mt-3">
          <div className="d-flex justify-content-between">
            <div>
              <input id="search" onChange={(e) => { handleSearch(e.target.value) }} type="text" className='form-control' placeholder='search by Name And Location...' />
            </div>
            <div className="d-flex property">
              <select className="form-control" onChange={(e) => { handleFilter(e.target.value) }} name='type'>
                <option value="">---Filter by Type---</option>
                {typeFilter && typeFilter.length > 0 && typeFilter.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div className="row my-3">
          {property && property.length > 0 ? <Properties property={property} setSingleBtn={setSingleBtn} setSingleData={setSingleData} /> : <>Loading...</>}
        </div>
        {viewMore &&
          <div className="row my-3">
            <div className="col-4 mx-auto text-center">
              <button onClick={() => { setProperty(oldProperty); setViewMore(false) }} className='btn btn-outline-primary px-4 py-2'>View All</button>
            </div>
          </div>
        }

        <div className="container-fluid p-4 mt-4 rounded">
          <div className="row g-4">
            <div id="propertyForm" className="col-12 col-md-6">
              <div className="p-4 bg-white rounded shadow-sm h-100">
                <AddProperties typeFilter={typeFilter} />
              </div>
            </div>
            {singleBtn &&
              <div className="col-12 col-md-6" id="ViewMoreData">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <ViewProperties data={singleData} />

                </div>
              </div>
            }
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
