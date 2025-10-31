import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { TranslationTool } from './TranslationTool';
import { DocumentUpload } from './DocumentUpload';
import { VoiceAssistant } from './VoiceAssistant';
import { ChatbotTutor } from './ChatbotTutor';
import { LearningQuizzes } from './LearningQuizzes';
import { Leaderboard } from './Leaderboard';
import { UserLibrary } from './UserLibrary';
import { Settings } from './Settings';
import { AdvancedFeaturesShowcase } from './AdvancedFeaturesShowcase';
import { EducatorDashboard } from './EducatorDashboard';
import { ResearcherDashboard } from './ResearcherDashboard';
import { Floating3DChatbot } from './Floating3DChatbot';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { ReportsDashboard } from './ReportsDashboard';
import { VoiceCommandsDashboard } from './VoiceCommandsDashboard';
import { ChatHistoryDashboard } from './ChatHistoryDashboard';
import { Button } from './ui/button';
import { useTheme } from '../lib/ThemeContext';
import {
  Languages,
  FileText,
  Mic,
  MessageSquare,
  Trophy,
  BookOpen,
  FolderOpen,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  BarChart3,
  Users,
  Sparkles,
  LayoutDashboard,
  FlaskConical,
  LineChart,
  FileBarChart,
  MicVocal,
  MessagesSquare,
} from 'lucide-react';
import logo from 'figma:asset/5966a0e6bbfc4e4f5ff5d979141f679a95ed0fe0.png';
import { Card, CardContent } from './ui/card';

type Page = 
  | 'translation' 
  | 'documents' 
  | 'voice' 
  | 'chatbot' 
  | 'quizzes' 
  | 'leaderboard' 
  | 'library' 
  | 'settings'
  | 'admin'
  | 'advanced'
  | 'educator-dashboard'
  | 'researcher-dashboard'
  | 'analytics'
  | 'reports'
  | 'voice-commands'
  | 'chat-history';

export const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState<Page>('translation');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navigationItems = [
    { id: 'translation' as Page, label: 'Translation', icon: Languages, roles: ['general', 'educator', 'admin'] },
    { id: 'documents' as Page, label: 'Documents', icon: FileText, roles: ['general', 'educator', 'admin'] },
    { id: 'voice' as Page, label: 'Voice Assistant', icon: Mic, roles: ['general', 'educator', 'admin'] },
    { id: 'chatbot' as Page, label: 'AI Tutor', icon: MessageSquare, roles: ['general', 'educator', 'admin'] },
    { id: 'quizzes' as Page, label: 'Quizzes', icon: BookOpen, roles: ['general', 'educator', 'admin'] },
    { id: 'leaderboard' as Page, label: 'Leaderboard', icon: Trophy, roles: ['general', 'educator', 'admin'] },
    { id: 'library' as Page, label: 'My Library', icon: FolderOpen, roles: ['general', 'educator', 'admin'] },
    { id: 'advanced' as Page, label: 'Advanced Features', icon: Sparkles, roles: ['general', 'educator', 'admin'] },
    { id: 'analytics' as Page, label: 'Analytics', icon: LineChart, roles: ['general', 'educator', 'admin'] },
    { id: 'reports' as Page, label: 'Reports', icon: FileBarChart, roles: ['general', 'educator', 'admin'] },
    { id: 'voice-commands' as Page, label: 'Voice Commands', icon: MicVocal, roles: ['general', 'educator', 'admin'] },
    { id: 'chat-history' as Page, label: 'Chat History', icon: MessagesSquare, roles: ['general', 'educator', 'admin'] },
    { id: 'educator-dashboard' as Page, label: 'Educator Hub', icon: LayoutDashboard, roles: ['educator', 'admin'] },
    { id: 'researcher-dashboard' as Page, label: 'Research Hub', icon: FlaskConical, roles: ['admin'] },
    { id: 'admin' as Page, label: 'Admin Panel', icon: BarChart3, roles: ['admin'] },
  ];

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || 'general')
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'translation':
        return <TranslationTool />;
      case 'documents':
        return <DocumentUpload />;
      case 'voice':
        return <VoiceAssistant />;
      case 'chatbot':
        return <ChatbotTutor />;
      case 'quizzes':
        return <LearningQuizzes />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'library':
        return <UserLibrary />;
      case 'settings':
        return <Settings />;
      case 'advanced':
        return <AdvancedFeaturesShowcase />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'reports':
        return <ReportsDashboard />;
      case 'voice-commands':
        return <VoiceCommandsDashboard />;
      case 'chat-history':
        return <ChatHistoryDashboard />;
      case 'educator-dashboard':
        return <EducatorDashboard />;
      case 'researcher-dashboard':
        return <ResearcherDashboard />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <TranslationTool />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-3">
              <img src={logo} alt="Transly" className="h-10 w-10" />
              <div>
                <h1 className="text-lg">Transly</h1>
                <p className="text-xs text-gray-500">AI Translation Platform</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                {user?.name.charAt(0)}
              </div>
              <div className="hidden lg:block">
                <p className="text-sm">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:sticky lg:translate-x-0 top-[73px] left-0 h-[calc(100vh-73px)] w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform z-40 overflow-y-auto`}
        >
          <nav className="p-4 space-y-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => {
                  setCurrentPage('settings');
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'settings'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <SettingsIcon className="h-5 w-5" />
                <span>Settings</span>
              </button>
              
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-red-600 dark:text-red-400 transition-colors mt-1"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </nav>

          {/* User Stats in Sidebar */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Points</span>
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded">
                  {user?.points}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Rank</span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                  #{user?.rank}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Badges</span>
                <span>{user?.badges.length} 🏆</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Floating 3D Chatbot */}
      <Floating3DChatbot />
    </div>
  );
};

// Admin Panel Component
const AdminPanel = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="mb-2">Admin Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage users, AI models, and system analytics
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-3 text-blue-600" />
            <div className="text-3xl mb-2">500+</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Languages className="h-8 w-8 mx-auto mb-3 text-purple-600" />
            <div className="text-3xl mb-2">10K+</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Translations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-3 text-orange-600" />
            <div className="text-3xl mb-2">50+</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Quizzes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-3 text-green-600" />
            <div className="text-3xl mb-2">99%</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="mb-4">System Management</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Languages className="h-4 w-4 mr-2" />
              Update AI Models
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="h-4 w-4 mr-2" />
              Manage Quizzes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
