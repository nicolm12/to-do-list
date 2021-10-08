import React, { useState, useRef, useEffect } from 'react'
import { FaCat } from 'react-icons/fa'

function Form(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [bred, setBreed] = useState({
        value: ''
    }

    )

    const handleChange = e => {
        setInput(e.target.value)
    }

    //utilice fetch para traer la data de la api
    const list = () => {

        fetch(`https://catfact.ninja/facts?limit=${bred}`)
            .then(res => res.json())
            .then((result) => {
                result.data.forEach(element => {
                    console.log("element", element)
                    props.onSubmit({
                        id: Math.floor(Math.random() * 10000),
                        text: element.fact
                    })

                });
                setIsLoaded(true);
                setItems(result.data);
                // console.log(result.data)

            },
                (error) => {
                    console.log(error)
                    setIsLoaded(true);
                    setError(error);
                }
            )

    }
    //esta constante permite que el numero del id de cada todo sea aleatorio y variado

    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        });
        setInput('')
    };



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

                    />
                    <button onClick={handleSubmit} className="button">Editar</button>

                </>
            ) : (
                <>
                    <div className="cats">
                        <input type='number' className="input-cats" onChange={event => setBreed(event.target.value)} />
                        <button className="button-cats" onClick={list}><FaCat className="icon-cat"></FaCat></button>


                    </div>

                    <input
                        type="text"
                        placeholder="Añadir tarea"
                        value={input}
                        name="text"
                        className="input "
                        onChange={handleChange}

                    />
                    <button onClick={handleSubmit} className="button">Añadir tarea</button>



                </>
            )}







        </form>

    )
}

export default Form
