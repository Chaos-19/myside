'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, Clock, MapPin, X } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'upcoming' | 'past';
  image?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('dashboard_events');
    if (stored) {
      setEvents(JSON.parse(stored));
    }
  }, []);

  const saveEvents = (newEvents: Event[]) => {
    setEvents(newEvents);
    localStorage.setItem('dashboard_events', JSON.stringify(newEvents));
  };

  const openModal = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
      });
    } else {
      setEditingEvent(null);
      setFormData({ title: '', date: '', time: '', location: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setFormData({ title: '', date: '', time: '', location: '', description: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventDate = new Date(formData.date);
    const now = new Date();
    const category = eventDate >= now ? 'upcoming' : 'past';

    if (editingEvent) {
      // Update existing event
      const updated = events.map(ev => 
        ev.id === editingEvent.id 
          ? { ...ev, ...formData, category }
          : ev
      );
      saveEvents(updated);
    } else {
      // Create new event
      const newEvent: Event = {
        id: `evt-${Date.now()}`,
        ...formData,
        category,
      };
      saveEvents([...events, newEvent]);
    }
    
    closeModal();
  };

  const deleteEvent = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      saveEvents(events.filter(ev => ev.id !== id));
    }
  };

  const upcomingEvents = events.filter(e => e.category === 'upcoming');
  const pastEvents = events.filter(e => e.category === 'past');

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
          <p className="text-gray-500 mt-1">Create and manage community events</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-brand-teal hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Add Event
        </button>
      </div>

      {/* Upcoming Events */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events ({upcomingEvents.length})</h2>
        {upcomingEvents.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
            <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">No upcoming events. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">{event.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => openModal(event)}
                    className="p-2 text-gray-400 hover:text-brand-teal hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Past Events ({pastEvents.length})</h2>
          <div className="grid gap-4 opacity-75">
            {pastEvents.map(event => (
              <div key={event.id} className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-700">{event.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none"
                  placeholder="e.g., Community Awareness Day"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none"
                    placeholder="e.g., 10:00 AM - 4:00 PM"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none"
                  placeholder="e.g., Myside Community Center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-teal outline-none"
                  placeholder="Describe the event..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-3 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-brand-teal text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
                >
                  {editingEvent ? 'Save Changes' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
