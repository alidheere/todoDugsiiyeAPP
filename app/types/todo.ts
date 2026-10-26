
export type TodoPriority = "low" | "medium" | "high";

export type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  priority: TodoPriority;
  createdAt: string;
  updatedAt?: string;
};

export type CreateTodoInput = {
  title: string;
  completed?: boolean;
  priority?: TodoPriority;
};

export type UpdateTodoInput = {
  title?: string;
  completed?: boolean;
  priority?: TodoPriority;
};

export type TodoFormValues = {
  title: string;
  priority: TodoPriority;
};

export type TodoFormState =
  | {
      status: "idle";
      message: "";
      values: TodoFormValues;
    }
  | {
      status: "error" | "success";
      message: string;
      values: TodoFormValues;
    };
