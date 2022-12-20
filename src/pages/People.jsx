import React from 'react'
import {useState, useEffect} from 'react'

const People = () => {

  const [people, setPeople] = useState([])


  const BASE_URL = "http://localhost:4000/people";

  const getPeople = async () => {
    try {
        const response = await fetch(BASE_URL)
        const allPeople = await response.json()
        setPeople(allPeople)
    }catch(err){
        console.log(err)
    }
  } 

  useEffect(()=>{getPeople()}, [])

  return (
    <div>
      
      <h1>
      People
      </h1>

    </div>
  )
}

export default People