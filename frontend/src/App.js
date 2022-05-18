import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddContact from './pages/AddContact/AddContact';
import UpdateContact from './pages/UpdateContact/UpdateContact';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/add' element={<AddContact />} />
          <Route path='/update-contact/:id' element={<UpdateContact />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
