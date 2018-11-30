import React from "react";
import { Tabs } from "antd";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TabPane = Tabs.TabPane;

const clearListstyle = {
  textAlign: "left",
  margin: "2px 0.5rem",
  fontSize: "1rem"
};

const TabView = ({ items, itemsOnDay, todoItemHandler, completeHandler }) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="with Dates" key="1">
        <TodoInput todoItemHandler={todoItemHandler} />
        <br />

        <TodoList
          todos={itemsOnDay}
          completeHandler={completeHandler}
          listyle={clearListstyle}
        />
      </TabPane>
      <TabPane tab="All" key="2">
      {
        items.map((item,index)=>(
          <TodoList key={index}
          todos={item}
          completeHandler={null}
          listyle={clearListstyle}
        />    
        ))
      }
      </TabPane>
    </Tabs>
  );
};

export default TabView;
