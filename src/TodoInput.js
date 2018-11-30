import React, { Component } from "react";
import { Input, Icon } from "antd";

const inputstyle = {
  width: "95%",
  margin: "0.1rem 0.2rem"
};

class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thing: ""
    };
  }

  emitEmpty = () => {
    this.todoInput.focus();
    this.setState({ thing: "" });
  };

  onInputChange = e => {
    this.setState({ thing: e.target.value });
  };

  onAddNewItem = () => {
    this.props.todoItemHandler(this.state.thing);
    this.emitEmpty();
  };

  render() {
    const thing = this.state.thing;
    const suffix = thing ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : null;
    return (
      <Input
        placeholder="Enter your things"
        prefix={<Icon type="edit" style={{ color: "rgba(0,0,0,.25)" }} />}
        addonAfter={<Icon type="plus" onClick={this.onAddNewItem} />}
        onChange={this.onInputChange}
        onPressEnter={this.onAddNewItem}
        suffix={suffix}
        value={thing}
        ref={node => (this.todoInput = node)}
        style={inputstyle}
      />
    );
  }
}

export default TodoInput;
