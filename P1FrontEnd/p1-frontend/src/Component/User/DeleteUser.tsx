import axios from "axios";
import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { store } from "../../globalData/store";
import { useNavigate } from "react-router-dom";

export const DeleteUser:React.FC = () =>{

    const[user, setUser] = useState({
        userId:0
    })

    const storeValues = (input:any) =>{
        const value = input.target.value
        setUser(value)
    }

    const deleteUser = async() =>{
        const response = await axios.delete(store.backendUrl + 'users/' + user)
        .then(() =>{alert("success!")})
        .catch((error)=>{alert("Failed! " + error.message)})
        console.log(response)
    }
    const navigate = useNavigate()

    return(
        <Container>
            <Form.Control
                type="number"
                placeholder="User ID"
                name="userId"
                onChange={storeValues}/>
            <Button onClick={deleteUser}>Delete User</Button>
            <Button className="m-1 btn-dark" onClick={()=>navigate("/users")}>Go Back to Users</Button>
        </Container>
    )

}