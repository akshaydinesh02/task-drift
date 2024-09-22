import { ITaskContainer } from "../types";

export const saveToLocalStorage = (
  containers: Map<string, ITaskContainer>,
  uid: string
) => {
  if (typeof window === "undefined" || !containers || !uid) return;
  const containersArray = Array.from(containers.entries());
  localStorage.setItem(`containers-${uid}`, JSON.stringify(containersArray));
};

export const fetchDataFromLocalStorage = (uid: string) => {
  if (typeof window === "undefined" || !uid) return;
  const containers = localStorage.getItem(`containers-${uid}`);
  if (!containers) return null;
  const containersArray = JSON.parse(containers);
  return new Map(containersArray) as Map<string, ITaskContainer>;
};
