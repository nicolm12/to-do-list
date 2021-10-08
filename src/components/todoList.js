import React,{useState,useEffect} from 'react'

import Form from './form'
import Todo from './todo.js';

function TodoList() {
    const [todos, setTodos]= useState([]);
    

    const addTodo = todo =>{
        if (!todo.text || /^\$*$/.test(todo.text)){
        return;

    }
    const newTodos=[todo, ...todos]

    setTodos(newTodos)
    
   
}




const removeTodo = id=>{
    const removeArray =[...todos].filter(todo => todo.id !==id)
    setTodos(removeArray)
}

const updateTodo = (todoId, newValue) =>{
    if (!newValue.text || /^\$*$/.test(newValue.text)){
        return;
    }
    setTodos(prev =>prev.map(item =>(item.id === todoId ? newValue : item))
    );
}


const completeTodo = id => {
    let updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodos);
  };








    return (
        <div className='todo-app'>
         
           <h1>MI TO DO LIST</h1>
          
          <Form onSubmit={addTodo}/>
          
         <Todo
        todos={todos}
        completeTodo ={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
       

          />
          
        </div>
    )
}

export default TodoList
