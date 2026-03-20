import clientPromise from "@/lib/db";
import { Todo } from "@/types/todo.types";

const client = await clientPromise;
const db = client.db("react-fundamentals");
const collection = db.collection<Todo>("todos");

export const findAllTodos = async () => {
  const data = await collection.find().toArray();

  return data;
};

export const findTodoById = async (id: string) => {
  const todo = await collection.findOne({ id });

  return todo;
}

export const updateTodoById = async (id: string, updatedFields: Partial<Todo>) => {
  const result = await collection.findOneAndUpdate(
    { id },
    { $set: updatedFields },
    { returnDocument: "after" }
  );
  return result;
}
