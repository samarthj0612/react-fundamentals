import { mockTodos } from "@/mocks/todo.mock";
import { getTodos } from "@/services/todo.service";
import { ApiResponse } from "@/types/api.types";
import { Todo } from "@/types/todo.types";
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid';

export const GET = async () => {
  const todos = await getTodos();

  return NextResponse.json<ApiResponse<Todo[]>>({
    status: true,
    message: "All todos retrieved successfully",
    data: todos,
  })
}

export const POST = async (request: Request) => {
  const { title, description } = await request.json();

  if (!title || !description) {
    return NextResponse.json(
      { status: false, message: "Title and description are required" },
      { status: 400 }
    );
  }

  const newTodo: Todo = {
    id: uuidv4(),
    title,
    description,
    completed: false,
  };

  mockTodos.push(newTodo);

  return NextResponse.json<ApiResponse<Todo>>({
    status: true,
    message: "Todo created successfully",
    data: newTodo
  })
}

