import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"
import { UserTable } from "./UserTable"
import { DeleteUser } from "./DeleteUser"



export const UserContainer:React.FC = () => {

    const[user,setUser] = useState([])

    //useEffect that calls the function
    useEffect(()=>{
        getUsers()
    },[])//triggers on component load   
    
    
    const getUsers = async () =>{
        //admins will get all users
        const response = await axios.get(store.backendUrl + "users")
        //populate the user state object
        setUser(response.data)
        console.log(response.data)
    }

    const navigate = useNavigate()
    const username = store.loggedInUser.username;
    const role = store.loggedInUser.role;
    return(
        <Container>
            <div>
                <h3 className="text-center">All Users</h3>
                <UserTable users={user}></UserTable>
            </div>
            <div>
                <Button className="my-3 m-1 btn-dark" onClick={()=>navigate("/")}>Go Back to Login</Button>
                <Button className="m-1 btn-dark" onClick={()=>navigate("/reimbursements")}>Go Back to Reimbursements</Button>
                <Button className="m-1 btn-dark" onClick={()=>navigate("/deleteUser")}>Delete a User</Button>
            </div>
        </Container>

    )
        
}