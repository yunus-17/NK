import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Plus, Edit2, Trash2, Search, Filter, MoreHorizontal, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { API } from '../../lib/utils';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Infrastructure',
        location: '',
        status: 'Planned',
        budget: '',
        description: ''
    });

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${API}/projects`);
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleOpenModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({ ...project });
        } else {
            setEditingProject(null);
            setFormData({
                title: '',
                category: 'Infrastructure',
                location: '',
                status: 'Planned',
                budget: '',
                description: ''
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        const method = editingProject ? 'PUT' : 'POST';
        const url = editingProject
            ? `${API}/projects/${editingProject._id}`
            : `${API}/projects`;

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowModal(false);
                fetchProjects();
            }
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`${API}/projects/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <div className="min-h-screen bg-nk-base flex">
            <AdminSidebar />
            <main className="flex-grow ml-64 p-8">
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-nk-navy">Project Management</h1>
                        <p className="text-nk-steel text-sm">Add, edit, and monitor your engineering projects.</p>
                    </div>
                    <Button onClick={() => handleOpenModal()} className="bg-nk-accent-blue text-white flex items-center space-x-2">
                        <Plus size={20} />
                        <span>Add New Project</span>
                    </Button>
                </header>

                {/* Filters */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-nk-base mb-8 flex flex-wrap gap-4 items-center">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-nk-steel" size={18} />
                        <input type="text" placeholder="Search projects..." className="w-full bg-nk-base border-none rounded-xl pl-12 pr-6 py-2.5 text-sm" />
                    </div>
                    <select className="bg-nk-base border-none rounded-xl px-6 py-2.5 text-sm font-bold text-nk-navy">
                        <option>All Categories</option>
                        <option>Infrastructure</option>
                        <option>Architecture</option>
                    </select>
                </div>

                {/* Projects Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-nk-base overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-nk-base/50 text-[10px] text-nk-steel uppercase font-bold">
                                <tr>
                                    <th className="px-8 py-5">Project Title</th>
                                    <th className="px-8 py-5">Category</th>
                                    <th className="px-8 py-5">Location</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {projects.map((p) => (
                                    <tr key={p._id} className="border-b border-nk-base last:border-0 hover:bg-nk-base/20 transition-colors group">
                                        <td className="px-8 py-5 font-bold text-nk-navy">{p.title}</td>
                                        <td className="px-8 py-5 text-nk-steel">{p.category}</td>
                                        <td className="px-8 py-5 text-nk-steel">{p.location}</td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${p.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                    p.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' : 'bg-nk-base text-nk-steel'
                                                }`}>
                                                {p.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleOpenModal(p)} className="p-2 bg-nk-base rounded-lg text-nk-steel hover:text-nk-accent-blue"><Edit2 size={16} /></button>
                                                <button onClick={() => handleDelete(p._id)} className="p-2 bg-nk-base rounded-lg text-nk-steel hover:text-red-500"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {projects.length === 0 && (
                                    <tr><td colSpan="5" className="px-8 py-10 text-center text-nk-steel italic">No projects found in the archive.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                <AnimatePresence>
                    {showModal && (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                            <div className="absolute inset-0 bg-nk-navy/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white w-full max-w-2xl rounded-3xl p-10 relative z-10 shadow-2xl"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-2xl font-black text-nk-navy">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                                    <button onClick={() => setShowModal(false)} className="text-nk-steel hover:text-nk-navy"><X /></button>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-nk-steel uppercase pl-1">Project Title</label>
                                            <input
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                required
                                                className="w-full bg-nk-base border-none rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-nk-accent-blue outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-nk-steel uppercase pl-1">Category</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full bg-nk-base border-none rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-nk-accent-blue outline-none"
                                            >
                                                <option>Infrastructure</option>
                                                <option>Architecture</option>
                                                <option>Consultancy</option>
                                                <option>Project Management</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-nk-steel uppercase pl-1">Location</label>
                                            <input
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                required
                                                className="w-full bg-nk-base border-none rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-nk-accent-blue outline-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-nk-steel uppercase pl-1">Budget / Valuation</label>
                                            <input
                                                value={formData.budget}
                                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                placeholder="e.g. 120 Cr"
                                                className="w-full bg-nk-base border-none rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-nk-accent-blue outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-nk-steel uppercase pl-1">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full bg-nk-base border-none rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-nk-accent-blue outline-none"
                                        >
                                            <option>Planned</option>
                                            <option>Ongoing</option>
                                            <option>Completed</option>
                                            <option>Asset Draft</option>
                                            <option>In Progress</option>
                                            <option>Reviewing</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-nk-steel uppercase pl-1">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows="4"
                                            className="w-full bg-nk-base border-none rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-nk-accent-blue outline-none resize-none"
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-4 pt-4">
                                        <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                                        <Button type="submit" className="bg-nk-accent-blue text-white px-10">
                                            {editingProject ? 'Update Project' : 'Save Project'}
                                        </Button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default AdminProjects;
