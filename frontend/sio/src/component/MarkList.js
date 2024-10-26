import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { GET_STUDENT_MARK_LIST, DELETE_ONE_MARK, SEND_EMAIL } from "../Configure";
import axios from "axios";
import { useLocation } from "react-router-dom";

let MList = () => {

    const location = useLocation();
    const token = JSON.parse(localStorage.getItem("token")).token;
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [data, setData] = useState([]);
    const { student_id } = location.state || {}
    const navigate = useNavigate();

    useEffect( ()=> {       

        const fetchData = () => {

            axios.get(GET_STUDENT_MARK_LIST+student_id, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then( (res) => {
                
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

        axios.delete(DELETE_ONE_MARK+id, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then( () => {
            setSuccess("Deleted successfully !");
            setData( (oldData) => oldData.filter( (item) => item._id !== id));
            
        })
        .catch( (err) => {
            setSuccess("");
            setError(err.response.data);
        })
    }

    const handleUpdate = (mark_id)=> {

        navigate("/mark/update", {state: {mark_id}});
    }

    const handleSendEmail = (mark_id) => {
        
        axios.post(SEND_EMAIL+mark_id, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then( ()=> {
            setError("");
            setSuccess("Email sended successfully !");

        })
        .catch( (err)=> {
            setSuccess("");
            setError(err.response.data);
        })
    }


    return (
        <Table responsive striped bordered hover>
            
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Math</th>
            <th>Physics</th>
            <th>Chemistry</th>
            <th>Total</th>
            <th>Average</th>
            <th></th>
            <th></th>
          </tr>
          {error &&
          <tr>

              <th colSpan={9}><p style={{color: "red", textAlign: "center"}}>{error}</p></th>
              
          </tr>
          
          }

        {success &&
          <tr>

              <th colSpan={9}><p style={{color: "green", textAlign: "center"}}>{success}</p></th>
              
          </tr>
          
          }


        </thead>
        <tbody>
          { data.map( (item, index) => (
  
          <tr key={index}>     
              <td>{index+1}</td>
              <td>{item.math}</td>
              <td>{item.physics}</td>
              <td>{item.chemistry}</td>
              <td>{item.total}</td>
              <td>{item.average}</td>
  
              <td><Button variant="warning" onClick={ ()=> handleUpdate(item._id)} >Update</Button></td>
              <td><Button variant="danger" onClick={ ()=>handleDelete(item._id) } >Delete</Button></td>
              <td><Button variant="primary" onClick={ ()=>handleSendEmail(item._id) } >Send Email</Button></td>

          </tr>
  
           ))}
        
        </tbody>
        
      </Table>
    );
}

export default MList;