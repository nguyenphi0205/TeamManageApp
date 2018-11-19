import React from 'react';
// import { Table } from 'reactstrap';

//define table header
const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>phone</th>
            </tr>
        </thead>
    )
}
//define TableBody

//call api in backend


//define header
class Table extends React.Component {
    // state = {
    //     member: []
    // }
    // componentDidMount() {
    //     const url = "http://localhost:3000/getMember";
    //     fetch(url).then(res => res.json()).then(member => this.setState({ member }))
    // }
    render() {
        return (
            <Table>
                <TableHeader />
                <tr>
                    <td>aaa</td>
                </tr>
            </Table>
        );
    }
}


export default Table;