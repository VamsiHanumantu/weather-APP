import React from 'react'

const Search = ({search,setSearch,handleSearch}) => {
  return (
    <div className='flex items-center justify-around w-full p-4 '>
        <input className=' w-[70%] rounded-md p-1 border-black border-2' type="text" name="search" value={search} placeholder='enter city...' onChange={(e)=>setSearch(e.target.value)}/>
        <button className=' bg-black text-white p-2 rounded-lg' onClick={handleSearch}>Search</button>
    </div>
  )
}

export default Search