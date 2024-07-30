

//-----------
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  timestamp: string;
  priority: number;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/todos')
      .then(response => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setLoading(false);
      });
  }, []);

  const prioritizeTodos = () => {
    const prioritized = [...todos].sort((a, b) => b.priority - a.priority);
    setSortedTodos(prioritized);
  };

  const getPriorityStyle = (priority: number) => {
    let color;
    if (priority === 5) color = 'red';
    if (priority === 4 || priority === 3) color = 'brown';
    if (priority === 2 || priority === 1) color = 'green';
    return {
      color: color,
      fontWeight: 'bold',
      fontSize: '1.2em'
    };
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Team Dashboard</h1>
        <button onClick={prioritizeTodos}>Prioritize</button>
      </div>

       {todos.length === 0 ? (
        <div className="text-center text-gray-500">No items yet, wait for Manager</div>
      ) : (



      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {(sortedTodos.length > 0 ? sortedTodos : todos).map(todo => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{new Date(todo.timestamp).toLocaleString()}</td>
                <td style={getPriorityStyle(todo.priority)}>{todo.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default App;
