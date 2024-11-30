import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { parseCSV } from '../../utils/csvParser';
import { Prop } from '../../types';

interface CSVUploaderProps {
  onPropsUploaded: (props: Partial<Prop>[]) => void;
}

export function CSVUploader({ onPropsUploaded }: CSVUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (!file) {
      setError('No file provided');
      return;
    }
    
    if (file.name.endsWith('.csv') || file.type === 'text/csv') {
      const text = await file.text();
      const props = parseCSV(text);
      if (props.length > 0) {
        onPropsUploaded(props);
      }
    } else {
      setError('Please upload a CSV file');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      const text = await file.text();
      const props = parseCSV(text);
      if (props.length > 0) {
        onPropsUploaded(props);
      }
    }
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-black bg-gray-50' : 'border-gray-300'
        }`}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="mb-2 text-lg font-medium">Drop your CSV file here</p>
        <p className="mb-4 text-sm text-gray-500">or</p>
        <label className="inline-block">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg cursor-pointer hover:bg-gray-800">
            Select File
          </span>
        </label>
        <p className="mt-4 text-xs text-gray-500">
          CSV must include: name, price, image_url, category, subcategory, quantity, dimensions
        </p>
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}
    </>
  );
}