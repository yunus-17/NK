import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Mail, Phone, Calendar, CheckCircle, Reply, Trash2, Search } from 'lucide-react';

const AdminEnquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [stats, setStats] = useState({ total: 0, unresolved: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [replyMessage, setReplyMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const fetchEnquiries = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const headers = { 'Authorization': `Bearer ${token}` };

            const [enquiriesRes, statsRes] = await Promise.all([
                fetch('http://localhost:5000/api/enquiries', { headers }),
                fetch('http://localhost:5000/api/enquiries/stats', { headers })
            ]);

            if (enquiriesRes.ok && statsRes.ok) {
                const enquiriesData = await enquiriesRes.json();
                const statsData = await statsRes.json();
                setEnquiries(enquiriesData);
                setStats(statsData);
                if (enquiriesData.length > 0 && !selectedEnquiry) {
                    setSelectedEnquiry(enquiriesData[0]);
                }
            }
        } catch (error) {
            console.error('Error fetching enquiries:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendReply = async () => {
        if (!replyMessage.trim()) return;
        setIsSending(true);

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`http://localhost:5000/api/enquiries/${selectedEnquiry._id}/reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ replyMessage })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Communication dispatched successfully.');
                setReplyMessage('');
                fetchEnquiries();
                // Find and update selected enquiry in local state to reflect 'resolved'
                const updated = enquiries.find(e => e._id === selectedEnquiry._id);
                if (updated) setSelectedEnquiry({ ...updated, status: 'resolved' });
            } else {
                alert(data.message || 'Dispatch failed.');
            }
        } catch (error) {
            console.error('Error sending reply:', error);
            alert('Communication failure with the central hub.');
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="min-h-screen bg-nk-base flex">
            <AdminSidebar />
            <main className="flex-grow ml-64 p-8">
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-black text-nk-navy">Client Enquiries</h1>
                        <p className="text-nk-steel text-sm">Manage messages and appointment requests.</p>
                    </div>
                    <div className="flex space-x-4">
                        <div className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-nk-steel border border-nk-base">
                            Unresolved: <span className="text-nk-accent-blue ml-1">{stats.unresolved}</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Enquiry List */}
                    <div className="lg:col-span-1 space-y-4 h-[70vh] overflow-y-auto pr-2">
                        {enquiries.length > 0 ? enquiries.map((msg) => (
                            <div
                                key={msg._id}
                                onClick={() => setSelectedEnquiry(msg)}
                                className={`p-6 rounded-2xl cursor-pointer transition-all border ${selectedEnquiry?._id === msg._id
                                    ? 'bg-white border-nk-accent-blue shadow-md'
                                    : 'bg-nk-base/50 border-transparent hover:bg-white hover:shadow-sm'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-nk-navy">{msg.name}</h4>
                                    <span className="text-[10px] text-nk-steel font-medium">{formatDate(msg.createdAt)}</span>
                                </div>
                                <p className="text-xs text-nk-steel font-bold uppercase tracking-widest mb-2">{msg.subject}</p>
                                {msg.status === 'new' && <span className="w-2 h-2 bg-nk-accent-blue rounded-full block" />}
                            </div>
                        )) : (
                            <div className="p-10 text-center text-nk-steel italic opacity-50">No enquiries received yet.</div>
                        )}
                    </div>

                    <div className="lg:col-span-2 bg-white rounded-3xl p-10 border border-nk-base shadow-sm">
                        {selectedEnquiry ? (
                            <>
                                <div className="flex justify-between items-start border-b border-nk-base pb-8 mb-8">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-14 h-14 bg-nk-navy text-white rounded-2xl flex items-center justify-center text-xl font-black">
                                            {selectedEnquiry.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-nk-navy">{selectedEnquiry.name}</h3>
                                            <div className="flex space-x-4 mt-1">
                                                <span className="text-xs text-nk-steel flex items-center"><Mail size={14} className="mr-1" /> {selectedEnquiry.email}</span>
                                                {selectedEnquiry.phone && <span className="text-xs text-nk-steel flex items-center"><Phone size={14} className="mr-1" /> {selectedEnquiry.phone}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button className="p-3 bg-nk-base text-nk-steel rounded-xl hover:text-nk-accent-blue transition-colors"><Reply size={18} /></button>
                                        <button
                                            onClick={async () => {
                                                if (confirm('Delete this enquiry permanently?')) {
                                                    const token = localStorage.getItem('adminToken');
                                                    await fetch(`http://localhost:5000/api/enquiries/${selectedEnquiry._id}`, {
                                                        method: 'DELETE',
                                                        headers: { 'Authorization': `Bearer ${token}` }
                                                    });
                                                    fetchEnquiries();
                                                    setSelectedEnquiry(null);
                                                }
                                            }}
                                            className="p-3 bg-nk-base text-nk-steel rounded-xl hover:text-red-500 transition-colors"
                                        ><Trash2 size={18} /></button>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <span className="text-[10px] font-bold text-nk-steel uppercase tracking-widest block mb-4">Message Details</span>
                                        <p className="text-nk-steel text-lg leading-relaxed">{selectedEnquiry.message}</p>
                                    </div>

                                    {selectedEnquiry.appointmentDate && (
                                        <div className="p-6 bg-nk-base rounded-2xl border border-nk-steel/10">
                                            <h4 className="font-bold text-nk-navy mb-4 flex items-center"><Calendar size={18} className="mr-2 text-nk-accent-blue" /> Requested Appointment</h4>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm">
                                                    <p className="font-bold">{new Date(selectedEnquiry.appointmentDate).toDateString()}</p>
                                                    <p className="text-nk-steel">{selectedEnquiry.appointmentTime || 'Time TBD'}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button className="px-4 py-2 bg-white text-nk-navy text-xs font-bold rounded-lg border border-nk-base hover:bg-nk-navy hover:text-white transition-all">Reschedule</button>
                                                    <button className="px-4 py-2 bg-nk-accent-blue text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all">Accept</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-8 border-t border-nk-base">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-nk-steel/40">Dispatch Reply</span>
                                            {selectedEnquiry.status === 'resolved' && (
                                                <span className="text-[10px] font-black uppercase tracking-widest text-nk-olive flex items-center">
                                                    <CheckCircle size={12} className="mr-2" /> Resolved & Notified
                                                </span>
                                            )}
                                        </div>
                                        <textarea
                                            rows="4"
                                            value={replyMessage}
                                            onChange={(e) => setReplyMessage(e.target.value)}
                                            className="w-full bg-nk-base border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-nk-olive-light outline-none resize-none mb-4"
                                            placeholder="Type the official response brief here..."
                                        ></textarea>
                                        <button
                                            onClick={handleSendReply}
                                            disabled={isSending || !replyMessage.trim()}
                                            className="bg-nk-olive text-nk-sand px-10 py-3 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-nk-olive-dark transition-all flex items-center space-x-3 shadow-lg disabled:opacity-50"
                                        >
                                            <Reply size={18} />
                                            <span>{isSending ? 'Dispatching...' : 'Send Reply'}</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex items-center justify-center text-nk-steel italic opacity-50">Select an enquiry to view details</div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminEnquiries;
