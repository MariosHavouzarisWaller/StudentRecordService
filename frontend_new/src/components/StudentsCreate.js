// Sets up the webpage that is used create students via POST request

import { Wrapper } from "./Wrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const StudentsCreate = () => {
    const [student_name, setStudentName] = useState('');
    const [date_of_birth, setDateOfBirth] = useState('');
    
    const navigate = useNavigate();

    // POST request process
    const submit = async e => {
        e.preventDefault();
        await fetch('http://localhost:8000/students', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                student_name, 
                date_of_birth
            })
        });

        await navigate(-1);
    }

    // Return HTML
    return <Wrapper>
        <form className="mt-3" onSubmit={submit}>
            <div className="form-floating pb-3">
                <input className="form-control" placeholder="student_name" onChange={e => setStudentName(e.target.value)}/>
                <label>Name</label>
            </div>

            <div className="form-floating pb-3">
                <input type="date" className="form-control" placeholder="date_of_birth" onChange={e => setDateOfBirth(e.target.value)}/>
                <label>Date of Birth</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </Wrapper>
}