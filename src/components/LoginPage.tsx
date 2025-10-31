import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserRole } from '../lib/types';
import logo from 'figma:asset/5966a0e6bbfc4e4f5ff5d979141f679a95ed0fe0.png';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => boolean;
  onBack?: () => void;
}

export const LoginPage = ({ onLogin, onBack }: LoginPageProps) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('general');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(loginEmail, loginPassword);
    if (!success) {
      toast.error('Invalid credentials. Try demo@transly.com');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info('Signup feature - use demo accounts instead');
  };

  const handleDemoLogin = (role: UserRole) => {
    const demoAccounts: Record<UserRole, string> = {
      general: 'demo@transly.com',
      educator: 'raj@transly.com',
      admin: 'admin@transly.com',
    };
    onLogin(demoAccounts[role], 'password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {onBack && (
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 hover:bg-white/50 dark:hover:bg-black/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        )}
        <Card className="w-full">
          <CardHeader className="text-center">
            <img src={logo} alt="Transly Logo" className="w-24 h-24 mx-auto mb-4" />
            <CardTitle>Welcome to Transly</CardTitle>
            <CardDescription>
              AI-Powered Multilingual Translation & Learning Platform
            </CardDescription>
          </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="demo@transly.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  Login
                </Button>
              </form>
              
              <div className="mt-6">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Quick Demo Access
                </p>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDemoLogin('general')}
                  >
                    Demo User (General)
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDemoLogin('educator')}
                  >
                    Demo Educator
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDemoLogin('admin')}
                  >
                    Demo Admin
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    placeholder="John Doe"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="john@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-role">I am a...</Label>
                  <Select value={signupRole} onValueChange={(value) => setSignupRole(value as UserRole)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General User</SelectItem>
                      <SelectItem value="educator">Educator</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-orange-600">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        </Card>
      </div>
    </div>
  );
};
