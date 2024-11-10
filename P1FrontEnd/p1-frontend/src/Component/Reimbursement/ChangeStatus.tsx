import axios from "axios"
import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { store } from "../../globalData/store"
import { useNavigate } from "react-router-dom"

export const ChangeStatus:React.FC = () =>{
    const[status, setStatus] = useState({
        reimId:0,
        status:""
    })
    const statusStr = status.status

    const storeValues = (input:any) =>{
        const name = input.target.name
        const value = input.target.value
        setStatus((status) => ({...status, [name]:value}))
    }

    const patchStatus = async () =>{
        console.log(status)
        console.log(statusStr)
        console.log(store.backendUrl + "reimbursements/" + status.reimId)
        const response = await axios.patch(store.backendUrl + "reimbursements/" + status.reimId, {statusStr})
        .then(() =>{alert("success!")})
        .catch((error)=>{alert("Failed! " + error.message)})
    }
    
    const navigate = useNavigate()

    return(
        <Container>
            <h5>Change Reimbursement Status:</h5>
            <Form.Control
                type="number"
                placeholder="Reimbursement ID"
                name="reimId"
                onChange={storeValues} />
            <Form.Select name = "status" onChange={storeValues}>
                <option>Status</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="DENIED">DENIED</option>
            </Form.Select>
            <Button className="btn-success m-1" onClick={patchStatus}>Change Status</Button>
            <Button className="btn-dark" onClick={() => navigate("/reimbursements")}>Go Back to Reimbursements</Button>
        </Container> 
    )
}