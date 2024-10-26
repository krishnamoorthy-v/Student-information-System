import React, { useEffect, createContext, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, json } from 'react-router-dom';
import NavBar from './component/NavBar';
import MarkInput from './component/MarkInfo';
import StudInput from './component/StudentInfo';
import StudList from './component/StudentList';
import MList from './component/MarkList';
import UpdateStud from './component/StudentUpdate';
import UpdateMark from './component/MarkUpdate';
import Login from './component/Login';
import Signup from './component/Signup';
import { useState } from 'react';

const authenticatorContext = createContext("");

function App() {


  const [ isauthenticated, setAuthenticated] = useState( ()=> JSON.parse(localStorage.getItem("isauthenticated")) || false );

  useEffect( ()=> {
    localStorage.setItem("isauthenticated", JSON.stringify(isauthenticated));
    if(!isauthenticated) {
      console.log("user is not authenticated.");
    } else {
      console.log("user is authenticated.");
    }
  }, [isauthenticated]);


  return (
    <authenticatorContext.Provider value={{ isauthenticated, setAuthenticated }} >
      <Router>
        <NavBar/>
        <Routes>
        
          <Route exact path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          {isauthenticated ?(
            <>
              <Route path="/" element={<StudList/>} />
              <Route path="/student" element={<StudInput/>}  />
              <Route path="/mark" element={<MarkInput/> } />
              <Route path="/markList" element={<MList/>} />
              <Route path="/student/update" element={<UpdateStud/>} />
              <Route path="/mark/update" element={<UpdateMark/>} />
            </>
        ):(
          
          <Route path="/*" element={<Navigate to="/login" replace />} />
        )
      }
        </Routes>
      </Router>
    </authenticatorContext.Provider>
  );
}

export {App, authenticatorContext};
