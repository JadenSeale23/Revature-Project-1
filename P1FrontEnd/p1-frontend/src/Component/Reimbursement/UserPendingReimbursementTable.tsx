import { Container, Table } from "react-bootstrap"

export const UserPendingReimbursementTable:React.FC<{reimbursements:any[]}> = ({reimbursements}) =>{


    return(
        <Container className="mx-auto my-3">
            <Table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reimbursements.map((reim:any) => (
                        <tr>
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