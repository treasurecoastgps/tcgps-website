import React from 'react';
import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  FileBarChart, 
  DollarSign, 
  MessageSquare, 
  Settings,
  LogOut,
  Shield,
  Bell,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/contexts/AuthContext';
import logoPath from '@assets/tcgps-icon.png';

interface OpsLayoutProps {
  children: React.ReactNode;
}

const OpsLayout: React.FC<OpsLayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/ops/dashboard', icon: LayoutDashboard },
    { name: 'Investors', href: '/ops/investors', icon: Users },
    { name: 'Properties', href: '/ops/properties', icon: Building },
    { name: 'Reports', href: '/ops/reports', icon: FileBarChart },
    { name: 'Distributions', href: '/ops/distributions', icon: DollarSign },
    { name: 'Messages', href: '/ops/messages', icon: MessageSquare },
    { name: 'Settings', href: '/ops/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const userInitials = user ? `${user.firstName[0]}${user.lastName[0]}` : 'A';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800">
        {/* Logo */}
        <div className="flex items-center px-6 py-4 border-b border-slate-800">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-amber-500" />
            <div className="ml-3">
              <h1 className="text-white font-bold text-sm">Operations Portal</h1>
              <p className="text-slate-400 text-xs font-medium">Treasure Coast</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href || (item.href !== '/ops/dashboard' && location.startsWith(item.href));
            
            return (
              <Link key={item.name} href={item.href}>
                <button
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`mr-3 h-4 w-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  {item.name}
                </button>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-amber-100 text-amber-700 text-sm font-medium">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user?.role?.replace('_', ' ').toUpperCase()}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="ml-2 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <Shield className="h-6 w-6 text-amber-500 mr-2" />
                  {navigation.find(item => item.href === location)?.name || 'Dashboard'}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Internal operations and management
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search investors, properties..."
                  className="pl-10 w-64"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Role Badge */}
              <div className="hidden md:flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                {user?.role?.replace('_', ' ').toUpperCase()}
              </div>

              {/* Quick Links */}
              <Link href="/app/dashboard">
                <Button variant="outline" size="sm">
                  Investor Portal
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Public Site
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OpsLayout;