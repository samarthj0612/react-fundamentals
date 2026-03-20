"use client"

import api from '@/lib/axios';
import { Todo } from '@/types/todo.types';
import { Circle, CircleCheck } from 'lucide-react';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';

const page = () => {
  const [todo, settodo] = useState<Todo | null>(null)
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { id } = useParams();

  useEffect(() => {
    if(id && typeof id === "string"){
      fetchTodo(id);
    }
  }, [id])
  
  const fetchTodo = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/todo/${id}`);
      const data = await response.data;

      if(data?.status && data.data){
        settodo(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setIsLoading(false);
    }
  }

  const toggleCompletion = async () => {
    if(!todo) return;

    try {
      const response = await api.put(`/todo/${todo.id}`, {
        completed: !todo.completed,
      });

      const data = await response.data;

      if(data?.status && data.data){
        settodo(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  }

  if(isLoading){
    return <p>Loading...</p>
  }

  if(!todo){
    return null;
  }

  return (
    <div className='w-full'>
      <div className='flex items-center gap-2'>
        <h2 className='font-bold'>{todo?.title}</h2>

        <span className='cursor-pointer' onClick={toggleCompletion} onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {todo?.completed || isHovered ? <CircleCheck size={20} color='green' /> : <Circle size={20} />}
        </span>
      </div>
      <p>{todo?.description}</p>
    </div>
  )
}

export default page