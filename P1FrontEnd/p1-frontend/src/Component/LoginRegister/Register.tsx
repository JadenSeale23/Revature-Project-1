import axios from "axios"
import { error } from "console"
import { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


export const Register:React.FC = () => {

    //state object to store the firstname, lastname, username, and password
    const[user, setUser] = useState({
        firstName:"",
        lastName:"",
        username:"",
        password:""
    })
    
    const storeValues = (input:any) =>{
        const name = input.target.name
        const value = input.target.value
        //send the entire user object to make a change in one field [] meaning it can be like a variable being called instead of making a new variable called name
        //take whatever input was changed and set the matching field in user to the value in the input
        setUser((user) => ({...user, [name]:value}))
    }

    //Register function that sends firstName/lastName/username/password to backend
    const register = async () =>{
        //TODO: check values are present
        //POST REQUEST - send new user info to the back end
        const response = await axios.post("http://localhost:7777/users", user)
        .then(() =>{alert("success!")})
        .catch((error)=>{alert("Failed! " + error.message)})
    }

    const navigate = useNavigate()

    return(
    //my - margin y mx - margin x
    <Container className="mx-auto my-2">
        <div>
            <h1>New here? Create an Account for free!</h1>
            <div>
                <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={storeValues}
                />
            </div>
            <div>
                <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={storeValues}
                />
            </div>
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
            <div>
                <Button className="btn-success m-1" onClick={register}>Register</Button>
                <Button className="btn-dark" onClick={()=>navigate("/")}>Go Back to Login</Button>
            </div>
        </div>
    </Container>
)
}