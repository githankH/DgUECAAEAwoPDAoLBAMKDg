import React, { Component } from "react";
import { Calendar } from "antd";

import TodoList from "./TodoList";

const calendarListstyle = {
  textAlign: "left",
  margin: "0"
};

class TodoCalendar extends Component {

  dateCellrender = value => {
    const listdata = this.props.todos[value.date()] || [];
    return (
      <TodoList
        todos={listdata}
        completeHandler={this.props.completeHandler}
        listyle={calendarListstyle}
      />
    );
  };

  onSelect = value => {
    this.props.onSelecthandler(value);
  };

  render() {
    return (
      <Calendar
        dateCellRender={this.dateCellrender}
        onSelect={this.onSelect}
      />
    );
  }
}

export default TodoCalendar;
