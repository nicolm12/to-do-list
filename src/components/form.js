import React, { useState, useRef, useEffect } from 'react'
import {FaCat} from 'react-icons/fa'

function Form(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [bred, setbreed] = useState({
        value:''
    }

    )


    const inputRef = useRef(null)

    // useEffect(() => {
    //     inputRef.current.focus()
    // })
    const handleChange = e => {
        setInput(e.target.value)
    }
    const list = () => {

        const i = items.sort(() => Math.random() - 0.5)
        const finalList = i.slice(0, bred)
        const t = finalList.map(item => (
           setbreed(item.breed)
          

        )) 
    }


    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        });
         setInput(bred)
    };
    useEffect(() => {
        fetch("https://catfact.ninja/breeds?limit=1")
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setItems(result.data);

            },
                (error) => {
                    console.log(error)
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
 

    return (
        
        <form className="todo-form" onSubmit={handleSubmit}>
            {props.edit ? (
                <>

                    <input
                        type="text"
                        placeholder="editar tarea"
                        value={input}
                        name="text"
                        className="input edit"
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button onClick={handleSubmit} className="button">Editar</button>

                </>
            ) : (
                <>
                <div className="cats"> 
                    <input type='number' className="input-cats" onChange={event => setbreed(event.target.value)} />
                    <button className="button-cats"  onClick={list}><FaCat className="icon-cat"></FaCat></button>
                   
                    
                    </div>
                   
                    <input
                        type="text"
                        placeholder="Añadir tarea"
                        value={input}
                        name="text"
                        className="input "
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button onClick={handleSubmit} className="button">Añadir tarea</button>



                </>
            )}







        </form>

    )
}

export default Form
