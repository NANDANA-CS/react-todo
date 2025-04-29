import React, { Component } from "react"
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: "",
      todos: [],
      showModal: false,
      modalAction: null,
      modalData: null,
      editingIndex: null,
      editInput: "",
    }
    console.log("constructor created")
  }

  componentDidMount() {
    console.log("Component Mounted")
  }

  componentDidUpdate() {
    console.log("component updated")
  }

  componentWillUnmount() {
    console.log("component unmounted")
  }

  AddTodo = () => {
    this.setState({
      modalAction: 'add',
      modalData: this.state.input,
      showModal: true,
    })
  }

  DeleteTodo = (index) => {
    this.setState({
      modalAction: 'delete',
      modalData: index,
      showModal: true,
    })
  }

  confirmAction = () => {
    const { modalAction, modalData } = this.state;
    if (modalAction === 'add' && modalData) {
      this.setState({
        todos: [...this.state.todos, modalData],
        input: '',
        showModal: false,
        modalAction: null,
        modalData: null,
      })
    } else if (modalAction === 'delete' && modalData !== null) {
      this.setState({
        todos: this.state.todos.filter((i, index) => index !== modalData),
        showModal: false,
        modalAction: null,
        modalData: null,
      })
    }
  }

  cancelAction = () => {
    this.setState({
      showModal: false,
      modalAction: null,
      modalData: null,
    })
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value })
  }
  render() {
    return (
      <div className="container">
        <h1>REACT TO-DO LIST</h1>
        <div className="input-group">
          <input type="text" placeholder="Enter Task" value={this.state.input} onChange={this.handleChange} className="taskInp" />
          <button onClick={this.AddTodo}>Add Task </button>
        </div>
        <ul>{this.state.todos.map((todo, index) => (
          <li key={index}>{(
            <>
              {todo}
              <div className="task-buttons">
                <button id="delete" onClick={() => this.DeleteTodo(index)}>Delete</button>
              </div>
            </>
          )}
          </li>
        ))}
        </ul>
        {
          this.state.showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>{this.state.modalAction === 'add' ? 'Confirm Add Task' : 'Confirm Delete Task'}</h2>
                <p>{this.state.modalAction === 'add' ? `Are you sure you want to add "${this.state.modalData}"?` : 'Are you sure you want to delete this task?'}</p>
                <div className="modal-buttons">
                  <button onClick={this.cancelAction} className="cancel-btn">Cancel</button>
                  <button onClick={this.confirmAction} className="confirm-btn" >Confirm </button>
                </div>
              </div>
            </div>
          )}
      </div>
    )
  }
}
export default App