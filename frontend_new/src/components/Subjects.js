// Sets up the webpage that displays the subjects that are available at the school

import { useEffect, useState } from "react"
import { Wrapper } from "./Wrapper"
import { Link } from "react-router-dom"

export const Subjects = () => {
    const [subjects, setSubjects] = useState([]);

    // Gets subject database content
    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:8000/subjects');
            const content = await response.json();

            setSubjects(content);
        })();
    }, []);

    // DELETE request process
    const del = async subject_id => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            await fetch(`http://localhost:8000/subjects/${subject_id}`, {
                method: 'DELETE',
            });

            setSubjects(subjects.filter(s => s.subject_id !== subject_id));
        }
    }

    // Return HTML
    return <Wrapper>
        <div className="pt-3 pb-2 mb-3 border-bottom">
            <Link to={'/subjectscreate'} className="btn btn-sm btn-outline-secondary">Add Subject</Link>
        </div>

        <div class="table-responsive">
                <table class="table table-striped table-sm">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map(subjects => {
                        return <tr key={subjects.subject_id}>
                            <td>{subjects.subject_id}</td>
                            <td>{subjects.subject_name}</td>
                            <td>
                                <a href="#" className="btn btn-sm btn-outline-secondary" onClick={e => del(subjects.subject_id)}>
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