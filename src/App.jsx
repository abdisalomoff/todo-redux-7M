import React from "react";
import { useSelector } from "react-redux";
import TasksTable from "./components/Tasks";

export default function App() {
  const state = useSelector((state) => state.count);

  return (
    <div>
      <TasksTable />
    </div>
  );
}
