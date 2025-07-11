import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  className?: string;
}

export function FileUpload({ 
  onFileUpload, 
  accept = { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
  maxFiles = 1,
  className 
}: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    multiple: false
  });

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
          "hover:border-primary hover:bg-yuan-primary-light/20",
          isDragActive ? "border-primary bg-yuan-primary-light/30" : "border-muted-foreground/25"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 rounded-full bg-yuan-primary-light">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          {isDragActive ? (
            <p className="text-lg font-medium">Solte o arquivo aqui...</p>
          ) : (
            <div className="space-y-2">
              <p className="text-lg font-medium">
                Clique aqui ou arraste seu arquivo Excel
              </p>
              <p className="text-sm text-muted-foreground">
                Suporte para arquivos .xlsx (máximo 10MB)
              </p>
            </div>
          )}
        </div>
      </div>
      
      {acceptedFiles.length > 0 && (
        <div className="mt-4 p-4 bg-yuan-primary-light/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <File className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{acceptedFiles[0].name}</span>
              <span className="text-xs text-muted-foreground">
                ({(acceptedFiles[0].size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.reload()}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}