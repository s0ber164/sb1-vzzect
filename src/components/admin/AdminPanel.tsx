import React, { useCallback } from 'react';
import { CSVUploader } from './CSVUploader';
import { Prop } from '../../types';
import { Shield } from 'lucide-react';

interface AdminPanelProps {
  onPropsUploaded: (props: Partial<Prop>[]) => void;
}

export function AdminPanel({ onPropsUploaded }: AdminPanelProps) {
  const handlePropsUploaded = useCallback((props: Partial<Prop>[]) => {
    onPropsUploaded(props);
    alert(`Successfully added ${props.length} props`);
  }, [onPropsUploaded]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-8 h-8" />
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Upload Props</h2>
        <CSVUploader onPropsUploaded={handlePropsUploaded} />
      </div>
    </div>
  );
}