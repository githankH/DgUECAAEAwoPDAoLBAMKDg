import React from "react";
import { Badge } from "antd";

const ulstyle = {
  listStyle: "none",
  margin: "0",
  padding: "0"
};

const badgestyle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  width: "100%",
  textOverflow: "ellipsis",
  fontSize: "12px"
};

const TodoList = ({ todos, listyle, completeHandler }) => {
  return (
    <ul style={ulstyle}>
      {todos &&
        todos.map((item, index) => (
          <li key={item.content} style={listyle}>
            <Badge
              status={item.type}
              text={item.content}
              //workaround for showALL
              onClick={() => completeHandler && completeHandler(item, index)}
              style={badgestyle}
            />
          </li>
        ))}
    </ul>
  );
};

export default TodoList;
