import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { SIGNUP } from '../Configure';
import { validateEmail } from '../Validation';

const Signup = () => {
    const [email, setEmal] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        try {        
            if(!validateEmail(email)) {
                throw new Error("Invalid Email");
            }
            e.preventDefault();
            let data = {email, password};
            console.log(data);
            axios.post(SIGNUP, data)
            .then( (res)=> {
                setError("");
                setSuccess("successfull");
                console.log(res.data);
              
            }).catch( (err)=> {
                setSuccess("");
                setError(err.response.data);
               
            })

        } catch(err) {
            setSuccess("");
            setError("From try Catch: "+err.response.data);

        }
    }
    
    return(
        <Form className="form_container" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmal(e.target.value)}} />
           
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        </Form.Group>
       
        
      
        <Button variant="success"  type="submit">
            Sign up
        </Button>
        {error && <p style={{color: 'red'}}>{error}</p>}
        {success && <p style={{color: 'green'}}>{success}</p>}
    </Form>
    );
}

export default Signup;