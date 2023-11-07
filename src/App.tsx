import './App.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './reducers'
import { BsTrash3 } from 'react-icons/bs'

function App() {

  const dispatch = useDispatch();

  const todos: string[] = useSelector((state: RootState) => state.todos);

  const [todoValue, setTodoValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [num, setNum] = useState(1);


  const now = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let dayOfWeek = week[now.getDay()];
  const today = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  }

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", text: todoValue });
    setTodoValue("");
  }

  const deleteTodo = (e: any) => {
    dispatch({ type: "DELETE_TODO", text: todoValue });
  }
  
  useEffect(()=> {

  }, [isChecked])

  return (
    <div className="App">
      <div className="wrap">
        <h2>{today}</h2>
        <div className="week">{dayOfWeek}요일</div>
        <button className="deleteBtn" onClick={deleteTodo}><p>전체 삭제</p> <BsTrash3 /></button>
        <p></p>

        <div className="listBox">
          <ul className="list">
            {todos.map((todo, index) =>
              <div key={index}>
                <input type="checkbox" id={`check${index}`} />
                <label htmlFor={`check${index}`}></label>
                <li>{todo}</li>
                {/* <button>X</button> */}
              </div>
            )}
          </ul>
        </div>


        <form onSubmit={addTodo} >
          <input type="text" value={todoValue} onChange={handleChange} className="textInput" placeholder='할 일을 입력하세요'/>
          <input type="submit" value="+" className="submitBtn" />
        </form>   
      </div>
    </div>
  );
}

export default App;
