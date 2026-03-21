import { deleteTodoById, findAllTodos, findTodoById, insertTodo, updateTodoById } from "@/repositories/todo.repository";
import { Todo } from "@/types/todo.types";

export const getTodos = async () => {
  return await findAllTodos();
};

export const getTodoUsingId = async (id: string) => {
  return await findTodoById(id);
};

export const createTodo = async (todo: Todo) => {
  return await insertTodo(todo);
}

export const updateTodo = async (id: string, updatedFields: Partial<Todo>) => {
  return await updateTodoById(id, updatedFields);
}

export const deleteTodo = async (id: string) => {
  return await deleteTodoById(id);
}