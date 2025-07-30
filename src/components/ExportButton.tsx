import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Table } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

export function ExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: 'csv' | 'pdf') => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Export Complete",
      description: `Your data has been exported as ${format.toUpperCase()}`,
    });
    
    setIsExporting(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting} className="relative overflow-hidden">
          {isExporting ? (
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Download className="h-4 w-4" />
              </motion.div>
              <span>Exporting...</span>
            </motion.div>
          ) : (
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={() => handleExport('csv')}
          className="flex items-center space-x-2"
        >
          <Table className="h-4 w-4" />
          <span>Export as CSV</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport('pdf')}
          className="flex items-center space-x-2"
        >
          <FileText className="h-4 w-4" />
          <span>Export as PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}