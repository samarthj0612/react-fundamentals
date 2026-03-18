import { fetchTodos } from "@/repositories/todo.repository";

export const getTodos = async () => {
  return await fetchTodos();
};