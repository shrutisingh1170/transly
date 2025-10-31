import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { useTheme } from '../lib/ThemeContext';
import { useAuth } from '../lib/AuthContext';
import { toast } from 'sonner@2.0.3';
import { Moon, Sun, Download, RefreshCw, Bell, Lock } from 'lucide-react';

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [offlineMode, setOfflineMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(false);
  const [defaultLanguage, setDefaultLanguage] = useState('nepali');

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  const handleDownloadModels = () => {
    toast.info('AI models are already preloaded for offline use');
  };

  const handleClearCache = () => {
    toast.success('Cache cleared successfully');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="mb-2">Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account and application preferences
        </p>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={user?.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user?.email} disabled />
            <p className="text-xs text-gray-500">Email cannot be changed</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue={user?.role} disabled className="capitalize" />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how Transly looks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Theme</Label>
              <p className="text-sm text-gray-500">Toggle between light and dark mode</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="w-24"
            >
              {theme === 'dark' ? (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Language Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Language Preferences</CardTitle>
          <CardDescription>Set your default translation languages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="default-source">Default Source Language</Label>
            <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
              <SelectTrigger id="default-source">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nepali">Nepali</SelectItem>
                <SelectItem value="sinhalese">Sinhalese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-translate</Label>
              <p className="text-sm text-gray-500">Automatically translate as you type</p>
            </div>
            <Switch checked={autoTranslate} onCheckedChange={setAutoTranslate} />
          </div>
        </CardContent>
      </Card>

      {/* Offline & Data */}
      <Card>
        <CardHeader>
          <CardTitle>Offline & Data Management</CardTitle>
          <CardDescription>Manage offline functionality and storage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Offline Mode</Label>
              <p className="text-sm text-gray-500">Use preloaded AI models offline</p>
            </div>
            <Switch checked={offlineMode} onCheckedChange={setOfflineMode} />
          </div>

          <Separator />

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={handleDownloadModels}>
              <Download className="h-4 w-4 mr-2" />
              Download AI Models (Already Preloaded)
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleClearCache}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Cache & Temporary Files
            </Button>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                💾
              </div>
              <div>
                <h4 className="mb-1 text-blue-900 dark:text-blue-100">Storage Usage</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  AI Models: 250 MB • Cached Data: 45 MB • Total: 295 MB
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Notifications</Label>
              <p className="text-sm text-gray-500">Get updates about quizzes and achievements</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle>Privacy & Security</CardTitle>
          <CardDescription>Protect your account and data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>

          <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                🔒
              </div>
              <div>
                <h4 className="mb-1 text-purple-900 dark:text-purple-100">Data Privacy</h4>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Transly is not meant for collecting PII or securing sensitive data. All translations are processed locally with preloaded AI models for maximum privacy.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>About Transly</CardTitle>
          <CardDescription>Application information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Version</span>
            <span>1.0.0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">AI Model Version</span>
            <span>v2.5.1</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
            <span>October 2025</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
