import { v4 as uuidv4 } from "uuid";

export const features = [
  {
    id: uuidv4(),
    header: "Multiple Containers",
    description:
      "Create and manage up to 6 containers for efficient task organization.",
    image: "./add-container.png",
  },
  {
    id: uuidv4(),
    header: "Edit Container",
    description:
      "Easily rename or delete containers to keep your workspace updated.",
    image: "./edit-container.png",
  },
  {
    id: uuidv4(),
    header: "Add Task",
    description: "Quickly add tasks with priority levels for better planning.",
    image: "./add-task.png",
  },
  {
    id: uuidv4(),
    header: "Edit Task",
    description:
      "Modify task details like name, description, and priority effortlessly.",
    image: "./edit-task.png",
  },
  {
    id: uuidv4(),
    header: "Reset Data",
    description:
      "Reset all containers and tasks with a single click to start fresh.",
    image: "./reset-data.png",
  },
  {
    id: uuidv4(),
    header: "Secure Authentication",
    description:
      "Keep your data safe with robust and secure authentication methods.",
    image: "./auth.png",
  },
];
