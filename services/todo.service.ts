import { findAllTodos, findTodoById, updateTodoById } from "@/repositories/todo.repository";
import { Todo } from "@/types/todo.types";

export const getTodos = async () => {
  return await findAllTodos();
};

export const getTodoUsingId = async (id: string) => {
  return await findTodoById(id);
};

export const updateTodo = async (id: string, updatedFields: Partial<Todo>) => {
  return await updateTodoById(id, updatedFields);
}
