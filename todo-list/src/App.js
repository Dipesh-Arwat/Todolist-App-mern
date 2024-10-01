import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoApp from './components/TodoApp/TodoApp';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';

function App() {
  // const isAuthenticated = !!localStorage.getItem('token');
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" render={() => (isAuthenticated ? <Navigate to="/todo" /> : <Navigate to="/login" />)} />
        <Route path="/" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/todo" render={() => (isAuthenticated ? <TodoApp /> : <Navigate to="/login" />)} /> */}

        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<TodoApp/>} />
      </Routes>
    </Router>
  );
}

export default App;
