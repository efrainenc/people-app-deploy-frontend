import React from 'react'
import { useState, useEffect } from "react"
import { Navigate, useParams, useNavigate } from "react-router-dom"
import { getUserToken } from '../../utils/authToken'



const Show= (props)=>
{
  //set state for person details
  const [person, setPerson]= useState(null);
  const [editForm, setEditForm] = useState(person);
  // take in the ID parameter from router
  const {id} = useParams();
  const navigate = useNavigate();
  // person details URL for fetch
  const URL = `http://localhost:4000/people/${id}`;

  const handleChange= (e)=>
  {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  // function to fetch person details for useEffect
  const getPerson= async()=>
  {
    try
    {
      const response = await fetch(URL);// fetch
      const foundPerson = await response.json();
      
      setPerson(foundPerson); // set state to person detail result
      setEditForm(foundPerson);
    }catch(err)
    {
      console.log(err);
    }
  }
  
  //Update Person
  const updatePerson= async(e)=>
  {
    e.preventDefault()
    // make put request to update a person
    try
    {
      const options= // configure put request
      {
        method: "PUT",
        headers: {
          'Authorization': `bearer ${getUserToken()}`,
          "Content-Type": "application/json"},
        body: JSON.stringify(editForm),
      }
      const response= await fetch(URL, options);
      const updatedPerson= await response.json();

      setPerson(updatedPerson);
      setEditForm(updatedPerson);
    }catch(err)
    {
      console.log(err)
      navigate(URL)
    }
  }

  const removePerson= async(e)=>
  {
    try
    {
      const options= // configure delete request
      {
        method: "DELETE",
        headers: {
          'Authorization': `bearer ${getUserToken()}`},
      }
      const response= await fetch(URL, options);
      const deletedPerson= await response.json();
      // console.log(deletedPerson);
      navigate("/");
    }catch(err)
    {
      console.log(err)
      navigate(URL)
    }
  }

  useEffect(()=>{getPerson()}, []) // fetch person detail on MOUNT()

  // Person Details Loaded
  const loaded= ()=>
  {
    return(
      <>
      <section>
        <div className="person">
          <h1>Show Page</h1>
          <h2>{person.name}</h2>
          <h2>{person.title}</h2>
          <div>
            <button className="delete" onClick={removePerson}>
              Remove Person
            </button>
          </div>
        </div>
      </section>
      <section>
        <h2>Edit this Person</h2>
        <form onSubmit={updatePerson}>
          <input
              type="text"
              value={editForm.name}
              name="name"
              placeholder="name"
              onChange={handleChange}
          />
          <input
              type="text"
              value={editForm.title}
              name="title"
              placeholder="title"
              onChange={handleChange}
          />
          <input type="submit" value="Update Person" />
        </form> 
      </section>
      </>
    )
  }

  // Loading
  const loading= ()=>
  {
    return(
      <section className="loading">
        <h1>
          Loading...
          <span>
            <img
              className="spinner"
              src="https://freesvg.org/img/1544764567.png"
            />{" "}
          </span>
        </h1>
      </section>
    )
  }

  return person ? loaded() : loading()
}

export default Show