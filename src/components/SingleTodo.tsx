import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone, MdRemoveDone } from 'react-icons/md';
import './styles.css';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(todo.todo);

  const handleDone = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone} : todo));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todos.map((todo) => (
      todo.id === id ? {...todo, todo: editTodo}: todo
    )));
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);  

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
          <form className={`todos_single ${snapshot.isDragging ? "drag" : ""}`} onSubmit={(e) => handleEdit(e, todo.id)} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {
              edit ? (<input type='text' placeholder={''} ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className='todos_single_text' />) :
              todo.isDone ? (<span className='todos_single_text'>{todo.todo}</span>) : (<span className='todos_single_text'>{todo.todo}</span>)
            }      
            <div>
              <span className='icon' onClick={() => { if (!edit && !todo.isDone) setEdit(!edit); }}><AiFillEdit /></span>
              <span className='icon'><AiFillDelete onClick={() => handleDelete(todo.id)} /></span>
              <span className='icon' onClick={() => handleDone(todo.id)}>{todo.isDone ? <MdRemoveDone /> : <MdDone />}</span>
            </div>
          </form>
        )
      }
    </Draggable>
  )
}

export default SingleTodo;