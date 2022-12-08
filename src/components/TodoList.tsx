import React from 'react';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import "./styles.css";
import { Droppable } from 'react-beautiful-dnd';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
  return (
    <div className='container'>
      <Droppable droppableId='TodoList'>
        {
          (provided, snapshot) => (
            <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className='todos_heading'>Tareas Activas</span>
              {
                todos.map((todo, index) => (
                  <SingleTodo index={index} todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
                ))
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
      <Droppable droppableId='TodoListRemove'>
        {
          (provided, snapshot) => (
            <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>
              <span className='todos_heading'>Tareas Completadas</span>
              {
                completedTodos.map((todo, index) => (
                  <SingleTodo index={index} todo={todo} key={todo.id} todos={completedTodos} setTodos={setCompletedTodos} />
                ))
              }
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </div>
  )
}

export default TodoList;