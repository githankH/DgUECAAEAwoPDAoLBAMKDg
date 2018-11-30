import React from "react";
import ReactDOM from "react-dom";

import TabView from "./TodoPage";
import TodoCalendar from "./TodoCalendar";

import "antd/dist/antd.css";
import "./styles.css";

const panel = {
  maxWidth: "960px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between"
};
const left_panel = { width: "65%" };
const right_panel = {
  width: "35%",
  height: "80vh"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: new Date().getDate(),
      todos: []
    };
  }

/* if there is previous data, then load it 
   todos: are 2d-array,
   [[],[],...]
   1st-dim: all days lists,
   2nd-dim: each days lists
   each array-element: type:(done or not-done), content:(description text)
*/
  componentDidMount() {
    
    let flag = localStorage.getItem("flag");
    let saves = JSON.parse(localStorage.getItem("todos"));
    let mock = new Array(32);
    for (let idx = 0; idx < 32; ++idx) mock.concat([]);
    mock.splice(1, 1, [
      { type: "warning", content: "buy water" },
      { type: "warning", content: "check bills" },
      { type: "warning", content: "long long long long long long event" },
      { type: "success", content: "pick up brothers" }
    ]);
    mock.splice(3, 1, [
      { type: "warning", content: "need todo1" },
      { type: "warning", content: "want check 2" },
      {
        type: "warning",
        content: "test for long long long long long long"
      },
      { type: "success", content: "take-off now" }
    ]);

    this.setState({ todos: flag === "yes" ? saves : mock });
  }

  componentWillUnmount() {
    localStorage.setItem("flag", "yes");
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  onSelecthandler = day => {
    this.setState({ chosen: day.date() });
  };

  /*
     input sends text, then
     1st: find current day lists
     2nd: add new text item into idx=0 position
     3rd: geneate new all todos
     4th: setState to render
  */
  newTodoItemHandler = text => {
    let newlistOnday = this.state.todos[this.state.chosen]
      ? [...this.state.todos[this.state.chosen]]
      : [];
    newlistOnday.splice(1, 0, { type: "warning", content: text });

    let newtodos = [...this.state.todos];
    newtodos.splice(this.state.chosen, 1, newlistOnday);
    this.setState({ todos: newtodos });
  };
 
  /*
     as the same as newTodoItemHandler,
     the different is to control status(or type) here
   */
  completeHandler = (oneTodo, index) => {
    const newTodo = {
      type: oneTodo.type === "warning" ? "success" : "warning",
      content: oneTodo.content
    };

    let newlistOnday = this.state.todos[this.state.chosen]
      ? [...this.state.todos[this.state.chosen]]
      : [];
    newlistOnday.splice(index, 1, newTodo);
    let newtodos = [...this.state.todos];
    newtodos.splice(this.state.chosen, 1, newlistOnday);
    this.setState({ todos: newtodos });
  };
  render() {
    return (
      <div className="App" style={panel}>
        <div style={left_panel}>
          <TodoCalendar
            onSelecthandler={this.onSelecthandler}
            completeHandler={this.completeHandler}
            todos={this.state.todos}
          />
        </div>
        <div style={right_panel}>
          <TabView
            items={this.state.todos}
            itemsOnDay={this.state.todos[this.state.chosen]}
            todoItemHandler={this.newTodoItemHandler}
            completeHandler={this.completeHandler}
          />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
