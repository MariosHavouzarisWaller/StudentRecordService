import { Students } from "./components/Students";
import { Subjects } from "./components/Subjects";
import { StudentRecords } from "./components/StudentRecords";
import { StudentsCreate } from "./components/StudentsCreate";
import { SubjectsCreate } from "./components/SubjectsCreate";
import { StudentRecordCreate } from "./components/StudentRecordCreate"

import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/studentslist" element={<Students/>}/>
      <Route path="/studentscreate" element={<StudentsCreate/>}/>
      <Route path="/subjectslist" element={<Subjects/>}/>
      <Route path="/subjectscreate" element={<SubjectsCreate/>}/>
      <Route path="/studentsrecordslist" element={<StudentRecords/>}/>
      <Route path="/studentrecordcreate" element={<StudentRecordCreate/>}/>
    </Routes>
  </BrowserRouter>
}

export default App;