"use client";

import { useRouter } from "next/navigation";

const NewTodoPage = () => {
  const router = useRouter();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const description = formData.get("description");

    if(title && description){
      createTodo(title.toString(), description.toString());
    } else {
      alert("Please fill in all fields");
    }
  }

  const createTodo = async (title: string, description: string) => {
    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();

      if (data.status) {
        alert("Todo created successfully");
        router.push("/todo");
      } else {
        alert("Failed to create todo: " + data.message);
      }
    } catch (error) {
      console.error("Something went wrong", error);
      alert("An error occurred while creating the todo");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4">
        Create new todo page
      </h2>

      <form className="flex flex-col justify-center w-full md:w-lg" onSubmit={submitHandler}>
        <input type="text" name="title" placeholder="Title" className="border border-gray-300 rounded-md p-2 mb-4 w-full" />
        <textarea name="description" placeholder="Description" className="border border-gray-300 rounded-md p-2 mb-4 w-full" rows={4}></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600">Create Todo</button>
      </form>
    </div>
  )
}

export default NewTodoPage