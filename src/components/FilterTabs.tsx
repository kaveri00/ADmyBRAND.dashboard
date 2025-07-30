import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Filter } from 'lucide-react';

interface FilterTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  activeChannel: string;
  onChannelChange: (channel: string) => void;
}

const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'campaigns', label: 'All Campaigns' },
  { value: 'channels', label: 'Channels' },
  { value: 'reports', label: 'Reports' },
];

const channels = [
  { value: 'all', label: 'All Channels' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'google', label: 'Google Ads' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter' },
];

export function FilterTabs({ activeTab, onTabChange, activeChannel, onChannelChange }: FilterTabsProps) {
  return (
    <div className="flex items-center justify-between">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="relative data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
            >
              {tab.label}
              {activeTab === tab.value && (
                <motion.div
                  className="absolute inset-0 bg-gradient-primary rounded-md -z-10"
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="flex items-center space-x-2 ml-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>{channels.find(c => c.value === activeChannel)?.label}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {channels.map((channel) => (
              <DropdownMenuItem
                key={channel.value}
                onClick={() => onChannelChange(channel.value)}
                className={activeChannel === channel.value ? "bg-primary/10 text-primary" : ""}
              >
                {channel.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}