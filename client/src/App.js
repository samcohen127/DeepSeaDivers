import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './components/Form';
import DiveList from './components/DiveList';
import EditForm from './components/EditForm';
import DiveDetails from './components/DiveDetails';

function App() {
  return (
    <div className="App " >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DiveList />} />
          <Route path='/form' element={<Form />} />
          <Route path='/divePage/:id' element={<DiveDetails />} />
          <Route path='/edit/:id' element={<EditForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
