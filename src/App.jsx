import React, { Component } from "react"
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      todos: [],
      showModal: false,
      modalAction: null,
      modalData: null,
      editInput: "",
      errorMessage: "",
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
  AddTodo = async () => {
    const trimmedInput = this.state.input.trim()
    if (!trimmedInput) {
      await this.setState({ errorMessage: "Please add a task!" })
      return
    }
    this.setState({
      errorMessage: "",
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

  editTodo = (index) => {
    this.setState({
      modalAction: 'edit',
      modalData: index,
      editInput: this.state.todos[index].text,
      showModal: true,
    })
  }

  toggleCheckbox = (index) => {
    const updatedTodos = [...this.state.todos]
    updatedTodos[index].checked = !updatedTodos[index].checked
    this.setState({ todos: updatedTodos })
  }

  confirmAction = () => {
    const { modalAction, modalData, editInput } = this.state
    if (modalAction === 'add' && modalData) {
      this.setState({
        todos: [...this.state.todos, { text: modalData, checked: false }],
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
    } else if (modalAction === 'edit' && modalData !== null && editInput.trim()) {
      const updatedTodos = [...this.state.todos]
      updatedTodos[modalData].text = editInput
      this.setState({
        todos: updatedTodos,
        editInput: '',
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
      editInput: '',
    })
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  }

  handleEditChange = (e) => {
    this.setState({ editInput: e.target.value });
  }

  render() {
    return (
      <div className="container">
        <h1>REACT TO-DO LIST</h1>
        <div className="input-group">
          <input type="text"
            placeholder="Enter Task" value={this.state.input} onChange={this.handleChange} className="taskInp" />
          <button onClick={this.AddTodo}>Add Task</button>
        </div>
        {this.state.errorMessage && (
          <div className="error-message">
            {this.state.errorMessage}
          </div>
        )}
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={index} className={todo.checked ? 'checked' : ''}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={() => this.toggleCheckbox(index)}
                  className="task-checkbox"
                />
                <span>{todo.text}</span>
              </div>
              <div className="task-buttons">
                <button id="edit" onClick={() => this.editTodo(index)} > Edit </button>
                <button id="delete" onClick={() => this.DeleteTodo(index)}> Delete </button>
              </div>
            </li>
          ))}
        </ul>
        {this.state.showModal && (
          <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal">
              <h2>{this.state.modalAction === 'add' ? 'Confirm Add Task' : this.state.modalAction === 'delete' ? 'Confirm Delete Task' : 'Edit Task'} </h2>
              {
                this.state.modalAction === 'edit' ? (
                  <>
                    <input type="text" value={this.state.editInput} onChange={this.handleEditChange} className="taskInp" placeholder="Edit your task" />
                    <p>Are you sure you want to save this change?</p>
                  </>
                ) : (
                  <p> {this.state.modalAction === 'add' ? `Are you sure you want to add "${this.state.modalData}"?` : 'Are you sure you want to delete this task?'}  </p>
                )}
              <div className="modal-buttons">
                <button onClick={this.cancelAction} className="cancel-btn"> Cancel </button>
                <button onClick={this.confirmAction} className="confirm-btn"> {this.state.modalAction === 'edit' ? 'Save' : 'Confirm'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default App