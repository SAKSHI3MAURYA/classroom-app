const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimetableSchema = new Schema({
    classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true },
    subject: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
});

module.exports = mongoose.model('Timetable', TimetableSchema);
