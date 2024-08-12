// TeacherDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
    const [students, setStudents] = useState([]);
    const [newTimetable, setNewTimetable] = useState({
        subject: '',
        periods: []
    });

    useEffect(() => {
        // Fetch students data
        const fetchData = async () => {
            try {
                const studentsRes = await axios.get('/api/teacher/students');
                setStudents(studentsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleTimetableChange = (e) => {
        const { name, value } = e.target;
        setNewTimetable({ ...newTimetable, [name]: value });
    };

    const createTimetable = async () => {
        try {
            await axios.post('/api/teacher/create-timetable', newTimetable);
            // Clear form or handle success
        } catch (error) {
            console.error('Error creating timetable:', error);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Teacher Dashboard</h1>
            </header>

            <div>
                <h2>Students</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student._id}>
                                <td>{student._id}</td>
                                <td>{student.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Create Timetable</h2>
                <form>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={newTimetable.subject}
                        onChange={handleTimetableChange}
                    />
                    {/* Add inputs for periods here */}
                    <button type="button" onClick={createTimetable}>Create Timetable</button>
                </form>
            </div>
        </div>
    );
};

export default TeacherDashboard;
