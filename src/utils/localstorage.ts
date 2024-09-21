import { IContainer } from "../types";

export const saveToLocalStorage = (containers: IContainer) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("containers", JSON.stringify(containers));
};
