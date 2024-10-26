import React from "react";
import { Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { GET_ALL_STUDENT, DELETE_ONE_STUDENT } from "../Configure";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let StudList = () => {

    const token = JSON.parse(localStorage.getItem("token")).token;
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect( ()=> {

        const fetchData = () => {
            // console.log(token);
            axios.get(GET_ALL_STUDENT, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then( (res) => {
                // console.log(res.data);
                setData(res.data);
                // console.log(data);
            })
            .catch( (err)=> {
                setError(err.response.data);
            })
        };
        fetchData();

    }, []);

  

    const handleDelete = (id)=> {

        axios.delete(DELETE_ONE_STUDENT+id, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then( (res) => {
            setData( (oldData) => oldData.filter( (item) => item._id !== id))
        })
        .catch( (err) => {
            setError(err.response.data);
        })
    }

    const handleUpdate = (student_id) => {
        navigate("/student/update", {state: {student_id}});
    }

    const handleAddMark = (student_id) => {
        console.log(student_id);
        navigate('/mark', {state: {student_id} } );
    }

    const handleMarkView = (student_id) => {
        navigate('/marklist', {state: {student_id} } );
    }

    const formatDate = (dob) => {
        const date = new Date(dob);
        const year = date.getFullYear();
        const month=String(date.getMonth()+1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    return (
        <Table responsive striped bordered hover>
            
      <thead>
        <tr>
          <th>S.NO</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>DOB</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        {error &&
        <tr>
         
            <th colSpan={8}><p style={{color: "red", textAlign: "center"}}>{error}</p></th>
            
        </tr>
        
        }

      </thead>
      <tbody>
        {data.map( (item, index) => (

        <tr key={index}>     
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>{ formatDate(item.date_of_birth)  }</td>

            <td><Button variant="warning" onClick={ ()=> handleUpdate(item._id)}>Update</Button></td>
            <td><Button variant="danger" onClick={ ()=>handleDelete(item._id) }>Delete </Button></td>
            <td><Button variant="success" onClick={ ()=>handleAddMark(item._id) } >Add Mark </Button></td>
            <td><Button variant="primary" onClick={ ()=>handleMarkView(item._id) } >View Mark </Button></td>
        </tr>

         ))}
      
      </tbody>
      
    </Table>
    );

}


export default StudList;