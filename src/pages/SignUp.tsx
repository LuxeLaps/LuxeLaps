import { useState, useEffect } from 'react';  // Add useEffect here
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      toast.success('Check your email to confirm your account');
      navigate('/signin');
    } catch (error) {
      toast.error('Error signing up');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) throw error;
    } catch (error) {
      toast.error(`Error signing up with ${provider}`);
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-auth-pattern">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-luxe-purple hover:text-luxe-pink">
                  Sign in
                </Link>
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-gray-900 placeholder:text-gray-500"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-gray-900 placeholder:text-gray-500"
                />
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="text-gray-900 placeholder:text-gray-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-luxe-purple hover:bg-luxe-purple/90"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialSignUp('google')}
                  className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300"
                >
                  <FaGoogle className="mr-2 text-[#4285F4]" />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialSignUp('github')}
                  className="w-full bg-[#24292E] hover:bg-[#24292E]/90 text-white border-[#24292E]"
                >
                  <FaGithub className="mr-2" />
                  GitHub
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="hidden lg:block relative flex-1">
          <div className="absolute inset-0 bg-gradient-to-br from-luxe-purple/30 to-luxe-pink/30" />
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="/images/auth-bg.jpg"
            alt="Authentication background"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;