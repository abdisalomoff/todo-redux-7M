// YourTableComponent.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  fetchTasksAction,
  createTaskAction,
  updateTaskAction,
  deleteTaskAction,
} from "../redux/actions/tasksAction";
import { tasks as taskData } from "../constants";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CreateTaskModal from "./CreateModal";
import EditModal from "./EditModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { nanoid } from "nanoid";

const TasksTable = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [taskIndex, setTaskIndex] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const tasks = useSelector((state) => state?.data?.tasks);

  useEffect(() => {
    dispatch(fetchTasksAction(taskData));
  }, [dispatch]);

  const data = {
    id: nanoid(),
    name: "new task",
    created_date: new Date(),
    done: true,
    description: "new task description",
  };

  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "created_date",
      title: "Crated Date",
      render: (item, index) => (
        <div>{dayjs(item.created_date).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "done",
      render: (item, index) => (
        <div
          className={`text-xl ${item.done ? "text-green-300" : "text-red-300"}`}
        >
          {item.done ? "Finishied" : "Not finished"}
        </div>
      ),
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "actions",
      title: "Actions",
      render: (item, index) => (
        <div>
          <Button
            onClick={() => {
              console.log("index", index);

              setTaskIndex("" + index);
            }}
          >
            <EditIcon color="success" />
          </Button>

          <Button
            onClick={() => {
              console.log(item);
              handleDelete(item.name);
            }}
          >
            <DeleteIcon style={{ color: "red" }} />
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (updatedData) => {
    dispatch(updateTaskAction({ id: taskIndex, data: updatedData }));
    setTaskIndex(null);
  };

  const handleDelete = (taskId) => {
    console.log("TASKID,", taskId);
    dispatch(deleteTaskAction(taskId));
  };

  return (
    <div className="p-8">
      <div style={{display: "flex"}}>
        <h2 className="text-3xl">Task Table</h2>
        <Button style={{marginLeft: 'auto'}} variant="outlined" onClick={handleClickOpen}>
          Create Task
        </Button>
      </div>
      <TableContainer
        component={Paper}
        className="max-w-full mx-auto mt-8 border-gray"
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((el) => (
                <TableCell key={el.key}>{el.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column, i) => (
                  <TableCell key={i}>
                    {column.render
                      ? column.render(row, index)
                      : row[column.dataIndex]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateTaskModal handleClose={handleClose} open={open} />
      <EditModal
        id={taskIndex}
        handleClose={() => setTaskIndex(null)}
        open={!!taskIndex}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default TasksTable;
