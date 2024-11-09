import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap"
import { ReimbursementTable } from "./ReimbursementTable"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"


export const ReimbursementContainer:React.FC = () => {

    const[reim,setreim] = useState([])
        // TODO: navbar for navigation

    //useEffect that calls the function
    useEffect(()=>{
        getReimbursementsById()
    },[])//triggers on component load   
    
    //get reimbursements by userId by axios GET request
    const getReimbursementsById = async () =>{
        //hardcoded id for now but id should be the id of the logged in user 
        const response = await axios.get("http://localhost:7777/reimbursements/user/" + store.loggedInUser.userId)

        //populate the pets state object
        setreim(response.data)
        console.log(response.data)

    }
    const navigate = useNavigate()
    return(
        <Container>
            <div>
                <h3>{store.loggedInUser.username}'s Reimbursements</h3>
                <ReimbursementTable reimbursements={reim}></ReimbursementTable>
            </div>
            <div>
                <Button className="btn-dark" onClick={()=>navigate("/")}>Go Back to Login</Button>
            </div>
        </Container>

    )
        
}