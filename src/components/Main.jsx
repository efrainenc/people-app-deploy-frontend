import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Show from '../pages/Show/Show'
import People from '../pages/People/People'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

const Main = ({signup, login, user}) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<People/>}/>
        <Route path="/people/:id" element={<Show/>}/>
        <Route path="/register/" element={<RegisterForm signup={signup}/>}/>
        <Route path="/login/" element={<LoginForm login={login}/>}/>
      </Routes>
    </div>
  )
}

export default Main