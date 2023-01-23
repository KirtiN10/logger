import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import LoggerTable from './components/LoggerTable';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exect element={< LoggerTable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
