# Database + Tables are set up here
# Split up into 3 tables: Students, Subjects and Student Records

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

# Stores Student names and date fo births
class Students(Base):
    __tablename__ = "students"

    student_id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String)
    date_of_birth = Column(Integer)

    #students_subjects = relationship("Students_Subjects", back_populates="subjects")

# Stores subject details
class Subjects(Base):
    __tablename__ = "subjects"

    subject_id = Column(Integer, primary_key=True, index=True)
    subject_name = Column(String)

    #students_subjects = relationship("Students_Subjects", back_populates="subjects")

# Stores Student details -> What subjects they take, their grades, etc.
class Students_Subjects(Base):
    __tablename__ = "students-subjects"

    entry_id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.student_id"))
    subject_id = Column(Integer, ForeignKey("subjects.subject_id"))
    year = Column(Integer)
    quarter = Column(String)
    grade = Column(Integer)

    # student = relationship("Students", back_populates="students-subjects")
    # subject = relationship("Subjects", back_populates="students-subjects")