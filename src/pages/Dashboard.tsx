import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { MainLayout } from '../components/layout/MainLayout';
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function getMonthName(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'short' });
}

function timeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [itemCount, setItemCount] = useState(0);
  const [growthData, setGrowthData] = useState([]);
  const [recentItems, setRecentItems] = useState([]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate('/signin');
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/signin');
        return;
      }
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    // Fetch closet items for this user
    const fetchStats = async () => {
      const { data: items, error } = await supabase
        .from('closet_items')
        .select('id, created_at, name')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) return;
      setItemCount(items.length);
      // Prepare growth data by month
      const monthMap = {};
      items.forEach(item => {
        const month = getMonthName(item.created_at);
        monthMap[month] = (monthMap[month] || 0) + 1;
      });
      const growth = Object.keys(monthMap).map(month => ({ name: month, items: monthMap[month] }));
      setGrowthData(growth);
      // Recent activity: last 5 items
      setRecentItems(items.slice(0, 5));
    };
    fetchStats();
  }, [user]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Welcome back, {user?.email}</h1>
          <Button onClick={() => navigate('/upload')} className="bg-luxe-purple hover:bg-luxe-purple/90 text-white shadow-lg transition-transform transform hover:scale-105">
            Upload New Item
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-8 bg-white border rounded-2xl shadow-md hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">My Closet</h3>
                <p className="text-4xl font-extrabold text-luxe-purple">{itemCount}</p>
                <p className="text-gray-700">Total Items</p>
              </div>
              <div className="p-4 bg-purple-100 rounded-full">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </Card>
          {/* Matches and Rewards cards can be updated similarly for consistency */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <Card className="p-8 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Closet Growth</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="items" stroke="#8b5cf6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-8 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Activity</h2>
            <div className="space-y-4">
              {recentItems.length === 0 && <p className="text-gray-600">No recent activity.</p>}
              {recentItems.map(item => (
                <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-purple-100 rounded-full mr-4">
                    <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Added: {item.name || 'Unnamed Item'}</p>
                    <p className="text-sm text-gray-600">{timeAgo(item.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="mt-10 flex justify-end p-4">
          <Button onClick={signOut} variant="destructive" className="hover:bg-red-600 rounded-xl shadow">Sign Out</Button>
        </div>
      </div>
    </MainLayout>
  );
}
