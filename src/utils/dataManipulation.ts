import { ITaskContainer } from "../types";

export function removeContainerById(
  containers: Map<string, ITaskContainer>,
  containerId: string
): void {
  containers.delete(containerId);
}

export function removeTaskFromContainer(
  containers: Map<string, ITaskContainer>,
  containerId: string,
  taskId: string
): Map<string, ITaskContainer> | void {
  const container = containers.get(containerId);

  if (!container || !container.tasks) return;

  const taskIndex = container.tasks.findIndex((task) => task.id === taskId); // O(n)

  if (taskIndex === -1) return;

  container.tasks.splice(taskIndex, 1);

  // If no tasks left, delete the container
  // if (container.tasks.length === 0) {
  //   containers.delete(containerId); // Mutates the original Map (O(1))
  // } else {
  // update container in Map
  containers.set(containerId, container); // O(1)
  // }
  return containers;
}
