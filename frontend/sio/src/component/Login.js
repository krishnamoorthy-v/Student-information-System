import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState, useContext } from 'react';
import axios from 'axios';
import { LOGIN } from '../Configure';
import { authenticatorContext } from '../App';
import '../App.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmal] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const {isauthenticated, setAuthenticated} = useContext(authenticatorContext);

    

    const handleSubmit = (e) => {
        try {        
            e.preventDefault();
            let data = {email, password, role};
            console.log(data);
            axios.post(LOGIN, data)
            .then( (res)=> {
                setError("");
                setSuccess("successfull");
                localStorage.setItem("token", JSON.stringify(res.data));
          
                setAuthenticated(true);
                console.log("From Context: "+isauthenticated);
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
            <Row>
                <Col>
                    <div className='mb-3'>
                        <Form.Check type='radio' label="User" value="user" onChange={(e)=>{setRole(e.target.value)}} />
                    </div>
                </Col>
                <Col>
                    <div className='mb-3'>
                        <Form.Check type='radio' label="Admin" value="admin" onChange={(e)=>{setRole(e.target.value)}} />
                    </div>
                </Col>
            </Row>
            
        
            <Row>
                <Col>
                    <Button variant="success"  type="submit">
                        Login
                    </Button>
                </Col>
                <Col>
                    <Link to="/signup">Signup</Link>
                </Col>
            </Row>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {success && <p style={{color: 'green'}}>{success}</p>}
    </Form>
    );
}

export default Login;