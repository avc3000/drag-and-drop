import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const OnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add, active = todos, complete = completedTodos;

    if (source.droppableId === 'TodoList' && active[source.index].isDone === true) {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === 'TodoListRemove' && complete[source.index].isDone === false) {
      add = complete[source.index];
      complete.splice(source.index, 1);
    } else {
      return;
    }

    if (destination.droppableId === 'TodoList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete.length > 0 ? complete : []);
    setTodos(active.length > 0 ? active : []);
  };

  return (
    <DragDropContext onDragEnd={OnDragEnd}>
      <div className="App">
        <span className='heading'>Tareas</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>
  );
}

export default App;
