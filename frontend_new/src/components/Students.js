// Sets up the webpage that displays the students who attend the school

import { useEffect, useState } from "react"
import { Wrapper } from "./Wrapper"
import { Link } from "react-router-dom"

export const Students = () => {
    const [students, setStudents] = useState([]);

    // Gets student database content
    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8000/students');
            const content = await response.json();

            setStudents(content);
        })();
    }, []);

    // DELETE request process
    const del = async student_id => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            await fetch(`http://localhost:8000/students/${student_id}`, {
                method: 'DELETE'
            });

            setStudents(students.filter(s => s.student_id !== student_id));
        }
    }

    // Return HTML
    return <Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <Link to={'/studentscreate'} className="btn btn-sm btn-outline-secondary">Add Student</Link>
        </div>

        <div class="table-responsive">
                <table class="table table-striped table-sm">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date of Birth</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(students => {
                        return <tr key={students.student_id}>
                            <td>{students.student_id}</td>
                            <td>{students.student_name}</td>
                            <td>{students.date_of_birth}</td>
                            <td>
                                <a href="#" className="btn btn-sm btn-outline-secondary" onClick={e => del(students.student_id)}>
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