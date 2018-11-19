import React from 'react'
import axios from 'axios'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class Project extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeProjectName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            Project: [],
            nameProject: '',
            
        }
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    onChangeName(e) {
        this.setState({
            nameProject: e.target.value
        });
    }
    //POST method
    onSubmit(e) {
        e.preventDefault();
        const addProject = {
            name: this.state.nameProject,
        }
        axios.post('http://localhost:8080/createProject', addProject)
            .then((res) => {
                console.log(res.status)
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
        const url = 'http://localhost:8080/getProject';
        fetch(url).then(res => res.json()).then((Project) => {
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
    }

    render() {
        return (
            <div className="app">
                <h1>Project list</h1>
                <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}ADD Project</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>ADD New Project</ModalHeader>
                    <form onSubmit={this.onSubmit}>
                        <ModalBody>
                            <div className="form-group">
                                <label>Project Name</label>
                                <input type="text" className="form-control" value={this.state.nameProject} onChange={this.onChangeProjectName} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <input type="submit" value="Add Project" className="btn btn-primary" />
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
                <div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Project Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Project.map(projectName =>
                                <tr key={projectName._id}>
                                    <td>{projectName.name}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div >
        );
    }
}

export default Project;