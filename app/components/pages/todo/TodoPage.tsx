"use client";

import api from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";
import { Todo } from "@/types/todo.types";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const router = useRouter();

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

  const clickHandler = (id: string) => {
    if(router){
      router.push(`/todo/${id}`);
    }
  }

  const deleteHandler = async (id: string) => {
    if(!id){
      console.error("Todo id is required for deletion");
      return;
    }

    try {
      const response = await api.delete(`/todo/${id}`);
      
      if(response?.data?.status){
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      } else {
        console.error("Failed to delete todo:", response?.data?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  return (
    <div>
      <div className="flex flex-col flex-wrap gap-4">
        {todos.map((todo: Todo) => (
          <div key={todo.id} className="flex items-center border border-black/20 p-4 rounded-sm cursor-pointer transition-all hover:shadow-lg">
            <div className="flex-1" onClick={() => clickHandler(todo.id)}>
              <h3>{todo.title}</h3>
              <p className="text-sm line-clamp-2">{todo.description}</p>
            </div>

            <span className="p-2 rounded-full transition-all cursor-pointer hover:bg-gray-200" onClick={() => deleteHandler(todo.id)}>
              <Trash size={20} className=""/>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoPage