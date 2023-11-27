import { LoginData, Task, UserData } from "../interfaces/interfaceProps";

export const initialLoginData: LoginData = { username: "", password: "" };

export const initialTaskValues: Task = {
  _id: "",
  title: "",
  description: "",
  dueDate: new Date(),
  status: "pending",
};

export const initialUserData: UserData = { username: "", password: "" };
