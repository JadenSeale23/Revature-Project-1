import axios from "axios"
import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import {useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"


export const Login:React.FC = () => {
    //state obj that holds username and password
        const[loginCreds, setLoginCreds] = useState({
        username:"",
        password:""
    })

    //useNavigate hook to navigate b/w components programattically
    const navigate = useNavigate()

    //function that stores user input
    const storeValues = (input:any) => {
        const name = input.target.name
        const value = input.target.value
        setLoginCreds((loginCreds) => ({...loginCreds, [name]:value}))
    }

    //function that does the login POST request
    //navigates to /pets if role is user and /users if role is admin
    const login = async () =>{
        const response = await axios.post("http://localhost:7777/auth", loginCreds)
        .then(
            response => {
                console.log(response.data)
                //save the logged in user data locally
                store.loggedInUser = response.data
                //greet the user
                alert("Welcome, " + store.loggedInUser.username)

                navigate("/reimbursements")
            }
        )
        .catch((error) =>{
            alert("Login failed! Please try again.")
        })
    }

    return(
        /*Bootstrap gives us this Container element that does some default padding and centering*/
        <Container> 

            <h1>Welcome to the ReimCorp: Your Money on Your Time!</h1>
            <h3>Please Log In:</h3>
                
                <div>
                    <Form.Control
                        type="text"
                        placeholder="username"
                        name="username"
                        onChange={storeValues}
                    />
                </div>

                <div>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={storeValues}
                    />
                </div>
                

            <Button className="btn-dark m-1" onClick={login}>Login</Button>
            <Button className="btn-dark" onClick={()=>navigate("/register")}>Register</Button>
        </Container>
    )
} 