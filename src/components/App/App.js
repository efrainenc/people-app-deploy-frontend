import './App.css';
import Header from '../Header/Header'
import Main from '../Main'


function App() {
  const [currentUser, setCurrentUser] = useState({})

  const registerUser = async (data) => {
    try {

      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }

      const newUser = await fetch(
        "<http://localhost:4000/auth/register>",
        configs
      )

      const parsedUser = await newUser.json()
      // console.log(parsedUser)

      // sets local storage
      setUserToken(parsedUser.token)
      // put the returned user object in state
      setCurrentUser(parsedUser.currentUser)
      // adds a boolean cast of the responses isLoggedIn prop
      setIsAuthenticated(parsedUser.loggedIn)

      // alternative (safer) implementation would be to use jwt decode library - <https://www.npmjs.com/package/jwt-decode>
      // this would also require reconfiguring our backend so we only send tokens with a signup

      return parsedUser
    } catch (err) {
      console.log(err)
      clearUserToken();
      setIsAuthenticated(false);
    }
  }

  const loginUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
      const response = await fetch(
        "<http://localhost:4000/auth/login>",
        configs
      )
      const user = await response.json()
      //console.log(user)

      // sets local storage
      setUserToken(user.token)
      // put the returned user object in state
      setCurrentUser(user.currentUser)

      return user
    } catch (err) {
      clearUserToken()
      setIsAuthenticated(false)
    }
  }

  return (
    <div className="App">
      <Header user={currentUser}/>
      <Main signup={registerUser} login={loginUser} user={currentUser} />
    </div>
  )
}

export default App;

