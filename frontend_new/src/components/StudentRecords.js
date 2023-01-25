// Sets up the webpage that displays subject details of the students who go to the school. What subjects they are a part of, their grades, etc.

import { useEffect, useState } from "react"
import { Wrapper } from "./Wrapper"
import { Link } from "react-router-dom"

export const StudentRecords = () => {
    const [studentrecord, setStudentRecord] = useState([]);

    // Gets subject record database content
    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8000/students_subjects');
            const content = await response.json();

            setStudentRecord(content);
        })();
    }, []);

    // DELETE request process
    const del = async entry_id => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            await fetch(`http://localhost:8000/students_subjects/${entry_id}`, {
                method: 'DELETE'
            });

            setStudentRecord(studentrecord.filter(sr => sr.entry_id !== entry_id));
        }
    }

    // Return HTML 
    return <Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <Link to={'/studentrecordcreate'} className="btn btn-sm btn-outline-secondary">Add Student Record</Link>
        </div>

        <div class="table-responsive">
                <table class="table table-striped table-sm">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Student ID</th>
                    <th scope="col">Subject ID</th>
                    <th scope="col">Year</th>
                    <th scope="col">Quarter</th>
                    <th scope="col">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {studentrecord.map(studentrecord => {
                        return <tr key={studentrecord.entry_id}>
                            <td>{studentrecord.entry_id}</td>
                            <td>{studentrecord.student_id}</td>
                            <td>{studentrecord.subject_id}</td>
                            <td>{studentrecord.year}</td>
                            <td>{studentrecord.quarter}</td>
                            <td>{studentrecord.grade}</td>
                            <td>
                                <a href="#" className="btn btn-sm btn-outline-secondary" onClick={e => del(studentrecord.entry_id)}>
                                    Delete
                                </a>
                            </td>
                            </tr>
                    })}
                </tbody>
                </table>
            </div>
    </Wrapper>
}