// StudentDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
    const [classmates, setClassmates] = useState([]);
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        // Fetch classmates and timetable data
        const fetchData = async () => {
            try {
                const classmatesRes = await axios.get('/api/student/classmates');
                const timetableRes = await axios.get('/api/student/timetable');
                setClassmates(classmatesRes.data);
                setTimetable(timetableRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <header>
                <h1>Student Dashboard</h1>
            </header>

            <div>
                <h2>Classmates</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classmates.map(classmate => (
                            <tr key={classmate._id}>
                                <td>{classmate._id}</td>
                                <td>{classmate.email}</td>
                                <td>{classmate.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Timetable</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Day</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetable.map(period => (
                            <tr key={period._id}>
                                <td>{period.subject}</td>
                                <td>{period.day}</td>
                                <td>{new Date(period.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                <td>{new Date(period.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentDashboard;
