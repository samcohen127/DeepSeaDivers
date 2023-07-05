import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home'/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
