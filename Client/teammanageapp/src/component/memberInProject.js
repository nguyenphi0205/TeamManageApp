import React from 'react'
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, FormGroup, Label, Input } from 'reactstrap';
class MemberInProject extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onChangeHostName = this.onChangeName.bind(this);
        this.onChangePort = this.onChangePhone.bind(this);
        this.state = {
            Project: [
                { members: [] }
            ],
            modal: false,

            members1: [],
            name: '',
            phone: ''
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
    getData() {
        const url = 'http://localhost:8080/getMember';
        fetch(url).then(res => res.json()).then(members1 => this.setState({ members1 }))
    }
    onSubmit(e) {
        e.preventDefault();
        var UserID = document.getElementById("memberName").value;
        var ProjectID = document.getElementById("projectName").value;
        const addProject = {
            members: [
                {
                    member: UserID
                }
            ]
        }
        const url = 'http://localhost:8080/getProject';
        fetch(url)
            .then(res => res.json())
            .then((Project) => {
                console.log(Project)
                if (Array.isArray(Project)) {
                    Project.forEach(members => {
                        if (members._id === ProjectID) {
                            var ArrayMembers = members.members;
                            var found = ArrayMembers.some((el) => {
                                return el.member._id === UserID
                            });
                            if (!found) {
                                axios.put('http://localhost:8080/addNewMember?_id=' + ProjectID, addProject)
                                    .then((res) => {
                                        console.log(res.status)
                                        if (res.status === 200) {

                                            alert('successful')
                                            window.location.reload();
                                        }
                                        else {
                                            console.log("err")
                                        }
                                        this.toggle();
                                    }).catch(err => {
                                        console.log(err)
                                    })

                            }
                            else {
                                alert('This Member is already exists in Project')
                            }
                        }
                    });

                }

            })

    }

    getDataProject() {
        const url = 'http://localhost:8080/getProject';
        fetch(url)
            .then(res => res.json())
            .then((Project) => {
                this.setState({ Project })
                if (Array.isArray(Project)) {
                    Project.forEach(members => {
                        this.setState({ members })
                    });
                }
            })
    }
    componentDidMount() {
        this.getData();
        this.getDataProject();
    }

    render() {
        return (
            <div>
                <h1>list member in Project</h1>
                <Button id="1" color="danger" onClick={this.toggle}>{this.props.buttonLabel}ADD Member To Project</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>ADD New Member To Project</ModalHeader>
                    <form onSubmit={this.onSubmit}>
                        <ModalBody>
                            <div className="form-group">
                                <FormGroup>
                                    <Label for="exampleSelect">Select Member</Label>
                                    <Input type="select" name="select" id="memberName">
                                        {this.state.members1.map(memberName =>
                                            <option value={memberName._id} onChange={this.onChangeHostName} key={memberName._id}>{memberName.name}-{memberName.phone}</option>
                                        )}
                                    </Input>
                                </FormGroup>
                            </div>
                            <div className="form-group">
                                <FormGroup>
                                    <Label for="exampleSelect">Select Project</Label>
                                    <Input type="select" name="select" id="projectName">
                                        {this.state.Project.map(projectName =>
                                            <option value={projectName._id} onChange={this.onChangePort} key={projectName._id}>{projectName.name}</option>
                                        )}
                                    </Input>
                                </FormGroup>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <input type="submit" value="Add member" className="btn btn-primary" />
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
                <div>
                    {this.state.Project.map((item, index) => {
                        return (
                            <ListGroup style={{marginTop:20+'px'}} flush key={index}><a style={{fontWeight: "bold"}}>{item.name}</a>
                                {
                                    item.members.map((subitem, i) => {
                                        return (
                                            <ListGroupItem key={subitem.member._id}>{subitem.member.name}</ListGroupItem>
                                        )
                                    })
                                }
                            </ListGroup>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default MemberInProject;