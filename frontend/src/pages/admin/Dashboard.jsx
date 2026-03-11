import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bell, Search, MessageSquare, Briefcase, Award, TrendingUp, Download, CheckCircle, FileText } from 'lucide-react';
import { API } from '../../lib/utils';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalProjects: 0,
        ongoingProjects: 0,
        domainGrowth: '24%',
        structuralCertificates: '154'
    });
    const [recentProjects, setRecentProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // High-Fidelity Mock Data for empty states/fallbacks
    const mockProjects = [
        { title: 'Nexus Commercial Plaza', status: 'Ongoing', budget: '₹4.2 Cr', client: 'Reliance Industries' },
        { title: 'Skyline Residential Towers', status: 'Completed', budget: '₹12.8 Cr', client: 'Adani Group' },
        { title: 'Green Valley Dam Project', status: 'Proposal', budget: '₹85.5 Cr', client: 'Govt. of Maharashtra' },
        { title: 'Marina Bay Bridge', status: 'Ongoing', budget: '₹320 Cr', client: 'NHAI' },
        { title: 'Heritage Villa Restoration', status: 'Completed', budget: '₹1.5 Cr', client: 'Private Client' }
    ];

    const mockStats = {
        totalProjects: '42',
        unresolvedInquiries: '08',
        structuralCertificates: '128',
        domainGrowth: '32.5%'
    };

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const headers = { 'Authorization': `Bearer ${token}` };

                const [statsRes, projectsRes] = await Promise.all([
                    fetch(`${API}/projects/stats`, { headers }),
                    fetch(`${API}/projects`, { headers })
                ]);

                if (statsRes.ok && projectsRes.ok) {
                    const statsData = await statsRes.json();
                    const projectsData = await projectsRes.json();
                    setStats(statsData);
                    setRecentProjects(projectsData.length > 0 ? projectsData.slice(0, 5) : []);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleExport = () => {
        const exportData = {
            report_type: "NK_ENGINEERING_ENTERPRISE_SNAPSHOT",
            generated_at: new Date().toISOString(),
            stats: stats,
            active_assets: recentProjects.length > 0 ? recentProjects : mockProjects,
            system_status: "Operational"
        };

        const blob = new Blob([JSON.stringify(exportData, null, 4)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NK_Engineering_Registry_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const displayProjects = recentProjects.length > 0 ? recentProjects : mockProjects;

    return (
        <div className="min-h-screen bg-nk-base flex font-ui">
            <AdminSidebar />
            <main className="flex-grow ml-72 p-12 lg:p-16">
                {/* Top Header */}
                <header className="flex items-center justify-between mb-16">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-4xl font-heading text-nk-olive-dark tracking-tight">Enterprise Overview</h1>
                            <p className="text-nk-olive/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Welcome to the Hub, Principal Admin</p>
                        </motion.div>
                    </div>
                    <div className="flex items-center space-x-10">
                        <div className="relative hidden xl:block">
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-nk-olive/20" size={18} />
                            <input
                                type="text"
                                placeholder="Search Database..."
                                className="bg-transparent border-b border-nk-olive/10 pl-10 pr-6 py-3 text-xs focus:border-nk-olive outline-none transition-all w-80 font-bold"
                            />
                        </div>
                        <button className="flex items-center space-x-3 bg-nk-olive text-nk-sand px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-nk-olive-dark transition-all shadow-xl" onClick={handleExport}>
                            <Download size={16} />
                            <span>Export Registry</span>
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="space-y-10">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Asset Portfolio', value: stats?.totalProjects || mockStats.totalProjects, trend: '+12%', icon: Briefcase, color: 'bg-nk-olive' },
                            { label: 'Unresolved Inquiries', value: mockStats.unresolvedInquiries, trend: '+5', icon: MessageSquare, color: 'bg-nk-olive-light' },
                            { label: 'Structural Certificates', value: stats?.structuralCertificates || mockStats.structuralCertificates, trend: 'Monthly', icon: Award, color: 'bg-nk-sand-dark' },
                            { label: 'Domain Growth', value: stats?.domainGrowth || mockStats.domainGrowth, trend: '+8.2%', icon: TrendingUp, color: 'bg-nk-olive-dark' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-10 rounded-none shadow-sm border border-nk-olive/10 flex flex-col relative group overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 text-nk-olive/5 group-hover:scale-110 transition-transform">
                                    <stat.icon size={60} />
                                </div>
                                <span className="text-nk-olive/60 text-[11px] font-black uppercase tracking-[0.3em] mb-4">{stat.label}</span>
                                <div className="flex items-end justify-between relative z-10">
                                    <h3 className="text-6xl font-heading text-nk-olive-dark leading-none">{stat.value}</h3>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 ${stat.color} text-nk-sand-light shadow-lg`}>
                                        {stat.trend}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tables Preview - Premium Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 bg-white rounded-none shadow-sm border border-nk-olive/10 overflow-hidden">
                            <div className="p-8 border-b border-nk-olive/5 flex justify-between items-center bg-nk-sand/5">
                                <h3 className="font-black text-[13px] uppercase tracking-[0.2em] text-nk-olive-dark flex items-center">
                                    <FileText size={18} className="mr-3 text-nk-olive" />
                                    Recent Domain Assets
                                </h3>
                                <button className="text-[10px] font-black uppercase tracking-widest text-nk-olive-light hover:underline underline-offset-4 decoration-nk-olive-light flex items-center" onClick={handleExport}>
                                    <Download size={12} className="mr-2" />
                                    JSON Export
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-nk-olive/5 text-[10px] text-nk-olive/40 uppercase font-black tracking-[0.2em] text-left">
                                        <tr>
                                            <th className="px-10 py-6">Nomenclature</th>
                                            <th className="px-10 py-6">Domain Status</th>
                                            <th className="px-10 py-6">Asset Valuation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs">
                                        {displayProjects.map((row, i) => (
                                            <tr key={i} className="border-b border-nk-olive/5 last:border-0 hover:bg-nk-sand/5 transition-all group">
                                                <td className="px-10 py-8">
                                                    <div className="font-bold text-nk-olive-dark group-hover:translate-x-2 transition-transform duration-300">
                                                        {row.title}
                                                    </div>
                                                    {row.client && <div className="text-[9px] opacity-40 uppercase tracking-widest mt-1">{row.client}</div>}
                                                </td>
                                                <td className="px-10 py-8">
                                                    <span className={`px-4 py-2 ${row.status === 'Ongoing' ? 'bg-nk-olive-dark text-nk-sand-light' : row.status === 'Completed' ? 'bg-nk-olive text-nk-sand' : 'bg-nk-sand-dark text-nk-olive'} rounded-none text-[8px] font-black uppercase tracking-widest shadow-sm`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-8 text-nk-olive/60 font-black tracking-widest">{row.budget}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-nk-olive border-t-8 border-nk-sand p-12 text-nk-sand flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
                            <div className="space-y-8 relative z-10">
                                <div className="w-16 h-16 bg-nk-sand/10 rounded-none flex items-center justify-center text-nk-sand mb-8 group-hover:rotate-12 transition-transform shadow-inner">
                                    <MessageSquare size={32} />
                                </div>
                                <h3 className="text-3xl font-heading text-nk-sand-light tracking-tight italic">Communication Bureau</h3>
                                <p className="text-nk-sand/60 text-sm leading-relaxed font-body">
                                    Strategic briefing sessions awaiting your executive clearance. Review and respond to project inquiries.
                                </p>
                            </div>
                            <Link to="/admin/enquiries" className="bg-nk-sand text-nk-olive w-full py-5 text-center text-[10px] font-black uppercase tracking-[0.3em] hover:bg-nk-sand-light transition-all shadow-xl mt-12 relative z-10">
                                Enter Mail Hub
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
