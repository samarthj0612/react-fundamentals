import { getTodos } from "@/services/todo.service";
import { ApiResponse } from "@/types/api.types";
import { Todo } from "@/types/todo.types";
import { NextResponse } from "next/server"

export const GET = async () => {
  const todos = await getTodos();

  return NextResponse.json<ApiResponse<Todo[]>>({
    status: true,
    message: "All todos retrieved successfully",
    data: todos,
  })
}

