"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { ApiResponse } from "@/types/api.types";
import { Todo } from "@/types/todo.types";

// 🔹 Fetch function (separate = best practice)
const fetchTodos = async (): Promise<ApiResponse<Todo[]>> => {
  const response = await axios.get("/api/todo");
  return response.data;
};

const Page = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 60 * 5, // 5 min cache
    retry: 1,
  });

  // 🔹 Loading state
  if (isLoading) {
    return <div>Loading todos...</div>;
  }

  // 🔹 Error state
  if (isError) {
    return (
      <div>
        <p>Something went wrong</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="mb-4">Todos</h1>

      {/* 🔹 Background refetch indicator */}
      {isFetching && <p>Refreshing...</p>}

      <ul>
        {data?.data?.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }} className="border p-4 rounded">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.completed ? "✅ Done" : "❌ Pending"}</p>
          </li>
        ))}
      </ul>

      {/* 🔹 Manual refetch */}
      <button onClick={() => refetch()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Refetch Todos
      </button>
    </div>
  );
};

export default Page;