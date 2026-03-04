import Project from '../models/Project.js';

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects' });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project' });
    }
};

export const createProject = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: 'Error creating project' });
    }
};

export const updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: 'Error updating project' });
    }
};

export const deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project' });
    }
};

export const getStats = async (req, res) => {
    try {
        const totalProjects = await Project.countDocuments();
        const ongoingProjects = await Project.countDocuments({ status: 'Ongoing' });
        // Mocking some stats for now as requested by UI
        res.status(200).json({
            totalProjects,
            ongoingProjects,
            domainGrowth: '24%',
            structuralCertificates: '154'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
};
