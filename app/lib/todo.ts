
import type {
  CreateTodoInput,
  Todo,
  TodoPriority,
  UpdateTodoInput,
} from "../types/todo";

import {
  ObjectId,
  type Document,
  type WithId,
} from "mongodb";

import { getTodoCollection } from "./db";


type TodoSearchFilters = {
  search?: string;
  status?: "all" | "completed" | "pending";
};


function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}


function mapTodo(todo: WithId<Document>): Todo {
  const createdAt =
    todo.createdAt instanceof Date
      ? todo.createdAt.toISOString()
      : typeof todo.createdAt === "string"
        ? todo.createdAt
        : new Date().toISOString();

  const updatedAt =
    todo.updatedAt instanceof Date
      ? todo.updatedAt.toISOString()
      : typeof todo.updatedAt === "string"
        ? todo.updatedAt
        : undefined;

  const priority: TodoPriority =
    todo.priority === "low" ||
    todo.priority === "medium" ||
    todo.priority === "high"
      ? todo.priority
      : "medium";

  return {
    _id: todo._id.toString(),
    title: typeof todo.title === "string" ? todo.title : "",
    completed:
      typeof todo.completed === "boolean"
        ? todo.completed
        : false,
    priority,
    createdAt,
    updatedAt,
  };
}


export async function fetchTodos(
  filters: TodoSearchFilters = {}
): Promise<Todo[]> {
  try {
    const collection = await getTodoCollection();

    const query: {
      title?: { $regex: string; $options: "i" };
      completed?: boolean;
    } = {};

    const search = filters.search?.trim();

    // Search: cinwaanka Todo-ga
    if (search) {
      query.title = {
        $regex: escapeRegex(search),
        $options: "i",
      };
    }

   
    if (filters.status === "completed") {
      query.completed = true;
    } else if (filters.status === "pending") {
      query.completed = false;
    }

    const todos = await collection.find(query).toArray();

    return todos.map(mapTodo);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}


export async function fetchTodoById(
  id: string
): Promise<Todo | null> {
  try {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const collection = await getTodoCollection();

    const todo = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!todo) {
      return null;
    }

    return mapTodo(todo);
  } catch (error) {
    console.error("Error fetching todo by id:", error);
    return null;
  }
}

// Samee Todo cusub
export async function createTodo(
  todo: CreateTodoInput
): Promise<string | null> {
  try {
    const collection = await getTodoCollection();

    const priority: TodoPriority =
      todo.priority ?? "medium";

    const newTodo = {
      title: todo.title.trim(),
      completed: todo.completed ?? false,
      priority,
   createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newTodo);

    return result.insertedId.toString();
  } catch (error) {
    console.error("Error creating todo:", error);
    return null;
  }
}


export async function updateTodo(
  id: string,
  todo: UpdateTodoInput
): Promise<boolean> {
  try {
    if (!ObjectId.isValid(id)) {
      return false;
    }

    const collection = await getTodoCollection();

    const updates: {
      updatedAt: Date;
      title?: string;
      completed?: boolean;
      priority?: TodoPriority;
    } = {
      updatedAt: new Date(),
    };

    if (todo.title !== undefined) {
      updates.title = todo.title.trim();
    }

    if (todo.completed !== undefined) {
      updates.completed = todo.completed;
    }

    if (todo.priority !== undefined) {
      updates.priority = todo.priority;
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    return result.matchedCount > 0;
  } catch (error) {
    console.error("Error updating todo:", error);
    return false;
  }
}

// Tirtir Todo
export async function deleteTodo(
  id: string
): Promise<boolean> {
  try {
    if (!ObjectId.isValid(id)) {
      return false;
    }

    const collection = await getTodoCollection();

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return false;
  }
}
