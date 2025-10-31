import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Users, 
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  Clock,
  Flag,
  Send,
  Award
} from 'lucide-react';

interface Contribution {
  id: number;
  user: {
    name: string;
    role: string;
    badge: string;
  };
  translation: {
    original: string;
    suggested: string;
  };
  status: 'reviewed' | 'verified' | 'pending';
  likes: number;
  comments: number;
  timestamp: string;
}

export const CommunityPlatform = () => {
  const [contributions] = useState<Contribution[]>([
    {
      id: 1,
      user: {
        name: 'Priya Sharma',
        role: 'Linguist',
        badge: 'Linguist'
      },
      translation: {
        original: 'नमस्ते, म नेपालबाट हुँ।',
        suggested: 'Greetings, I am from Nepal.'
      },
      status: 'verified',
      likes: 24,
      comments: 5,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      user: {
        name: 'Raj Kumar',
        role: 'Translator',
        badge: 'Translator'
      },
      translation: {
        original: 'शिक्षा सबैका लागि महत्त्वपूर्ण छ।',
        suggested: 'Education is crucial for everyone.'
      },
      status: 'reviewed',
      likes: 18,
      comments: 3,
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      user: {
        name: 'Maya Thapa',
        role: 'Reviewer',
        badge: 'Reviewer'
      },
      translation: {
        original: 'धन्यवाद',
        suggested: 'Thank you very much'
      },
      status: 'pending',
      likes: 7,
      comments: 1,
      timestamp: '1 day ago'
    },
  ]);

  const [showContributeModal, setShowContributeModal] = useState(false);
  const [contributionText, setContributionText] = useState('');

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Linguist':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300';
      case 'Translator':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'Reviewer':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'reviewed':
        return <CheckCircle2 className="h-4 w-4 text-blue-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'reviewed':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'pending':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2>Community & Collaboration</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Share translations and review community contributions
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-medium">2,847</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Contributors</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-medium">15,234</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Translations</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-medium">12,891</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Verified</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                <p className="text-2xl font-medium">847</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Top Contributors</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Contribute Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">Have a better translation?</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Share your knowledge with the community
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => setShowContributeModal(!showContributeModal)}
                className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600"
              >
                <Send className="h-4 w-4" />
                Contribute Correction
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contribution Form */}
      {showContributeModal && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card>
            <CardHeader>
              <h3>Submit Your Translation</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm mb-2 block">Original Text</label>
                <Textarea
                  placeholder="Enter the original text..."
                  className="font-['Noto_Sans_Devanagari']"
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Your Translation</label>
                <Textarea
                  value={contributionText}
                  onChange={(e) => setContributionText(e.target.value)}
                  placeholder="Enter your suggested translation..."
                />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600">
                  Submit for Review
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowContributeModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Community Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3>Recent Contributions</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">All</Button>
                <Button variant="outline" size="sm">Verified</Button>
                <Button variant="outline" size="sm">Pending</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contributions.map((contribution, index) => (
                <motion.div
                  key={contribution.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg"
                >
                  {/* User Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                          {contribution.user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{contribution.user.name}</p>
                          <Badge className={getBadgeColor(contribution.user.badge)}>
                            {contribution.user.badge}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {contribution.timestamp}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(contribution.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(contribution.status)}
                        <span className="capitalize">{contribution.status}</span>
                      </div>
                    </Badge>
                  </div>

                  {/* Translation */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Original</p>
                      <p className="font-['Noto_Sans_Devanagari'] text-lg">
                        {contribution.translation.original}
                      </p>
                    </div>
                    <div className="p-3 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Suggested Translation</p>
                      <p className="text-lg">
                        {contribution.translation.suggested}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      {contribution.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      {contribution.comments} Comments
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 ml-auto">
                      <Flag className="h-4 w-4" />
                      Report
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Contributors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-600" />
              <h3>Top Contributors This Month</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: 'Priya Sharma', contributions: 247, badge: 'Linguist' },
                { name: 'Raj Kumar', contributions: 198, badge: 'Translator' },
                { name: 'Maya Thapa', contributions: 156, badge: 'Reviewer' },
              ].map((contributor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg text-center border border-amber-200 dark:border-amber-800"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full flex items-center justify-center text-white mx-auto mb-3">
                    {index + 1}
                  </div>
                  <p className="font-medium mb-1">{contributor.name}</p>
                  <Badge className={getBadgeColor(contributor.badge)}>
                    {contributor.badge}
                  </Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {contributor.contributions} contributions
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
