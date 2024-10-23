import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './component/NavBar';
import MarkInput from './component/MarkInfo';
import StudInput from './component/StudentInfo';
import StudList from './component/StudentList';
import MList from './component/MarkList';
import UpdateStud from './component/StudentUpdate';
import UpdateMark from './component/MarkUpdate';

function App() {
  return (
   <Router>
    <NavBar/>
    <Routes>

      <Route exact path="/" element={<StudList/>} />
      <Route path="/student" element={<StudInput/>}  />
      <Route path="/mark" element={<MarkInput/> } />
      <Route path="/markList" element={<MList/>} />
      <Route path="/student/update" element={<UpdateStud/>} />
      <Route path="/mark/update" element={<UpdateMark/>} />

    </Routes>
   </Router>
  );
}

export default App;
