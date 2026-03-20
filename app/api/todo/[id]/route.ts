import { getTodoUsingId, updateTodo } from "@/services/todo.service";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  context: { params: { id: string } }
) => {
  const { id } = await context.params;

  const todo = await getTodoUsingId(id);

  if (!todo) {
    return NextResponse.json(
      { status: false, message: "Todo not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    status: true,
    data: todo,
  });
};

export const PUT = async (request: Request, context: { params: { id: string } }) => {
  const { title, description, completed } = await request.json();
  const { id } = await context.params;

  const todo = await getTodoUsingId(id);

  if (!todo) {
    return NextResponse.json({
      status: false,
      message: "Todo not found",
    }, { status: 404 });
  }

  const payload = {
    ...todo,
    ...(title && { title }),
    ...(description && { description }),
    ...(completed !== undefined && { completed }),
  };

  const updatedTodo = await updateTodo(id, payload);

  return NextResponse.json({
    status: true,
    message: "Todo updated successfully",
    data: updatedTodo
  })
}
