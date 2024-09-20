import VerticalCard from "../../components/Dashboard/VerticalCard";
import { useTasks } from "../../contexts/Tasks";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { TaskPriority } from "../../types";
import { useState } from "react";
import ModalComponent from "../../components/Modal";
import Modal from "react-modal";
import ContainerForm from "../../components/Form/ContainerForm";

const allTasks = [
  {
    name: "Finish report",
    status: "incomplete",
    description: "Complete the quarterly financial report.",
    priority: TaskPriority.High,
    id: uuidv4(),
  },
  {
    name: "Fix login bug",
    status: "incomplete",
    description:
      "Resolve the issue where users can't log in using Google OAuth.",
    priority: TaskPriority.High,
    id: uuidv4(),
  },
  {
    name: "Prepare presentation",
    status: "incomplete",
    description:
      "Prepare the slides for the upcoming marketing strategy presentation.",
    priority: TaskPriority.Medium,
    id: uuidv4(),
  },
  {
    name: "Clean up repository",
    status: "incomplete",
    description:
      "Remove unnecessary files and restructure the project for clarity.",
    priority: TaskPriority.Low,
    id: uuidv4(),
  },
  {
    name: "Update user guide",
    status: "incomplete",
    description: "Add new features to the user guide and reorganize content.",
    priority: TaskPriority.Medium,
    id: uuidv4(),
  },
  {
    name: "Client feedback",
    status: "incomplete",
    description: "Gather and document feedback from client review meetings.",
    priority: TaskPriority.High,
    id: uuidv4(),
  },
  {
    name: "Database optimization",
    status: "incomplete",
    description: "Optimize database queries to reduce response time by 30%.",
    priority: TaskPriority.High,
    id: uuidv4(),
  },
  {
    name: "Test new API",
    status: "incomplete",
    description:
      "Run end-to-end tests on the new API endpoints before release.",
    priority: TaskPriority.Medium,
    id: uuidv4(),
  },
  {
    name: "Refactor CSS",
    status: "incomplete",
    description: "Refactor the global CSS file to make it more maintainable.",
    priority: TaskPriority.Low,
    id: uuidv4(),
  },
  {
    name: "Create dashboard wireframe",
    status: "incomplete",
    description: "Design a wireframe for the new admin dashboard.",
    priority: TaskPriority.High,
    id: uuidv4(),
  },
  {
    name: "Onboard new team member",
    status: "incomplete",
    description:
      "Prepare onboarding materials and help the new team member settle in.",
    priority: TaskPriority.Medium,
    id: uuidv4(),
  },
  {
    name: "Write unit tests",
    status: "incomplete",
    description: "Write unit tests for the user authentication module.",
    priority: TaskPriority.High,
    id: uuidv4(),
  },
  {
    name: "Prepare code review",
    status: "incomplete",
    description: "Schedule and prepare code for the upcoming review session.",
    priority: TaskPriority.Medium,
    id: uuidv4(),
  },
  {
    name: "Migrate data",
    status: "incomplete",
    description: "Migrate user data to the new server.",
    priority: TaskPriority.High,
    id: uuidv4(),
  },
  {
    name: "Design login page",
    status: "progress",
    description: "Design the new login page as per updated UX guidelines.",
    priority: TaskPriority.High,
    id: uuidv4(),
  },
  {
    name: "Fix CSS issues",
    status: "progress",
    description: "Fix responsiveness issues in the main layout.",
    priority: TaskPriority.Medium,
    id: uuidv4(),
  },
  {
    name: "Add search functionality",
    status: "progress",
    description: "Implement search functionality in the admin dashboard.",
    priority: TaskPriority.Low,
    id: uuidv4(),
  },
  {
    name: "Complete API integration",
    status: "complete",
    description: "Integrate the third-party API for payment processing.",
    priority: TaskPriority.High,
    id: uuidv4(),
  },
  {
    name: "Deploy to production",
    status: "complete",
    description: "Deploy the latest build to the production environment.",
    priority: TaskPriority.Medium,
    id: uuidv4(),
  },
  {
    name: "Optimize images",
    status: "complete",
    description: "Optimize all images on the website for faster loading times.",
    priority: TaskPriority.Low,
    id: uuidv4(),
  },
];

const Dashboard = () => {
  const containers = useTasks().containers;
  const [addContainerModalOpen, setAddContainerModalOpen] =
    useState<boolean>(true);
  console.log(containers);

  const onRequestModalClose = () => setAddContainerModalOpen(false);

  Modal.setAppElement("#root");

  const addContainer = () => setAddContainerModalOpen(true);
  const inCompleteTasks = allTasks.filter(
    (task) => task.status === "incomplete"
  );
  const inProgressTasks = allTasks.filter((task) => task.status === "progress");
  const completedTasks = allTasks.filter((task) => task.status === "complete");
  return (
    <main className="pt-36 h-screen max-w-5xl mx-auto flex flex-col gap-12">
      <button
        onClick={addContainer}
        className="border font-bold bg-blue-300 p-2 rounded-md self-end"
      >
        Add Container
      </button>
      <div className="flex gap-4">
        <DragDropContext
          onDragEnd={(result) => console.log("Drag started", result)}
        >
          <VerticalCard name="to-do" tasks={inCompleteTasks} />
          <VerticalCard name="in progress" tasks={inProgressTasks} />
          <VerticalCard name="done" tasks={completedTasks} />
        </DragDropContext>
      </div>
      <ModalComponent
        isOpen={addContainerModalOpen}
        onRequestClose={onRequestModalClose}
        contentLabel="Add container"
      >
        <ContainerForm />
      </ModalComponent>
    </main>
  );
};

export default Dashboard;
