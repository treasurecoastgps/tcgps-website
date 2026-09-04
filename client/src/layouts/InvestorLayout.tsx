import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard,
  PieChart,
  Building,
  FileText,
  DollarSign,
  MessageCircle,
  Settings,
  LogOut,
  Bell,
  FlaskConical,
  X,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/lib/contexts/AuthContext';
import logoPath from '@assets/tcgps-icon.png';

interface InvestorLayoutProps {
  children: React.ReactNode;
}

const InvestorLayout: React.FC<InvestorLayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const { user, logout, isDemo } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Paths are relative to the /app nest base (Wouter v3 nest behavior)
  const navigation = [
    { name: 'Dashboard',     href: '/dashboard',     icon: LayoutDashboard },
    { name: 'Portfolio',     href: '/portfolio',     icon: PieChart },
    { name: 'Properties',   href: '/properties',    icon: Building },
    { name: 'Documents',    href: '/documents',     icon: FileText },
    { name: 'Distributions', href: '/distributions', icon: DollarSign },
    { name: 'Support',      href: '/support',       icon: MessageCircle },
    { name: 'Settings',     href: '/settings',      icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const userInitials = user ? `${user.firstName[0]}${user.lastName[0]}` : 'U';

  // Notifications
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, read: false, title: 'Q1 Distribution Received',   body: '$600 deposited from Oceanview Apartments',              time: '2 hours ago' },
    { id: 2, read: false, title: 'Quarterly Report Available', body: 'Downtown Commercial Plaza — Q1 2025 report is ready',   time: '1 day ago' },
    { id: 3, read: true,  title: 'Investment Confirmed',       body: '$5,000 investment in Riverfront Multi-Family confirmed', time: '3 days ago' },
  ]);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));

  const currentPageName =
    navigation.find(item => location === item.href || location.startsWith(item.href + '/'))?.name
    || 'Dashboard';

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col
          transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src={logoPath} alt="Treasure Coast Logo" className="w-8 h-8 flex-shrink-0" />
            <div>
              <p className="text-navy font-bold text-sm leading-tight">Treasure Coast</p>
              <p className="text-medium-blue text-xs font-medium">Investor Portal</p>
            </div>
          </div>
          {/* Close button — mobile only */}
          <button
            className="md:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              location === item.href ||
              (item.href !== '/dashboard' && location.startsWith(item.href));

            return (
              <Link key={item.name} href={item.href}>
                <button
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`mr-3 h-4 w-4 flex-shrink-0 ${isActive ? 'text-sky-500' : 'text-gray-400'}`} />
                  {item.name}
                </button>
              </Link>
            );
          })}
        </nav>

        {/* User profile */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="bg-sky-100 text-sky-700 text-sm font-medium">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col min-h-screen">

        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 md:px-6 py-3.5 flex-shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Hamburger — mobile only */}
              <button
                className="md:hidden p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 flex-shrink-0"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
                {currentPageName}
              </h1>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative"
                  onClick={() => setNotifOpen(o => !o)}
                >
                  <Bell className="h-5 w-5 text-gray-500" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                      <span className="text-sm font-semibold text-gray-900">Notifications</span>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="text-xs text-sky-blue hover:text-medium-blue font-medium"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-8">No notifications</p>
                      ) : notifications.map(n => (
                        <div
                          key={n.id}
                          className={`flex items-start gap-3 px-4 py-3 ${!n.read ? 'bg-sky-50/60' : ''}`}
                        >
                          <div className="mt-1.5 flex-shrink-0">
                            <div className={`w-2 h-2 rounded-full ${!n.read ? 'bg-sky-blue' : 'bg-transparent'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{n.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.body}</p>
                            <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                          </div>
                          <button
                            onClick={() => dismiss(n.id)}
                            className="flex-shrink-0 text-gray-300 hover:text-gray-500 mt-0.5"
                            aria-label="Dismiss"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Public site link — hidden on very small screens */}
              <a href="/" className="hidden sm:block">
                <Button variant="outline" size="sm">Public Site</Button>
              </a>
            </div>
          </div>
        </header>

        {/* Demo banner */}
        {isDemo && (
          <div className="bg-sky-blue px-4 md:px-6 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 flex-shrink-0">
            <div className="flex items-center gap-2 text-white text-sm font-medium">
              <FlaskConical className="h-4 w-4 flex-shrink-0" />
              <span>You're viewing a demo — data is for illustration only.</span>
            </div>
            <a
              href="/register"
              className="text-xs font-semibold text-white underline underline-offset-2 hover:no-underline whitespace-nowrap"
            >
              Create Account →
            </a>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default InvestorLayout;
