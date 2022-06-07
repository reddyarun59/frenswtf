import { Button } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Chats from './pages/Chats';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/chats" element={<Chats/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
