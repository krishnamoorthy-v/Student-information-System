import axios from 'axios';
import React from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { ADD_STUDENT_MARK } from '../Configure';
import { useState } from 'react';


const MarkInput = () => {

    const location = useLocation();

    const { student_id } = location.state || {}
    const token = JSON.parse(localStorage.getItem("token")).token;
    const [math, setMath] = useState("");
    const [physics, setPhysics] = useState("");
    const [chemistry, setChemistry] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("from form submit");
        let formdata = {student: student_id, math, physics, chemistry };
        console.log(formdata);

        if(math < 0 && math >100) {
            setSuccess("");
            setError("Invalid math mark");
        } else if(physics < 0 && physics > 100) {
            setSuccess("");
            setError("Invalid physics mark");
        } else if(chemistry < 0 && chemistry > 100) {
            setSuccess("");
            setError("Invalid chemistry mark");
        } else {
            axios.post(ADD_STUDENT_MARK, formdata, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res);
                setError("");
                setSuccess("successfully");
            }).catch( (err) => {
                setSuccess("");
                setError(err.response.data)
            })
        }

    }

    return (
        
             <Form className='form_container' onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formGroupNumber">
                    <Form.Label>Math</Form.Label>
                    <Form.Control type="Number" placeholder="Enter Math Score" value={math} onChange={ (e)=> {setMath(e.target.value)}} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupNumber">
                    <Form.Label>Physics</Form.Label>
                    <Form.Control type="Number" placeholder="Enter Physics Score" value={physics} onChange={ (e)=> {setPhysics(e.target.value)}} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupNumber">
                    <Form.Label>Chemistry</Form.Label>
                    <Form.Control type="Number" placeholder="Enter Chemistry Score" value={chemistry} onChange={ (e)=> {setChemistry(e.target.value)}} required />
                </Form.Group>


                <Button type='submit' variant="success">Add Mark</Button>

        
                {error && <p style={{color: 'red'}}>{error}</p>}
                {success && <p style={{color: 'green'}}>{success}</p>}

            </Form>

        
        

    );
};

export default MarkInput;