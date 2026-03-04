import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Settings, MessageSquare, LogOut, Shield, ChevronRight } from 'lucide-react';

const AdminSidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { name: 'Projects', icon: Briefcase, path: '/admin/projects' },
        { name: 'Inquiries', icon: MessageSquare, path: '/admin/enquiries' },
        { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-72 bg-nk-olive text-nk-sand flex flex-col z-50 shadow-2xl border-r border-white/5 font-ui">
            {/* Brand */}
            <div className="p-10 border-b border-white/5 flex items-center space-x-4 mb-10">
                <div className="w-10 h-10 bg-nk-sand rounded-none flex items-center justify-center text-nk-olive transition-transform hover:rotate-45">
                    <Shield size={20} />
                </div>
                <div>
                    <h2 className="text-sm font-black tracking-[0.2em] leading-none uppercase text-nk-sand-light">NK COMMAND</h2>
                    <span className="text-[9px] text-nk-sand/30 uppercase tracking-[0.4em] font-black mt-1 block">Elite Admin</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-grow px-6 space-y-4">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.path === '/admin'}
                        className={({ isActive }) => `
              flex items-center justify-between px-6 py-4 rounded-none transition-all group
              ${isActive ? 'bg-nk-sand text-nk-olive shadow-[0_15px_30px_-10px_rgba(215,216,182,0.3)]' : 'text-nk-sand/40 hover:bg-white/5 hover:text-nk-sand'}
            `}
                    >
                        {({ isActive }) => (
                            <>
                                <div className="flex items-center space-x-4">
                                    <item.icon size={20} className={isActive ? 'text-nk-olive' : 'group-hover:text-nk-sand'} />
                                    <span className="font-black text-[11px] uppercase tracking-[0.2em]">{item.name}</span>
                                </div>
                                <ChevronRight className={`transition-transform duration-500 ${isActive ? 'translate-x-0' : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} size={14} />
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-8 border-t border-white/5">
                <button
                    onClick={() => navigate('/')}
                    className="w-full flex items-center space-x-4 text-nk-sand/20 hover:text-nk-sand transition-all group"
                >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-black text-[10px] uppercase tracking-widest">Terminate Session</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
