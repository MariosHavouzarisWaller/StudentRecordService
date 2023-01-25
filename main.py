# Main class of Student Record service where all the API calls take place

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from database import engine, SessionLocal
from sqlalchemy.orm import Session
import uvicorn
import models

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

# Set up the database models
class Student(BaseModel):
    student_name: str = Field(min_length=1)
    date_of_birth: str = Field(min_length=1, max_length=20)

class Subject(BaseModel):
    subject_name: str = Field(min_length=1)

class StudentSubject(BaseModel):
    student_id: int = Field(gt=-1)
    subject_id: int = Field(gt=-1)
    year: int = Field(gt=1900, lt=2500)
    quarter: str = Field(min_length=2, max_length=2)
    grade: int = Field(gt=-1, lt=11)

# Get the database from the session that has been set up

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally: 
        db.close()

# Get requests
@app.get("/students")
async def get_students(db: Session = Depends(get_db)):
    return db.query(models.Students).all()

@app.get("/subjects")
async def get_subjects(db: Session = Depends(get_db)):
    return db.query(models.Subjects).all()

@app.get("/students_subjects")
async def get_students_subjects(db: Session = Depends(get_db)):
    return db.query(models.Students_Subjects).all()


# Post requests (Creating the data)

@app.post("/students")
async def create_student(student: Student, db: Session = Depends(get_db)):
    student_model = models.Students()
    student_model.student_name = student.student_name
    student_model.date_of_birth = student.date_of_birth

    db.add(student_model)
    db.commit()

    return student

@app.post("/subjects")
async def create_subject(subject: Subject, db: Session = Depends(get_db)):
    subject_model = models.Subjects()
    subject_model.subject_name = subject.subject_name

    db.add(subject_model)
    db.commit()

    return subject

@app.post("/students_subjects")
async def create_entry(entry: StudentSubject, db: Session = Depends(get_db)):
    entry_model = models.Students_Subjects()
    entry_model.student_id = entry.student_id
    entry_model.subject_id = entry.subject_id
    entry_model.year = entry.year
    entry_model.quarter = entry.quarter
    entry_model.grade = entry.grade

    db.add(entry_model)
    db.commit()

    return entry


# Put requests (updating the data)

@app.put("/students/{studentId}")
async def update_student(studentId: int, student: Student, db: Session = Depends(get_db)):
    student_model = db.query(models.Students).filter(models.Students.student_id == studentId).first()

    if student_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"Student ID {studentId} : Does not exist"
        )
    
    student_model.student_name = student.student_name
    student_model.date_of_birth = student.date_of_birth

    db.add(student_model)
    db.commit()

    return student


@app.put("/subjects/{subjectId}")
async def update_subject(subjectId: int, subject: Subject, db: Session = Depends(get_db)):
    subject_model = db.query(models.Subjects).filter(models.Subjects.subject_id == subjectId).first()

    if subject_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"Subject ID {subjectId} : Does not exist"
        )

    subject_model.subject_name = subject.subject_name

    db.add(subject_model)
    db.commit()

    return subject
    

@app.put("/students_subjects/{entryId}")
async def update_entry(entryId: int, entry: StudentSubject, db: Session = Depends(get_db)):
    entry_model = db.query(models.Students_Subjects).filter(models.Students_Subjects.entry_id == entryId).first()

    if entry_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"Entry ID {entryId} : Does not exist"
        )

    entry_model.student_id = entry.student_id
    entry_model.subject_id = entry.subject_id
    entry_model.year = entry.year
    entry_model.quarter = entry.quarter
    entry_model.grade = entry.grade

    db.add(entry_model)
    db.commit()

    return entry


# Delete requests
# if...statements raise an error message with code 404 if the entry that we're trying to delete can't be found

@app.delete("/students/{studentId}")
async def delete_student(studentId: int, db: Session = Depends(get_db)):
    student_model = db.query(models.Students).filter(models.Students.student_id == studentId).first()
    
    if student_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"Student ID {studentId} : Does not exist"
        )

    db.query(models.Students).filter(models.Students.student_id == studentId).delete()
    db.commit()


@app.delete("/subjects/{subjectId}")
async def delete_subject(subjectId: int, db: Session = Depends(get_db)):
    subject_model = db.query(models.Subjects).filter(models.Subjects.subject_id == subjectId).first()
    
    if subject_model is None:
        raise HTTPException(
            status_code=404,
            detail=f"Subject ID {subjectId} : Does not exist"
        )

    db.query(models.Subjects).filter(models.Subjects.subject_id == subjectId).delete()
    db.commit()

@app.delete("/students_subjects/{entryId}")
async def delete_subject(entryId: int, db: Session = Depends(get_db)):
    entry_model = db.query(models.Students_Subjects).filter(models.Students_Subjects.entry_id == entryId).first()
    
    if entry_model is None:
        print("IN ENTRY MODEL")
        raise HTTPException(
            status_code=404,
            detail=f"Entry ID {entryId} : Does not exist"
        )

    db.query(models.Students_Subjects).filter(models.Students_Subjects.entry_id == entryId).delete()
    db.commit()

# Set up for hot reloading
if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)