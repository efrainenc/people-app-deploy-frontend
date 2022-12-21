import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './people.css'


const People = (props) => {
  
const [people, setPeople] = useState([])
const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    title: "",
})
const BASE_URL = "http://localhost:4000/people"
const getPeople = async () => {
    try {
        const response = await fetch(BASE_URL)
        const allPeople = await response.json()
        setPeople(allPeople)
    } catch (error) {
        console.log(error)
    }
}
const handleChange = (e) => {
    const userInput = { ...newForm }
    userInput[e.target.name] = e.target.value
    setNewForm(userInput)
}
const handleSubmit = async (e) => {
    e.preventDefault()
    const currentState = { ...newForm }
    try {
        const requestedOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentState)
        }
        const response = await fetch(BASE_URL,)
        const createdPerson = await response.json()
        console.log(response)
        setPeople([...people, createdPerson ])
        setNewForm({
            name: "",
            image: "",
            type: "",
        })
    } catch (error) {
        console.error(error)
    }
}
const loaded = () => {
    return (<>
        <section className="people-list">
            {people?.map((person) => {
                return (
                    <Link key={person._id} to={`/people/${person._id}`}>
                    <div>
                        {/* React optimization / difference */}
                        <h1>{person.name}</h1>
                        <h3>{person.title}</h3>
                    </div>
                    </Link>
                )
            })
            }
        </section>
    </>
    )
}
const loading = () => (
    <section className="people-list">
        <h1>
            Loading...
            <span>
                {" "}
                <img
                    className="spinner"
                    src="https://freesvg.org/img/1544764567.png"
                />
            </span>
        </h1>
    </section>
);
useEffect(() => {
    getPeople()
}, [])
return (
    <div>
        <section>
            <h2>Create a new person</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>
                        Name
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="enter a person's name"
                            value={newForm.name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='image'>
                        Image
                        <input
                            type="text"
                            id="image"
                            name="image"
                            placeholder="enter a person's image"
                            value={newForm.image}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='title'>
                        Title
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="enter a person's title"
                            value={newForm.title}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <input type="submit" value="Create a new person" />
                </div>
            </form>
        </section>
        {people && people.length ? loaded() : loading()}
    </div >
)
}

export default People