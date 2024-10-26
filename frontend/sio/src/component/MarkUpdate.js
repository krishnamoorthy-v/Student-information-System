import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { UPDATE_MARK, GET_MARK } from "../Configure";
import { useLocation } from "react-router-dom";
import { validateDOB, validateEmail, validateGender, validateName } from "../Validation";
import axios from "axios";

let UpdateMark = () => {

    const location = useLocation()
    const [math, setMath ] = useState("");
    const [physics, setPhysics ] = useState("");
    const [chemistry, setChemistry ] = useState("");
    const token = JSON.parse(localStorage.getItem("token")).token;
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    let { mark_id } = location.state || {}

    useEffect( ()=> {

        const fetchData = () => {

            axios.get(GET_MARK+mark_id, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then( (res) => {
                // console.log(res.data);
                let data = res.data;
                
                setMath(data.math);
                setPhysics(data.physics);
                setChemistry(data.chemistry);
                
                
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
        let formdata = {math, chemistry, physics};
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


            axios.put(UPDATE_MARK+mark_id, formdata, {
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

        </>

    );
}

export default UpdateMark;