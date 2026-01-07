'use client';

import { useState, useEffect } from 'react';
import { Calendar, Users, FileText, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalEvents: number;
  upcomingEvents: number;
  totalApplications: number;
  pendingApplications: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    upcomingEvents: 0,
    totalApplications: 0,
    pendingApplications: 0,
  });

  useEffect(() => {
    // Load stats from localStorage
    const events = JSON.parse(localStorage.getItem('dashboard_events') || '[]');
    const applications = JSON.parse(localStorage.getItem('dashboard_applications') || '[]');
    
    const now = new Date();
    const upcomingEvents = events.filter((e: any) => new Date(e.date) >= now);
    const pendingApplications = applications.filter((a: any) => a.status === 'pending');

    setStats({
      totalEvents: events.length,
      upcomingEvents: upcomingEvents.length,
      totalApplications: applications.length,
      pendingApplications: pendingApplications.length,
    });
  }, []);

  const statCards = [
    { 
      label: 'Total Events', 
      value: stats.totalEvents, 
      icon: Calendar, 
      color: 'bg-blue-500',
      bgLight: 'bg-blue-50'
    },
    { 
      label: 'Upcoming Events', 
      value: stats.upcomingEvents, 
      icon: TrendingUp, 
      color: 'bg-green-500',
      bgLight: 'bg-green-50'
    },
    { 
      label: 'Total Applications', 
      value: stats.totalApplications, 
      icon: FileText, 
      color: 'bg-purple-500',
      bgLight: 'bg-purple-50'
    },
    { 
      label: 'Pending Review', 
      value: stats.pendingApplications, 
      icon: Users, 
      color: 'bg-orange-500',
      bgLight: 'bg-orange-50'
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Manage events and volunteer applications</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`${stat.bgLight} rounded-xl p-6 border border-gray-100`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="dashboard/events" 
            className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-brand-teal hover:bg-brand-light/30 transition-all"
          >
            <div className="bg-brand-teal p-3 rounded-lg text-white">
              <Calendar size={20} />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Manage Events</div>
              <div className="text-sm text-gray-500">Create, edit, or delete events</div>
            </div>
          </a>
          <a 
            href="dashboard/applications" 
            className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-brand-teal hover:bg-brand-light/30 transition-all"
          >
            <div className="bg-purple-500 p-3 rounded-lg text-white">
              <Users size={20} />
            </div>
            <div>
              <div className="font-semibold text-gray-900">View Applications</div>
              <div className="text-sm text-gray-500">Review volunteer applications</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
