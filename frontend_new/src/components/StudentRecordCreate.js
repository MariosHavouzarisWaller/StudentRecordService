// Sets up the webpage that is used create Student Records via POST request

import { Wrapper } from "./Wrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const StudentRecordCreate = () => {
    const [student_id, setStudentId] = useState('');
    const [subject_id, setSubjectId] = useState('');
    const [year, setYear] = useState('');
    const [quarter, setQuarter] = useState('');
    const [grade, setGrade] = useState('');
    
    const navigate = useNavigate();

    // POST request process
    const submit = async e => {
        e.preventDefault();
        await fetch('http://localhost:8000/students_subjects', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                student_id, 
                subject_id,
                year,
                quarter,
                grade
            })
        });

        await navigate(-1);
    }

    // Return HTML
    return <Wrapper>
        <form className="mt-3" onSubmit={submit}>
            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="student_id" onChange={e => setStudentId(e.target.value)}/>
                <label>Student ID</label>
            </div>

            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="subject_id" onChange={e => setSubjectId(e.target.value)}/>
                <label>Subject ID</label>
            </div>

            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="year" onChange={e => setYear(e.target.value)}/>
                <label>Year</label>
            </div>

            <div className="form-floating pb-3">
                <input className="form-control" placeholder="quarter" onChange={e => setQuarter(e.target.value)}/>
                <label>Quarter</label>
            </div>

            <div className="form-floating pb-3">
                <input type="number" className="form-control" placeholder="grade" onChange={e => setGrade(e.target.value)}/>
                <label>Grade</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </Wrapper>
}