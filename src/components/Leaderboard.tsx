import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { mockUsers } from '../lib/mockData';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

export const Leaderboard = () => {
  const sortedUsers = [...mockUsers]
    .filter((u) => u.rank > 0)
    .sort((a, b) => a.rank - b.rank);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-orange-600" />;
    return null;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-red-500';
    return 'bg-gray-200 dark:bg-gray-700';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="mb-2">Leaderboard</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Top learners competing for the highest scores
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {sortedUsers.slice(0, 3).map((user, idx) => {
          const heights = ['h-48', 'h-40', 'h-36'];
          const orders = [1, 0, 2]; // Middle, Left, Right
          const actualIndex = orders.indexOf(idx);
          
          return (
            <div key={user.id} className={`flex flex-col items-center ${idx === 1 ? 'order-first' : ''}`}>
              <div className="mb-4">
                <Avatar className="h-20 w-20 border-4 border-white dark:border-gray-800 shadow-lg">
                  <AvatarFallback className={getRankBadge(user.rank)}>
                    <span className="text-white text-2xl">{user.name.charAt(0)}</span>
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className={`${getRankBadge(user.rank)} ${heights[actualIndex]} w-full rounded-t-lg flex flex-col items-center justify-start pt-4 text-white relative`}>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  {getRankIcon(user.rank)}
                </div>
                <div className="text-2xl mb-1">#{user.rank}</div>
                <div className="text-sm mb-1">{user.name.split(' ')[0]}</div>
                <div className="text-xs opacity-90">{user.points} pts</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>All Rankings</CardTitle>
          <CardDescription>Complete leaderboard standings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedUsers.map((user, idx) => (
              <div
                key={user.id}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  user.rank <= 3
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="w-12 text-center">
                  {user.rank <= 3 ? (
                    getRankIcon(user.rank)
                  ) : (
                    <span className="text-xl text-gray-600 dark:text-gray-400">#{user.rank}</span>
                  )}
                </div>

                <Avatar className="h-12 w-12">
                  <AvatarFallback className={user.rank <= 3 ? getRankBadge(user.rank) : 'bg-gray-200 dark:bg-gray-700'}>
                    <span className={user.rank <= 3 ? 'text-white' : ''}>{user.name.charAt(0)}</span>
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4>{user.name}</h4>
                    {user.role === 'educator' && (
                      <Badge variant="secondary" className="text-xs">Educator</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{user.quizzesCompleted} quizzes</span>
                    <span>•</span>
                    <span>{user.translationsCount} translations</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl mb-1">{user.points}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    points
                  </div>
                </div>

                <div className="flex gap-1">
                  {user.badges.slice(0, 3).map((badge) => (
                    <div
                      key={badge.id}
                      className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full flex items-center justify-center text-sm"
                      title={badge.name}
                    >
                      {badge.icon}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              🎯
            </div>
            <h4 className="mb-2">Your Rank</h4>
            <div className="text-3xl mb-1">#1</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Out of 500+ users</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              ⚡
            </div>
            <h4 className="mb-2">Next Milestone</h4>
            <div className="text-3xl mb-1">1,500</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">250 points to go</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
              🏆
            </div>
            <h4 className="mb-2">Badges Earned</h4>
            <div className="text-3xl mb-1">{mockUsers[0].badges.length}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Keep learning!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
