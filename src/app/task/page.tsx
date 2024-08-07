import TaskList from "./_components/TaskList";

const Task = () => {
  return (
    <div className="w-full">
      <div className="m-5 text-4xl font-semibold">Task</div>
      <div>
        <TaskList />
      </div>
    </div>
  );
};

export default Task;
