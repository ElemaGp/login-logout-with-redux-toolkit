import style from "./home.module.scss"
import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login } from "../../components/reduxToolkit/features/userSlice"

// import { Link } from "react-router-dom"


const Home = () => {

  const user = useSelector(state => state.user) // "const user" is declared to be equal to the "user" in userSlice.jsx. Meaning it now contains the initial state object properties that the "user" has in useSlice.jsx, and the properties' values will be updates accordingly when the actions are dispatched. Btw, "const user = useSelector(state => state.user)" gives us the state of the entire "user" object in the user slice. If for instance, i just wanted to get the state of the the loading, then i would have done "const user = useSelector(state => state.user.loading)". "user" is what i named my userSlice in userSlice.jsx so it is the name of the user object. Any of the properties (in the "initial state" section) can now be accessed through it eg "state.user.loading", "state.user.websiteuser", "state.user.error".
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(login()) //dispatching the "login" action-creator function in userSlice, which will then dispach the action "user/login" in userSlice.jsx.
  }, [])

  return (
    <div>
      <h2>User Details</h2>
      {user.loading && <div>Loading...</div>}
      {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
      {!user.loading && !user.error ? (
        <>
        <p>{user.websiteuser.username}</p>
        <p>{user.websiteuser.email}</p>
        </>
      ) : null}

      
        {/* <Link to="/cake" className="goToCakeBtn">Go to "Cake" page to see RTK being used to manage state in non-async operation </Link>
        <Link to="/icecream" className="goToCakeBtn">Go to "Icecream" page to see RTK being used to manage state in non-async operation where whenecer a cake is bought, no.of icream reduces by 1</Link> */}
      
    </div>
  )
}

export default Home
