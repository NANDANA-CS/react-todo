import React, { Component } from "react";
import './App.css'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: "",
      todos: []
    }
    console.log("constructor created");
  }

  componentDidMount() {
    console.log("Component Mounted");
  }

  componentDidUpdate() {
    console.log("component updated")
  }
  componentWillUnmount() {
    console.log("component unmounted");
  }

  addTodo = () => {
    this.setState({
      todos: [...this.state.todos, this.state.input],
      input: ''
    })
  }


  handleChange = (e) => {
    this.setState({ input: e.target.value })
  }

  deleteTodo = (del) => {
    this.setState({
      todos: this.state.todos.filter((e, index) => index !== del
      )
    })
  }

  render() {
    return (
      <div className="container">
        <h1>TODO With REACT</h1>
        <input type="text" placeholder="Enter Task" value={this.state.input} onChange={this.handleChange} className="taskInp" />
        <button onClick={this.addTodo}>Add Task</button>
        <ul>
          {
            this.state.todos.map((todo, index) => {
              return <li key={index}>{todo} <button id="delete" onClick={() => this.deleteTodo(index)}>Delete</button></li>
            })
          }
        </ul>
      </div>
    )
  }
}
export default App