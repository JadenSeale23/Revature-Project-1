import { Container, Table } from "react-bootstrap"

export const ReimbursementTable:React.FC<{reimbursements:any[]}> = ({reimbursements}) =>{


    return(
        <Container className="mx-auto my-3">
            <Table>
                <thead>
                    <tr>
                        <th>Reimbursement ID</th>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reimbursements.map((reim:any) => (
                        <tr>
                            <td>{reim.reimId}</td>
                            <td>{reim.user.userId}</td>
                            <td>{reim.user.username}</td>
                            <td>{reim.description}</td>
                            <td>${reim.amount.toFixed(2)}</td>
                            <td>{reim.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container>
    )

}