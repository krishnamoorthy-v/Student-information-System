import React, {useState} from 'react';
import FooterNav from './FooterNav';
import {Form, Row, Col, Button} from 'react-bootstrap'
import axios from 'axios';
import { validateDOB, validateEmail, validateGender, validateName } from '../Validation';
import { ADD_STUDENT } from '../Configure';

const StudInput = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date_of_birth, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("from form submit");
        let formdata = {name, email, date_of_birth, gender};
        console.log(formdata);
        if(!validateName(name) ) {
            setSuccess("");
            setError("Invalid student name");
        } else if(!validateEmail(email)) {
            setSuccess("");
            setError("Invalid Email")
        } else if(!validateDOB(date_of_birth)) {
            setSuccess("");
            setError("Invalid date of birth");
        } else if(!validateGender(gender)) {
            setSuccess("");
            setError("Invalid Gender");
        } else {
       
            axios.post(ADD_STUDENT, formdata)
            .then( (res)=> {
                setError("");
                setSuccess("Submitted!");
                // console.log(res);
            }).catch( (err)=> {
                setSuccess("");
                setError(err.response.data);
                // console.error("Error while adding student: "+err.response.data);
            })
        
        }
    };

    return (
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

                <Button type='submit' variant="success">Add Student</Button>

                {error && <p style={{color: 'red'}}>{error}</p>}
                {success && <p style={{color: 'green'}}>{success}</p>}

        </Form>

    
        
    

    );
};

export default StudInput;