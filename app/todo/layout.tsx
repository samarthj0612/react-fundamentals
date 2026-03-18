"use client"

import { PropsWithChildren } from "react"

const TodoLayout = ({ children }: PropsWithChildren) => {
  const addTodoHandler = () => {
    // Navigate to the add todo page
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center  mb-8">
        <div>
          <h1 className="text-2xl font-bold">Todo List</h1>
          <p className="text-gray-600">Manage your tasks effectively</p>
        </div>

        <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600" onClick={addTodoHandler}>
          Add Todo
        </button>
      </div>
      
      <div>
        {children}
      </div>
    </div>
  )
}

export default TodoLayout