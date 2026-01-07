'use client';

import { useState, useEffect } from 'react';
import { Users, Mail, Phone, Clock, CheckCircle, XCircle, Eye, X } from 'lucide-react';

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  availability: string;
  experience: string;
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    const stored = localStorage.getItem('dashboard_applications');
    if (stored) {
      setApplications(JSON.parse(stored));
    }
  }, []);

  const saveApplications = (apps: Application[]) => {
    setApplications(apps);
    localStorage.setItem('dashboard_applications', JSON.stringify(apps));
  };

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    const updated = applications.map(app =>
      app.id === id ? { ...app, status } : app
    );
    saveApplications(updated);
    if (selectedApp?.id === id) {
      setSelectedApp({ ...selectedApp, status });
    }
  };

  const deleteApplication = (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      saveApplications(applications.filter(app => app.id !== id));
      if (selectedApp?.id === id) {
        setSelectedApp(null);
      }
    }
  };

  const filteredApps = applications.filter(app => 
    filter === 'all' ? true : app.status === filter
  );

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const statusCounts = {
    all: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Volunteer Applications</h1>
        <p className="text-gray-500 mt-1">Review and manage volunteer applications</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === tab
                ? 'bg-brand-teal text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} ({statusCounts[tab]})
          </button>
        ))}
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
          <Users className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500">
            {filter === 'all' 
              ? 'No applications yet. They will appear here when volunteers submit the form.'
              : `No ${filter} applications.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredApps.map(app => (
            <div 
              key={app.id} 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-gray-900">{app.fullName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Mail size={14} /> {app.email}</span>
                  <span className="flex items-center gap-1"><Phone size={14} /> {app.phone}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {new Date(app.submittedAt).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-gray-500">Interest:</span>{' '}
                  <span className="text-gray-700">{app.areaOfInterest}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => setSelectedApp(app)}
                  className="p-2 text-gray-400 hover:text-brand-teal hover:bg-gray-50 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye size={18} />
                </button>
                {app.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(app.id, 'approved')}
                      className="p-2 text-gray-400 hover:text-green-500 hover:bg-gray-50 rounded-lg transition-colors"
                      title="Approve"
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, 'rejected')}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-colors"
                      title="Reject"
                    >
                      <XCircle size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedApp.fullName}</h2>
                <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedApp.status]}`}>
                  {selectedApp.status}
                </span>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="text-gray-900">{selectedApp.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone</label>
                <p className="text-gray-900">{selectedApp.phone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Area of Interest</label>
                <p className="text-gray-900">{selectedApp.areaOfInterest}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Availability</label>
                <p className="text-gray-900">{selectedApp.availability}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Experience</label>
                <p className="text-gray-900">{selectedApp.experience || 'Not provided'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Motivation</label>
                <p className="text-gray-900">{selectedApp.motivation}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Submitted</label>
                <p className="text-gray-900">{new Date(selectedApp.submittedAt).toLocaleString()}</p>
              </div>

              {selectedApp.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => updateStatus(selectedApp.id, 'approved')}
                    className="flex-1 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus(selectedApp.id, 'rejected')}
                    className="flex-1 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
