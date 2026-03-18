"use client";

import { ApiResponse } from "@/types/api.types";
import { Todo } from "@/types/todo.types";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodos();

        if (data.status) {
          setTodos(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };

    fetchData();
  }, []);

  async function getTodos(): Promise<ApiResponse<Todo[]>> {
    const res = await fetch("/api/todo", {
      cache: "no-store",
    });

    return res.json();
  }

  const clickHandler = () => {
    alert("Todo item clicked");
  }

  const deleteHandler = () => {
    alert("Delete handler called");
  }

  return (
    <div>
      <div className="flex flex-col flex-wrap gap-4">
        {todos.map((todo: Todo) => (
          <div key={todo.id} className="flex items-center border border-black/20 p-4 rounded-sm cursor-pointer transition-all hover:shadow-lg">
            <div className="flex-1" onClick={clickHandler}>
              <h3>{todo.title}</h3>
              <p className="text-sm">{todo.description}</p>
            </div>

            <span className="p-2 rounded-full transition-all cursor-pointer hover:bg-gray-200" onClick={deleteHandler}>
              <Trash size={20} className=""/>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoPage