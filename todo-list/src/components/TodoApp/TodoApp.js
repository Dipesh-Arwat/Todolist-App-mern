import React, { useState, useEffect } from 'react';
import './Todo.css';
import axios from 'axios';
import icon from '../assets/icon.png';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/todos'; // Your API endpoint

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  
  const navigate = useNavigate();

  // Function to load tasks from the API
  const loadTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  useEffect(() => {

    // Load tasks on component mount
    loadTasks();

  }, []);

  // Function to add a new task
  const addTask = async () => {
    if (input.trim() === '') {
      alert('You must write something');
    } else {
      try {
        const newTask = { text: input, completed: false };
        const response = await axios.post(API_URL, newTask);
        setTasks([...tasks, response.data]);
        setInput('');
      } catch (error) {
        console.error('Error adding task', error);
      }
    }
  };

  // Function to toggle task completion
  const toggleTask = async (id, completed) => {
    try {
      const updatedTask = { completed: !completed };
      await axios.put(`${API_URL}/${id}`, updatedTask);
      loadTasks(); // Reload tasks after updating
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      loadTasks(); // Reload tasks after deletion
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };


  // Logout function
  const handleLogout = () => {

    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="container">
      {/* Logout button */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
     
      <div className="todo-app">
        <h2>
          To-Do List <img src={icon} alt="" />
        </h2>


        <div className="row">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add your text"
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul id="list-container">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={task.completed ? 'checked' : ''}
              onClick={() => toggleTask(task._id, task.completed)}
            >
              {task.text}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task._id);
                }}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
