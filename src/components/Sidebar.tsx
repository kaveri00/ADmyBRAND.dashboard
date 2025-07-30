import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Target, 
  Users, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  PieChart,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/', active: true },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Target, label: 'Campaigns', href: '/campaigns' },
  { icon: PieChart, label: 'Audience', href: '/audience' },
  { icon: TrendingUp, label: 'Performance', href: '/performance' },
  { icon: Users, label: 'Team', href: '/team' },
];

const bottomItems = [
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help', href: '/help' },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isCollapsed ? 80 : 256,
        transition: { duration: 0.3, ease: 'easeInOut' }
      }}
      className="fixed left-0 top-0 z-40 h-full bg-card/95 backdrop-blur-xl border-r border-border"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold">ADmyBRAND</h1>
                  <p className="text-xs text-muted-foreground">AI Insights</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn(
              "h-8 w-8 p-0 hover:bg-primary/10",
              isCollapsed && "mx-auto"
            )}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent/50",
                  isActive ? "bg-gradient-primary text-white shadow-glow" : "text-muted-foreground",
                  isCollapsed && "justify-center"
                )
              }
            >
              <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 space-y-2 border-t border-border">
          {bottomItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent/50 text-muted-foreground",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}