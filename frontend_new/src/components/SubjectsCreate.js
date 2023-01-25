// Sets up the webpage that is used create subjects via POST request

import { Wrapper } from "./Wrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SubjectsCreate = () => {
    const [subject_name, setSubjectName] = useState('');
    
    const navigate = useNavigate();

    // POST request process
    const submit = async e => {
        e.preventDefault();
        await fetch('http://localhost:8000/subjects', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                subject_name
            })
        });

        await navigate(-1);
    }

    // Return HTML
    return <Wrapper>
        <form className="mt-3" onSubmit={submit}>
            <div className="form-floating pb-3">
                <input className="form-control" placeholder="subject_name" onChange={e => setSubjectName(e.target.value)}/>
                <label>Subject Name</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </Wrapper>
}