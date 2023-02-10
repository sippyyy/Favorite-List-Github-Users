import { Container, Table } from "react-bootstrap";
import BodyTable from "./BodyTable";

function Content({list}) {
    return ( 
        <Container className='margin-bar'>
            <Table className='full-width'>
                <thead>
                    <tr>
                        <th className='font-text' rowSpan={2}>ID</th>
                        <th className='font-text' rowSpan={1}>Avatar</th>
                        <th className='font-text' rowSpan={1}>Public Repos</th>
                        <th className='font-text' rowSpan={2}>Followers</th>
                        <th className='font-text' rowSpan={2}>Add to favorite</th>
                    </tr>
                    <tr>
                        <th className='font-text' rowSpan={1}>Login</th>
                        <th className='font-text' rowSpan={1}>Profile</th>
                    </tr>
                </thead>
                <tbody>
                    <BodyTable list={list} />
                </tbody>
            </Table>
        </Container>
     );
}

export default Content;