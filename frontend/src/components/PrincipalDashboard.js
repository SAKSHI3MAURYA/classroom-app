// PrincipalDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrincipalDashboard = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [newClassroom, setNewClassroom] = useState({
        name: '',
        startTime: '',
        endTime: '',
        days: []
    });

    useEffect(() => {
        // Fetch teachers, students, and classrooms data
        const fetchData = async () => {
            try {
                const teachersRes = await axios.get('/api/principal/teachers');
                const studentsRes = await axios.get('/api/principal/students');
                const classroomsRes = await axios.get('/api/principal/classrooms');
                setTeachers(teachersRes.data);
                setStudents(studentsRes.data);
                setClassrooms(classroomsRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleClassroomChange = (e) => {
        const { name, value } = e.target;
        setNewClassroom({ ...newClassroom, [name]: value });
    };

    const handleDaysChange = (e) => {
        const { options } = e.target;
        const selectedDays = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setNewClassroom({ ...newClassroom, days: selectedDays });
    };

    const createClassroom = async () => {
        try {
            await axios.post('/api/principal/create-classroom', newClassroom);
            // Refresh classroom list
            const classroomsRes = await axios.get('/api/principal/classrooms');
            setClassrooms(classroomsRes.data);
        } catch (error) {
            console.error('Error creating classroom:', error);
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Principal Dashboard</h1>
            </header>

            <div>
                <h2>Create Classroom</h2>
                <form>
                    <input
                        type="text"
                        name="name"
                        placeholder="Classroom Name"
                        value={newClassroom.name}
                        onChange={handleClassroomChange}
                    />
                    <input
                        type="time"
                        name="startTime"
                        placeholder="Start Time"
                        value={newClassroom.startTime}
                        onChange={handleClassroomChange}
                    />
                    <input
                        type="time"
                        name="endTime"
                        placeholder="End Time"
                        value={newClassroom.endTime}
                        onChange={handleClassroomChange}
                    />
                    <select multiple onChange={handleDaysChange}>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                    <button type="button" onClick={createClassroom}>Create Classroom</button>
                </form>
            </div>

            <div>
                <h2>Teachers</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map(teacher => (
                            <tr key={teacher._id}>
                                <td>{teacher._id}</td>
                                <td>{teacher.email}</td>
                                <td>
                                    {/* Actions to edit/delete teacher */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Students</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student._id}>
                                <td>{student._id}</td>
                                <td>{student.email}</td>
                                <td>
                                    {/* Actions to edit/delete student */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PrincipalDashboard;
