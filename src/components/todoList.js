import React, { useState, useEffect, Component } from 'react'
import { unmountComponentAtNode } from 'react-dom';

import Form from './form'
import Todo from './todo.js';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [searchNote, setSearchNote] = useState("");
  const [lista,setLista]=useState('')


  const addTodo = todo => {
    
    // console.log(/^\$*$/.test(todo.text))
    if (!todo.text || /^\$*$/.test(todo.text)) {
     
      return;

    }
    const newTodos = [todo, ...todos]

    setTodos(newTodos)
    console.log(newTodos)


  }


  const removeTodo = id => {
    const removeArray = [...todos].filter(todo => todo.id !== id)
    setTodos(removeArray)
  }

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\$*$/.test(newValue.text)) {
      return;
    }
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item))
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
  

const onChange= async e =>{
  e.persist();
  await setSearchNote(e.target.value)
  console.log(searchNote)
}
const filterNote =( ) => {
  const notaFiltradaByTitle = todos.filter(list =>{
      if (list.text.toString().includes(searchNote)){
       return list
      }
    })
    setSearchNote({lista:notaFiltradaByTitle})
  }


  useEffect(()=>{
    setSearchNote({lista:todos})
  },[]);

    
  
    
    
       
  
  // } 
  // filterNote( addTodo(todos), searchNote)



  return (
    <div className='todo-app'>
      
            
      <div className="barraBusqueda">
            <input
              type="text"
              placeholder="Buscar"
              className="textField"
              name="busqueda"
              value={searchNote}
              onChange={onChange}
              
              
            />
              <button type="button" onClick={filterNote}><i className="fas fa-search"></i></button>
           
          </div>
      {/* <div><input type="text" placeholder="Buscar mi nota"
        value={searchNote} onChange={inputChange} onKeyUp={ filterNote} />
      </div> */}

      {/* <button type="button" onClick= ><i className="fas fa-search"></i></button> */}


      <h1>que vamos hacer hoy</h1>

      <Form onSubmit={addTodo} />

      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}


      />

    </div>
  )
}

export default TodoList
