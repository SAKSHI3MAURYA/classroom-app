// Fetch and display teachers and students
// Create classrooms
// Assign classrooms to teachers

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrincipalDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classroomName, setClassroomName] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState([]);

  useEffect(() => {
    fetchTeachers();
    fetchStudents();
  }, []);

  const fetchTeachers = async () => {
    const response = await axios.get('/api/teachers');
    setTeachers(response.data);
  };

  const fetchStudents = async () => {
    const response = await axios.get('/api/students');
    setStudents(response.data);
  };

  const createClassroom = async () => {
    const response = await axios.post('/api/classrooms', {
      name: classroomName,
      startTime,
      endTime,
      days,
      teacher: selectedTeacher,
    });
    console.log('Classroom created:', response.data);
  };

  const assignClassroom = async (teacherId) => {
    const response = await axios.put(`/api/teachers/${teacherId}/assign`, { classroomId: selectedClassroom });
    console.log('Classroom assigned:', response.data);
  };

  return (
    <div>
      <h1>Principal Dashboard</h1>

      <h2>Teachers</h2>
      <ul>
        {teachers.map(teacher => (
          <li key={teacher._id}>
            {teacher.name}
            <button onClick={() => assignClassroom(teacher._id)}>Assign Classroom</button>
          </li>
        ))}
      </ul>

      <h2>Students</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>{student.name}</li>
        ))}
      </ul>

      <h2>Create Classroom</h2>
      <form onSubmit={createClassroom}>
        <input
          type="text"
          placeholder="Classroom Name"
          value={classroomName}
          onChange={(e) => setClassroomName(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Days (comma separated)"
          value={days}
          onChange={(e) => setDays(e.target.value.split(','))}
          required
        />
        <select onChange={(e) => setSelectedTeacher(e.target.value)} required>
          <option value="">Select Teacher</option>
          {teachers.map(teacher => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>
        <button type="submit">Create Classroom</button>
      </form>
    </div>
  );
};

export default PrincipalDashboard;
