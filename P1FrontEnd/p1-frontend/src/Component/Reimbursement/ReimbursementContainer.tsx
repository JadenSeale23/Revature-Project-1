import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap"
import { ReimbursementTable } from "./ReimbursementTable"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"



export const ReimbursementContainer:React.FC = () => {

    const[reim,setreim] = useState([])

    //useEffect that calls the function
    useEffect(()=>{
        getReimbursements()
    },[])//triggers on component load   
    
    //get reimbursements by userId by axios GET request
    const getReimbursements = async () =>{
        //users will only get their own Reimbursements
        if(store.loggedInUser.role == 'user'){ 
            const response = await axios.get(store.backendUrl + "reimbursements/user/" + store.loggedInUser.userId)
            //populate the pets state object
            setreim(response.data)
            console.log(response.data)
        }
        //admins will get all reimbursements
        else if(store.loggedInUser.role == 'admin'){ 
            const response = await axios.get(store.backendUrl + "reimbursements")
            //populate the pets state object
            setreim(response.data)
            console.log(response.data)
        }


    }
    const navigate = useNavigate()
    const username = store.loggedInUser.username;
    const role = store.loggedInUser.role;
    return(
        <Container>
            <div>
                <h3 className="text-center">{role === 'user' ? username + "'s Reimbursements": 'All Reimbursements'}</h3>
                <ReimbursementTable reimbursements={reim}></ReimbursementTable>
            </div>
            <div>
                <Button className="btn-dark" onClick={()=>navigate("/")}>Go Back to Login</Button>
                <Button className="my-1 m-1 btn-dark" onClick={()=>navigate("/newReimbursements")}>Make a new Reimbursement</Button>
                {role === "admin" && <Button className="my-3 btn-dark" onClick={()=>navigate("/changeStatus")}>Change Reimbursement Status</Button>}
            </div>
        </Container>

    )
        
}