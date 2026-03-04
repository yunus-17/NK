import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['Infrastructure', 'Architecture', 'Consultancy', 'Project Management']
    },
    location: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Ongoing', 'Completed', 'Planned', 'In Progress', 'Asset Draft', 'Reviewing'],
        default: 'Planned'
    },
    budget: { type: String }, // Storing as string to keep format like "120 Cr"
    description: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
