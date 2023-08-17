export const getItemFromLocalStorage = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null; }
export const setItemToLocalStorage = (key: string, value: any) => {localStorage.setItem(key, JSON.stringify(value));}


// import React, { useState, useEffect } from 'react\';
//  import { setItemToLocalStorage, getItemFromLocalStorage } from './utils';
// export const TodoList = () => {
//        const [todos, setTodos] = useState([]);
//           useEffect(() => {
//                  const storedTodos = getItemFromLocalStorage('todos');
//                setTodos(storedTodos || []);   }, []);
//                    const addTodo = (todo) => {
//                          setTodos([...todos, todo]);
//                          setItemToLocalStorage('todos', [...todos, todo]);   };
//                              const removeTodo = (index) => {
//                                      const newTodos = [...todos];
//                                           newTodos.splice(index, 1);
//                                                setTodos(newTodos);
//                                                     setItemToLocalStorage('todos', newTodos);   };
//                                                         return (
//                                                             <div>
//                                                                 <ul>
//                                                         {todos.map((todo, index) => (
//                                                                     <li key={index}>{todo}
//                                                                     <button onClick={() => removeTodo(index)}>Delete</button></li> 
//                                                                             ))}
//                                                                                     </ul>
//                                                                                             <form onSubmit={(e) => { e.preventDefault(); addTodo(e.target.todoInput.value); }}>
//                                                                                                         <input type="text" name="todoInput" />
//                                                                                                                 <button type="submit">Add</button>
//                                                                                                                        </form>
//                                                                                                                             </div>   ); }; 