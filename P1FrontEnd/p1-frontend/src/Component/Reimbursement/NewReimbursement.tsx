import { useState } from "react"
import { store } from "../../globalData/store"
import axios from "axios"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const NewReimbursement = () =>{

    const[reim, setReim] = useState({
        description:"",
        amount: 0,
        status:"",
        userId: 0
    })

    const storeValues = (input:any) =>{
        const name = input.target.name
        const value = input.target.value
        setReim((reim) => ({...reim, [name]:value}))
    }

    //sendReim function that sends description/amount/status/userId to backend
    const sendReim = async () =>{
        let updatedReim = { ...reim };

    // Check user role and set fields accordingly
    if (store.loggedInUser.role === "user") {
        updatedReim = {
            ...updatedReim,
            status: "PENDING",
            userId: store.loggedInUser.userId,
        };
    }
        console.log(updatedReim.status)
        console.log(updatedReim.userId)
        const response = await axios.post(store.backendUrl + "reimbursements", updatedReim)
        .then(() =>{alert("success!")})
        .catch((error)=>{alert("Failed to make a new Reimbursement! " + error.message)})
    }

    const navigate = useNavigate()
    const username = store.loggedInUser.username; 

    return(
        <Container className="mx-auto my-2">
        <div>
            <h1>{store.loggedInUser.role === 'user' ? 'Welcome ' + username + ', Claim ' : 'Welcome Admin, Create '}a New Reimbursement</h1>
            <div>
                <Form.Control
                    type="textarea"
                    placeholder="Description"
                    name="description"
                    onChange={storeValues}
                />
            </div>
            <div>
                <Form.Control
                    type="number"
                    placeholder="Amount"
                    name="amount"
                    onChange={storeValues}
                />
            </div>

            {store.loggedInUser?.role === "admin" && (<><div>
                    <Form.Select name="status" onChange={storeValues}>
                        <option>Status</option>
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="DENIED">DENIED</option>
                    </Form.Select>
                    <Form.Control
                        type="number"
                        placeholder="User ID"
                        name="userId"
                        onChange={storeValues} />
                </div></>)}
                <div>
                    <Button className="btn-success m-1" onClick={sendReim}>Submit New Reimbursement</Button>
                    <Button className="btn-dark" onClick={() => navigate("/reimbursements")}>Go Back to Reimbursements</Button>
                </div>

        </div>
    </Container>

    )
}

