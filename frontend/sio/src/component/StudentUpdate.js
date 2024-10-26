import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { UPDATE_STUDENT, GET_ONE_STUDENT } from "../Configure";
import { useLocation } from "react-router-dom";
import { validateDOB, validateEmail, validateGender, validateName } from "../Validation";
import axios from "axios";

let UpdateStud = () => {

    const location = useLocation()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date_of_birth, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const token = JSON.parse(localStorage.getItem("token")).token;
    let {student_id} = location.state || {}

    useEffect( ()=> {

        const fetchData = () => {

            axios.get(GET_ONE_STUDENT+student_id, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then( (res) => {
                // console.log(res.data);
                let data = res.data;
                
                setName(data.name);
                setEmail(data.email);
                setDob(data.date_of_birth);
                setGender(data.gender);
                
                // console.log(data);
            })
            .catch( (err)=> {
                setError(err.response.data);
            })
        };
        fetchData();

    }, []);






    const handleSubmit = (e)=> {


        e.preventDefault();
        console.log("from form submit");
        let formdata = {name, email, date_of_birth, gender};
        console.log(formdata);

        if( !validateName(name) ) {
            setSuccess("");
            setError("Invalid student name");
        } else if( !validateEmail(email) ) {
            setSuccess("");
            setError("Invalid Email")
        } else if( !validateDOB(date_of_birth) ) {
            setSuccess("");
            setError("Invalid date of birth");
        } else if(!validateGender(gender)) {
            setSuccess("");
            setError("Invalid Gender");
        } else {


            axios.put(UPDATE_STUDENT+student_id, formdata, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            } )
            .then( (res)=> {
                console.log(res.data);
                setSuccess("Succefully updated !");
            })
            .catch( (err)=> {
                setError(err.response.data);
            })

        }
    }


    return (
        <>
        <Form className='form_container' onSubmit={handleSubmit}>

           <Form.Group className="mb-3" controlId="formGroupPassword">
               <Form.Label>Name</Form.Label>
               <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
           </Form.Group>


           <Form.Group className="mb-3" controlId="formGroupEmail">
               <Form.Label>Email address</Form.Label>
               <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
           </Form.Group>
           
           <Form.Group className="mb-3">
               <Form.Label for="dob">Date of Birth</Form.Label>
               <Form.Control type="date" class="form-control" id="dob" name="dob" value={date_of_birth} onChange={(e)=>{setDob(e.target.value)}} required></Form.Control>
           </Form.Group>

           <Form.Group as={Row} className="mb-3">
           <Form.Label as="legend" column sm={2}>
               Radios
           </Form.Label>

           <Col sm={10}>
               <Form.Check
                   type="radio"
                   label="Male"
                   name="formHorizontalRadios"
                   value="Male"
                   id="formHorizontalRadios1"
                   onChange={ (e)=> {setGender(e.target.value)}}
                   required
               />
               <Form.Check
               type="radio"
               label="Female"
               value="Female"
               name="formHorizontalRadios"
               id="formHorizontalRadios2"
               onChange={ (e)=> {setGender(e.target.value)}}
               required
               />
           </Col>
           </Form.Group>

           <Button type='submit' variant="success">Update</Button>

           {error && <p style={{color: 'red'}}>{error}</p>}
           {success && <p style={{color: 'green'}}>{success}</p>}

        </Form>
   </>

    );
}

export default UpdateStud;