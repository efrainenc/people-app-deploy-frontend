import React from 'react'
import {Routes, Route} from 'react-router-dom'
import People from '../pages/People'
import Show from '../pages/Show'

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<People/>}/>
        <Route path="/people/:id" element={<Show/>}/>
      </Routes>
    </div>
  )
}

export default Main