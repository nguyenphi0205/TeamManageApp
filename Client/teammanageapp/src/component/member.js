import React from 'react'
import axios from 'axios'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class Member extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeHostName = this.onChangeName.bind(this);
        this.onChangePort = this.onChangePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false,
            members: [],
            name: '',
            phone: 0,
        }
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }
    //POST method
    onSubmit(e) {
        e.preventDefault();
        const addMember = {
            name: this.state.name,
            phone: this.state.phone
        }
        axios.post('http://localhost:8080/createMember', addMember)
            .then((res) => {
                if (res.status === 200) {
                    this.getData();
                    alert('successful')
                    window.location.reload();
                }
                else {
                    console.log("err")
                }
                this.toggle();
            }).catch(err => {
                console.err(err)
            })
        this.setState({
            name: '',
            phone: ''
        })
    }
    getData() {
        const url = 'http://localhost:8080/getMember';
        fetch(url).then(res => res.json()).then(members => this.setState({ members }))
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        return (
            <div className="app">
                <h1>Member list</h1>
                <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}ADD Member</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>ADD New Member</ModalHeader>
                    <form onSubmit={this.onSubmit}>
                        <ModalBody>
                            <div className="form-group">
                                <label>Member Name</label>
                                <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeHostName} />
                            </div>
                            <div className="form-group">
                                <label>Member phone</label>
                                <input type="text" className="form-control" value={this.state.phone} onChange={this.onChangePort} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <input type="submit" value="Add member" className="btn btn-primary" />
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
                <div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Name Member</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.members.map(member =>
                                <tr key={member._id}>
                                    <td>{member.name}</td>
                                    <td>{member.phone}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div >
        );
    }
}

export default Member;