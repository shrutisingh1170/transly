import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { 
  Upload, 
  Scan, 
  Check, 
  Edit3, 
  Languages,
  FileImage,
  Zap,
  Eye,
  Download
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const OCRScreen = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('नमस्ते, म नेपालबाट हुँ। यो AI प्रविधि प्रयोग गरेर पाठ निकाल्न सकिन्छ।');
  const [isScanning, setIsScanning] = useState(false);
  const [detectedScript, setDetectedScript] = useState('Nepali');
  const [confidence, setConfidence] = useState(96);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        simulateScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <Scan className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2>AI Text Extraction</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced multimodal OCR with script detection
            </p>
          </div>
        </div>
      </motion.div>

      {/* Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-none">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                  <Languages className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Detected Script</p>
                  <p className="font-medium">{detectedScript}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                  <Zap className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Confidence</p>
                  <p className="font-medium">{confidence}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Mixed-Language Support</p>
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                    ON
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Upload Preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3>Upload Preview</h3>
                <Badge variant="outline" className="gap-1">
                  <Eye className="h-3 w-3" />
                  Text Regions
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {uploadedImage ? (
                <div className="relative">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded document" 
                    className="w-full h-[400px] object-contain rounded-lg bg-gray-100 dark:bg-gray-800"
                  />
                  {/* Simulated text detection boxes */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isScanning ? 0.7 : 0 }}
                    className="absolute inset-0 border-2 border-blue-500 rounded-lg"
                  >
                    {isScanning && (
                      <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
                    )}
                  </motion.div>
                  
                  {/* Highlighted text regions */}
                  {!isScanning && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute top-12 left-8 right-8 h-16 border-2 border-green-500 rounded bg-green-500/10"
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="absolute top-32 left-8 right-8 h-12 border-2 border-green-500 rounded bg-green-500/10"
                      />
                    </>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="text-center space-y-3">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-full inline-block">
                      <Upload className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Upload Document Image</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        PNG, JPG, PDF supported
                      </p>
                    </div>
                  </div>
                </label>
              )}

              {uploadedImage && (
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => setUploadedImage(null)}>
                    Clear
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                    onClick={simulateScan}
                    disabled={isScanning}
                  >
                    <Scan className="h-4 w-4 mr-2" />
                    {isScanning ? 'Scanning...' : 'Re-Scan'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right: Extracted Text */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3>Extracted Text</h3>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                    {extractedText.length} chars
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                className="min-h-[400px] font-['Noto_Sans_Devanagari'] text-lg resize-none"
                placeholder="Extracted text will appear here..."
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => {
                    navigator.clipboard.writeText(extractedText);
                    alert('Text copied to clipboard!');
                  }}
                >
                  <Edit3 className="h-4 w-4" />
                  Copy Text
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => {
                    const blob = new Blob([extractedText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `ocr-extracted-${Date.now()}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  <Download className="h-4 w-4" />
                  Download .txt
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => {
                    // Export as PDF (simplified version)
                    const pdfContent = `OCR Extracted Text\n${'='.repeat(50)}\n\n${extractedText}\n\n${'='.repeat(50)}\nExtracted: ${new Date().toLocaleString()}`;
                    const blob = new Blob([pdfContent], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `ocr-extracted-${Date.now()}.pdf.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  <Download className="h-4 w-4" />
                  Download .pdf
                </Button>
                <Button 
                  className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={() => {
                    // Export to Dashboard
                    const exportData = {
                      text: extractedText,
                      timestamp: new Date().toISOString(),
                      type: 'ocr',
                    };
                    localStorage.setItem('ocr-export', JSON.stringify(exportData));
                    alert('Text exported to Dashboard!');
                  }}
                >
                  <Languages className="h-4 w-4" />
                  Export to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <FileImage className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium mb-1">AI-Powered Recognition</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our advanced OCR engine supports Nepali (Devanagari) and Sinhalese scripts with
                  mixed-language detection, achieving 96%+ accuracy on printed and handwritten text.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
