// View class timetable
// View list of classmates

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [timetable, setTimetable] = useState([]);
  const [classmates, setClassmates] = useState([]);

  useEffect(() => {
    fetchTimetable();
    fetchClassmates();
  }, []);

  const fetchTimetable = async () => {
    const response = await axios.get('/api/student/timetable');
    setTimetable(response.data);
  };

  const fetchClassmates = async () => {
    const response = await axios.get('/api/student/classmates');
    setClassmates(response.data);
  };

  return (
    <div>
      <h1>Student Dashboard</h1>

      <h2>Timetable</h2>
      <ul>
        {timetable.map(entry => (
          <li key={entry._id}>
            {entry.subject} from {entry.startTime} to {entry.endTime}
          </li>
        ))}
      </ul>

      <h2>Classmates</h2>
      <ul>
        {classmates.map(classmate => (
          <li key={classmate._id}>{classmate.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
