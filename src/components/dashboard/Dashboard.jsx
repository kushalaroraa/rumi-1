import React, { useState, useEffect } from 'react';
import {
  Home,
  Search,
  Heart,
  MessageCircle,
  User,
  Settings,
  LogOut,
  Bell,
  Users,
  DollarSign,
  Send,
  Clock,
  Check,
  XCircle,
  X,
  Edit,
  Sparkles,
  BarChart3,
  Target,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as userApi from '../../api/userApi.js';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function Dashboard({ onLogout, onEditProfile }) {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const [swipeCards, setSwipeCards] = useState([
    {
      id: 1,
      name: 'Emma Wilson',
      age: 24,
      image: 'https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyOTU3MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      match: 92,
      bio: 'Software engineer who loves cooking and weekend hikes. Looking for a clean, respectful flatmate.',
      tags: ['Clean & Tidy', 'Early Riser', 'Non-Smoker'],
      budget: 800,
    },
    {
      id: 2,
      name: 'Alex Thompson',
      age: 26,
      image: 'https://images.unsplash.com/photo-1770894807442-108cc33c0a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB5b3VuZyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Mjk1MjYxMnww&ixlib=rb-4.1.0&q=80&w=1080',
      match: 89,
      bio: 'Marketing professional, easy-going, loves live music and cooking. Seeking a friendly flatmate.',
      tags: ['Social', 'Night Owl', 'Pet Friendly'],
      budget: 750,
    },
    {
      id: 3,
      name: 'Sarah Kim',
      age: 23,
      image: 'https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyOTE1NzgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      match: 95,
      bio: 'Graduate student in design. Quiet, organized, and respectful. Looking for similar vibes!',
      tags: ['Quiet', 'Clean & Tidy', 'Non-Smoker'],
      budget: 900,
    },
  ]);

  const requestsReceived = [
    {
      id: 1,
      name: 'Oliver Davis',
      age: 26,
      match: 87,
      image: 'https://images.unsplash.com/photo-1750741268857-7e44510f867d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI5ODU4ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      name: 'Lisa Anderson',
      age: 25,
      match: 91,
      image: 'https://images.unsplash.com/photo-1754298949882-216a1c92dbb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyOTk5MDg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const sentRequests = [
    { id: 1, name: 'Sophie Bennett', age: 26, match: 95, status: 'pending', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { id: 2, name: 'James Parker', age: 27, match: 88, status: 'accepted', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  ];

  const activeMatches = [
    { id: 1, name: 'Maya Chen', match: 92, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
    { id: 2, name: 'Alex Rodriguez', match: 87, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' },
  ];

  useEffect(() => {
    const load = async () => {
      const id = localStorage.getItem('rumi_user_id');
      if (!id) {
        setProfileLoading(false);
        return;
      }
      try {
        const res = await userApi.getProfile(id);
        if (res.user) setProfile(res.user);
      } catch {
        // ignore
      } finally {
        setProfileLoading(false);
      }
    };
    load();
  }, []);

  const handleSwipe = (direction) => {
    setSwipeCards((prev) => prev.slice(1));
  };

  const quickActions = [
    { icon: MessageCircle, label: 'View Messages', color: 'blue', onClick: () => {} },
    { icon: Edit, label: 'Edit Preferences', color: 'purple', onClick: () => {} },
    { icon: User, label: 'Edit Profile', color: 'green', onClick: onEditProfile || (() => {}) },
  ];

  const profileImageUrl = profile?.profilePicture
    ? (profile.profilePicture.startsWith('http') ? profile.profilePicture : `${API_BASE}${profile.profilePicture}`)
    : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80';

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Home size={18} className="text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">Rumi</span>
        </div>

        <nav className="flex-1 px-4 py-2">
          {['dashboard', 'discover', 'matches', 'messages', 'activity', 'profile', 'settings'].map((nav) => (
            <button
              key={nav}
              onClick={() => setActiveNav(nav)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors ${
                activeNav === nav ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {nav === 'dashboard' && <Home size={20} />}
              {nav === 'discover' && <Search size={20} />}
              {nav === 'matches' && <Heart size={20} />}
              {nav === 'messages' && <MessageCircle size={20} />}
              {nav === 'activity' && <BarChart3 size={20} />}
              {nav === 'profile' && <User size={20} />}
              {nav === 'settings' && <Settings size={20} />}
              <span>{nav.charAt(0).toUpperCase() + nav.slice(1)}</span>
            </button>
          ))}
        </nav>

        <div className="mx-4 mb-4 p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} />
            <span className="text-sm font-semibold">AI in action</span>
          </div>
          <p className="text-xs leading-relaxed opacity-90">
            Find your perfect match! Explore and complete new matches with higher precision.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="mx-4 mb-6 flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search matches, locations, preferences"
                  className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
                />
              </div>

              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <button className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-100">
                {profileLoading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                ) : (
                  <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                )}
              </button>
            </div>
          </div>

          {/* My profile summary from saved data */}
          {profile && (
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Your profile</h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                {profile.bio && <span className="max-w-md truncate">{profile.bio}</span>}
                {profile.age && <span>Age {profile.age}</span>}
                {profile.gender && <span className="capitalize">{profile.gender.replace('_', ' ')}</span>}
                {profile.location?.city && (
                  <span>{[profile.location.city, profile.location.state].filter(Boolean).join(', ')}</span>
                )}
                {profile.preferences?.budgetMin != null && profile.preferences?.budgetMax != null && (
                  <span className="flex items-center gap-1">
                    <DollarSign size={14} /> ₹{profile.preferences.budgetMin / 1000}k–₹{profile.preferences.budgetMax / 1000}k/mo
                  </span>
                )}
                {profile.trustScore != null && (
                  <span className="text-emerald-600 font-medium">Trust score: {profile.trustScore}%</span>
                )}
              </div>
            </div>
          )}
        </header>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">Discover Matches</h2>
                  <p className="text-gray-500">Swipe right to connect, left to pass.</p>
                </div>

                <div className="relative h-[600px] flex items-center justify-center">
                  <AnimatePresence>
                    {swipeCards.length > 0 ? (
                      swipeCards.map(
                        (card, index) =>
                          index < 3 && (
                            <motion.div
                              key={card.id}
                              className="absolute w-full max-w-md"
                              style={{ zIndex: swipeCards.length - index }}
                              initial={
                                index === 0
                                  ? { scale: 1, y: 0, opacity: 1 }
                                  : { scale: 0.95 - index * 0.05, y: index * 10, opacity: 1 - index * 0.3 }
                              }
                              animate={{
                                scale: 1 - index * 0.05,
                                y: index * 10,
                                opacity: 1 - index * 0.3,
                              }}
                              exit={{ x: 1000, opacity: 0, rotate: 45 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                                <div className="relative h-80">
                                  <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                                  <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                                    {card.match}% Match
                                  </div>
                                </div>
                                <div className="p-6">
                                  <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                                    {card.name}, {card.age}
                                  </h3>
                                  <p className="text-gray-600 mb-4 leading-relaxed">{card.bio}</p>
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {card.tags.map((tag, i) => (
                                      <span
                                        key={i}
                                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="flex items-center gap-2 text-gray-700">
                                    <DollarSign size={20} className="text-blue-600" />
                                    <span className="font-semibold">Budget: ₹{card.budget}/month</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )
                      )
                    ) : (
                      <div className="text-center text-gray-400">
                        <Users size={64} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg">No more profiles to show</p>
                        <p className="text-sm">Check back later for new matches!</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {swipeCards.length > 0 && (
                  <div className="flex items-center justify-center gap-6 mt-8">
                    <button
                      onClick={() => handleSwipe('left')}
                      className="w-16 h-16 bg-red-50 hover:bg-red-100 rounded-full flex items-center justify-center text-red-500 transition-all hover:scale-110 shadow-md"
                    >
                      <X size={32} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={() => handleSwipe('right')}
                      className="w-16 h-16 bg-emerald-50 hover:bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 transition-all hover:scale-110 shadow-md"
                    >
                      <Heart size={32} strokeWidth={2.5} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart size={20} className="text-blue-600" />
                  Requests Received
                </h3>
                <div className="space-y-4">
                  {requestsReceived.map((request) => (
                    <div key={request.id} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={request.image}
                          alt={request.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm">
                            {request.name}, {request.age}
                          </p>
                          <p className="text-xs text-emerald-600 font-medium">{request.match}% Match</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          Accept
                        </button>
                        <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Send size={20} className="text-blue-600" />
                  Sent Requests
                </h3>
                <div className="space-y-3">
                  {sentRequests.map((request) => (
                    <div key={request.id} className="flex items-center gap-3">
                      <img
                        src={request.image}
                        alt={request.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">
                          {request.name}, {request.age}
                        </p>
                        <p className="text-xs text-gray-500">{request.match}% Match</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          request.status === 'pending'
                            ? 'bg-yellow-50 text-yellow-600'
                            : request.status === 'accepted'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {request.status === 'pending' && <Clock size={12} className="inline mr-1" />}
                        {request.status === 'accepted' && <Check size={12} className="inline mr-1" />}
                        {request.status === 'rejected' && <XCircle size={12} className="inline mr-1" />}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users size={20} className="text-blue-600" />
                  Active Matches
                </h3>
                <div className="space-y-3">
                  {activeMatches.map((match) => (
                    <div key={match.id} className="flex items-center gap-3">
                      <img
                        src={match.image}
                        alt={match.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{match.name}</p>
                        <p className="text-xs text-emerald-600 font-medium">{match.match}% Match</p>
                      </div>
                      <button className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                        <MessageCircle size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={action.onClick}
                        className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            action.color === 'blue'
                              ? 'bg-blue-100 text-blue-600'
                              : action.color === 'purple'
                              ? 'bg-purple-100 text-purple-600'
                              : 'bg-emerald-100 text-emerald-600'
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Target size={20} className="text-blue-600" />
                  Compatibility Insights
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center w-24 h-24 mb-2">
                      <svg className="w-full h-full -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="#3B82F6"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={2 * Math.PI * 40}
                          strokeDashoffset={2 * Math.PI * 40 * (1 - 0.89)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-2xl font-bold text-gray-900">89%</span>
                    </div>
                    <p className="text-sm text-gray-600">Average Match Score</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <p className="text-2xl font-bold text-blue-600">24</p>
                      <p className="text-xs text-gray-600">Nearby Matches</p>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 rounded-xl">
                      <p className="text-2xl font-bold text-emerald-600">91%</p>
                      <p className="text-xs text-gray-600">Lifestyle Match</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
