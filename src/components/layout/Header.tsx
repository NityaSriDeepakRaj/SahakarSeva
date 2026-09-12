'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Shield, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  ChevronDown, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  HelpCircle, 
  FileText,
  HeartHandshake
} from 'lucide-react';
import { UserRole } from '@/types';

export default function Header() {
  const { user, role, isAuthenticated, logout, switchRole } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', show: true },
    { name: 'Services', href: '/services', show: true },
    { name: 'Workers', href: '/workers', show: true },
    { name: 'My Bookings', href: '/bookings', show: true },
    { name: 'Earnings & Ledger', href: '/earnings', show: role === 'worker' || role === 'admin' },
    { name: 'Appeals Tribunal', href: '/appeal', show: role === 'worker' || role === 'admin' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border-gray py-3'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-coop-green flex items-center justify-center text-white shadow-coop transition-transform group-hover:scale-105">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl tracking-tight text-forest-green leading-none">
                SAHAYAK SEVA
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-soft-teal mt-0.5">
                Worker-Owned Cooperative
              </span>
            </div>
          </Link>

          {/* Navigation - Public vs Post-Auth */}
          {!isAuthenticated ? (
            /* Pre-Auth Navigation: Logo | (empty) | Sign In | Join as Worker */
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/auth/signin"
                className="text-sm font-semibold text-neutral-dark hover:text-coop-green px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup?role=worker"
                className="text-sm font-semibold text-white bg-coop-green hover:bg-forest-green px-5 py-2.5 rounded-lg shadow-coop hover:shadow-coop-lg transition-all"
              >
                Join as Worker
              </Link>
            </div>
          ) : (
            /* Post-Auth Navigation: Links appear AFTER sign-in */
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.filter(l => l.show).map((link) => {
                const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'text-coop-green bg-sage-green/20 font-semibold'
                        : 'text-gray-text hover:text-neutral-dark hover:bg-gray-100'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Action Controls for Authenticated User */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-3">
              {/* Live Role Switcher Button */}
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => switchRole(e.target.value as UserRole)}
                  className="text-xs font-semibold bg-sage-green/25 text-forest-green border border-sage-green/40 px-3 py-1.5 rounded-full cursor-pointer hover:bg-sage-green/35 transition-colors focus:outline-none"
                  aria-label="Switch Active Role Persona"
                >
                  <option value="worker">Role: Worker (Sunita)</option>
                  <option value="customer">Role: Customer (Rahul)</option>
                  <option value="admin">Role: Admin (Priya)</option>
                  <option value="business">Role: Business (Amit)</option>
                </select>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
                  aria-expanded={profileDropdownOpen}
                  aria-haspopup="true"
                >
                  <img
                    src={user?.profilePhotoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120'}
                    alt={user?.fullName || 'User'}
                    className="w-8 h-8 rounded-full object-cover border border-sage-green"
                  />
                  <span className="text-xs font-semibold text-neutral-dark max-w-[100px] truncate">
                    {user?.fullName?.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-text" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-border-gray py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-text uppercase font-bold tracking-wider">Signed in as</p>
                      <p className="text-sm font-semibold text-neutral-dark truncate">{user?.fullName}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-coop-green/10 text-coop-green">
                        {role.toUpperCase()}
                      </span>
                    </div>

                    <Link
                      href="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-dark hover:bg-light-gray"
                    >
                      <UserIcon className="w-4 h-4 text-gray-400" />
                      Profile Settings
                    </Link>
                    <Link
                      href="/bookings"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-dark hover:bg-light-gray"
                    >
                      <Calendar className="w-4 h-4 text-gray-400" />
                      Booking History
                    </Link>
                    <Link
                      href="/earnings"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-dark hover:bg-light-gray"
                    >
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      Wage Transparency
                    </Link>
                    <Link
                      href="/faqs"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-dark hover:bg-light-gray"
                    >
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                      Help & FAQs
                    </Link>

                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Hamburger Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-dark hover:text-coop-green hover:bg-gray-100 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border-gray shadow-xl px-4 pt-2 pb-6 space-y-3">
          {!isAuthenticated ? (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/auth/signin"
                className="w-full text-center py-2.5 px-4 rounded-lg font-semibold text-neutral-dark bg-gray-100"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup?role=worker"
                className="w-full text-center py-2.5 px-4 rounded-lg font-semibold text-white bg-coop-green"
              >
                Join as Worker
              </Link>
              <div className="pt-2 border-t border-gray-100 space-y-1">
                <Link href="/services" className="block py-2 text-sm text-gray-text hover:text-neutral-dark">Browse Services</Link>
                <Link href="/workers" className="block py-2 text-sm text-gray-text hover:text-neutral-dark">Find Workers</Link>
                <Link href="/about" className="block py-2 text-sm text-gray-text hover:text-neutral-dark">About Sahayak Seva</Link>
                <Link href="/impact" className="block py-2 text-sm text-gray-text hover:text-neutral-dark">Impact Metrics</Link>
                <Link href="/contact" className="block py-2 text-sm text-gray-text hover:text-neutral-dark">Emergency Helpline & Contact</Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-light-gray rounded-xl">
                <img
                  src={user?.profilePhotoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120'}
                  alt={user?.fullName || 'User'}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-neutral-dark">{user?.fullName}</p>
                  <p className="text-xs text-gray-text capitalize">Role: {role}</p>
                </div>
              </div>

              {/* Mobile Role Switcher */}
              <div className="p-2 border border-sage-green/40 rounded-lg bg-sage-green/10">
                <label className="text-xs font-semibold text-forest-green block mb-1">Switch Demo Persona:</label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => switchRole('worker')}
                    className={`text-xs py-1.5 rounded font-medium ${role === 'worker' ? 'bg-coop-green text-white' : 'bg-white text-neutral-dark'}`}
                  >
                    Worker
                  </button>
                  <button
                    onClick={() => switchRole('customer')}
                    className={`text-xs py-1.5 rounded font-medium ${role === 'customer' ? 'bg-coop-green text-white' : 'bg-white text-neutral-dark'}`}
                  >
                    Customer
                  </button>
                  <button
                    onClick={() => switchRole('admin')}
                    className={`text-xs py-1.5 rounded font-medium ${role === 'admin' ? 'bg-coop-green text-white' : 'bg-white text-neutral-dark'}`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                {navLinks.filter(l => l.show).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 px-3 text-sm font-medium rounded-lg text-neutral-dark hover:bg-gray-100"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link href="/profile" className="block py-2 px-3 text-sm font-medium rounded-lg text-neutral-dark hover:bg-gray-100">
                  Profile Settings
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left py-2 px-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
