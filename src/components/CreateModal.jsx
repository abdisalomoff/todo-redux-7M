import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import PropTypes from "prop-types";
import Input from "./Form/Input";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Checkbox } from "@mui/material";
import { createTaskAction } from "../redux/actions/tasksAction";
import { useDispatch } from "react-redux";

export default function CreateTaskModal({ handleClose = () => {}, open }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      date: new Date(),
      done: false,
    },
  });

  const errorMessage = "This is required field";

  const selectDateHandler = (date) => {
    setValue("date", date);
  };

  const onSubmit = (value) => {
    dispatch(createTaskAction(value));
    handleClose();
  };
  return (
    <>
      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogContent style={{ minHeight: 500 }} dividers>
          <div>
            <p className="text-center text-3xl">Hook Form</p>
            <div className="w-full flex justify-center">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[400px] border-[lightgray] border-[1px] rounded-md p-4"
              >
                <div className="flex flex-col gap-3 mb-3">
                  <label>Name</label>
                  <Input
                    type="text"
                    placeholder="Name"
                    name="name"
                    {...register("name", {
                      required: errorMessage,
                    })}
                  />

                  <ErrorMessage error={errors?.name?.message} />
                </div>
                <div className="flex flex-col gap-3 mb-3">
                  <label>Description</label>
                  <Input
                    type="text"
                    placeholder="Description"
                    name="description"
                    {...register("description", {
                      required: false,
                    })}
                  />
                </div>

                <div className="mb-[12px]">
                  <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={watch("date")}
                    onChange={selectDateHandler}
                    todayButton={"Today"}
                    customInput={<Input />}
                  />
                </div>

                <div>
                  <Checkbox
                    value={watch("done")}
                    onChange={(e) => setValue("done", e.target.checked)}
                  />
                </div>

                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

CreateTaskModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  //   title: PropTypes.string.isRequired,
};

CreateTaskModal.defaultProps = {
  open: true,
};

const ErrorMessage = ({ error }) => {
  return <div className="text-[red]">{error}</div>;
};
