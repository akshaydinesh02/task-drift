import { useMemo } from "react";
import VerticalCard from "../../components/Dashboard/VerticalCard";
import { useTasks } from "../../contexts/Tasks";

const allTasks = [
  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },

  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 1",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },

  {
    name: "task 2",
    status: "incomplete",
    description: "task description",
    priority: "low",
  },
  {
    name: "task 3",
    status: "incomplete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 4",
    status: "progress",
    description: "task description",
    priority: "med",
  },
  {
    name: "task 5",
    status: "progress",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 6",
    status: "progress",
    description: "task description",
    priority: "low",
  },
  {
    name: "task 7",
    status: "complete",
    description: "task description",
    priority: "med",
  },
  {
    name: "task 8",
    status: "complete",
    description: "task description",
    priority: "high",
  },
  {
    name: "task 9",
    status: "complete",
    description: "task description",
    priority: "low",
  },
];

const Dashboard = () => {
  const allT = useTasks().allTasks;
  console.log(allT);
  const inCompleteTasks = useMemo(
    () => allTasks.filter((task) => task.status === "incomplete"),
    [allTasks]
  );
  const inProgressTasks = useMemo(
    () => allTasks.filter((task) => task.status === "progress"),
    [allTasks]
  );
  const completedTasks = useMemo(
    () => allTasks.filter((task) => task.status === "complete"),
    [allTasks]
  );
  return (
    <main className="pt-36 h-screen flex gap-4 max-w-5xl mx-auto">
      <VerticalCard name="to-do" tasks={inCompleteTasks} />
      <VerticalCard name="in progress" tasks={inProgressTasks} />
      <VerticalCard name="done" tasks={completedTasks} />
    </main>
  );
};

export default Dashboard;
