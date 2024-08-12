// View and manage students
// Create timetables for classrooms

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [subject, setSubject] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchTimetable();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get('/api/teacher/students');
    setStudents(response.data);
  };

  const fetchTimetable = async () => {
    const response = await axios.get('/api/teacher/timetable');
    setTimetable(response.data);
  };

  const createTimetableEntry = async () => {
    const response = await axios.post('/api/teacher/timetable', {
      subject,
      startTime,
      endTime,
    });
    console.log('Timetable entry created:', response.data);
    fetchTimetable();
  };

  return (
    <div>
      <h1>Teacher Dashboard</h1>

      <h2>Students</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>{student.name}</li>
        ))}
      </ul>

      <h2>Create Timetable</h2>
      <form onSubmit={createTimetableEntry}>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
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
        <button type="submit">Create Timetable</button>
      </form>

      <h2>Timetable</h2>
      <ul>
        {timetable.map(entry => (
          <li key={entry._id}>
            {entry.subject} from {entry.startTime} to {entry.endTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDashboard;
