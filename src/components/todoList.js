import React,{useState} from 'react'

import Form from './form'
import Todo from './todo.js';

function TodoList() {
    const [todos, setTodos]= useState([]);
    const [searchNote, setSearchNote] = useState("");


    const addTodo = todo =>{
        if (!todo.text || /^\$*$/.test(todo.text)){
        return;

    }
    const newTodos=[todo, ...todos]

    setTodos(newTodos)
    
   
}
const inputChange = (e) => setSearchNote(e.target.value);



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
  const filterNote = async(objNote, searchNote) => {
   
      const notaFiltradaByTitle = await objNote.filter(list=>list.text.toLowerCase().includes(searchNote.toLowerCase()))
      // console.log(objNote,"esto es obj")
      // (nota => nota.value.toLowerCase().includes(searchNote.toLowerCase()))
      setTodos(notaFiltradaByTitle)
      // console.log(nota)
  
}
filterNote(todos,searchNote)

    return (
        <div className='todo-app'>
          <input type="text" placeholder="Buscar mi nota"  
            value={searchNote} onChange={inputChange} />
          <button type="button" onClick={filterNote}><i className="fas fa-search"></i></button>


           <h1>que vamos hacer hoy</h1>
          
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
