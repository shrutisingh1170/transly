import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Upload, FileText, Image, Download, Eye } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockDocuments } from '../lib/mockData';
import { toast } from 'sonner@2.0.3';
import { Badge } from './ui/badge';

export const DocumentUpload = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [selectedLanguage, setSelectedLanguage] = useState<'nepali' | 'sinhalese'>('nepali');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = () => {
    setIsUploading(true);
    // Simulate upload and OCR processing
    setTimeout(() => {
      const newDoc = {
        id: `doc-${Date.now()}`,
        userId: 'user-1',
        name: 'New_Document.pdf',
        type: 'pdf',
        uploadedAt: new Date().toISOString(),
        sourceLanguage: selectedLanguage,
        originalText: selectedLanguage === 'nepali' ? 'नयाँ कागजात' : 'නව ලේඛනය',
        translatedText: 'New document',
        status: 'completed' as const,
      };
      setDocuments([newDoc, ...documents]);
      setIsUploading(false);
      toast.success('Document uploaded and translated successfully!');
    }, 2000);
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image') || type === 'jpg' || type === 'png') {
      return <Image className="h-5 w-5" />;
    }
    return <FileText className="h-5 w-5" />;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      completed: { variant: 'default', label: 'Completed' },
      processing: { variant: 'secondary', label: 'Processing...' },
      error: { variant: 'destructive', label: 'Error' },
    };
    const config = variants[status] || variants.completed;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="mb-2">Document Translation & OCR</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Upload documents and images to extract and translate text
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
          <CardDescription>
            Supported formats: PDF, DOCX, PPT, XLS, TXT, JPG, PNG
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="mb-2">Drag and drop files here, or click to browse</p>
            <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <label className="text-sm mb-2 block">Source Language</label>
              <Select value={selectedLanguage} onValueChange={(val) => setSelectedLanguage(val as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nepali">Nepali</SelectItem>
                  <SelectItem value="sinhalese">Sinhalese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 flex items-end">
              <Button
                onClick={handleFileUpload}
                disabled={isUploading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isUploading ? 'Processing...' : 'Upload & Translate'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
          <CardDescription>Your uploaded and translated documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    {getFileIcon(doc.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1">{doc.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>
                        {doc.sourceLanguage.charAt(0).toUpperCase() + doc.sourceLanguage.slice(1)} → English
                      </span>
                      <span>•</span>
                      <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {getStatusBadge(doc.status)}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.info('Preview feature (mock)')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success('Download started')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                📄
              </div>
              <h4 className="mb-2">OCR Technology</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Extract text from scanned documents and images
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                📚
              </div>
              <h4 className="mb-2">Batch Processing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload and translate multiple documents at once
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                💾
              </div>
              <h4 className="mb-2">Export Options</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Save translations in various formats
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
