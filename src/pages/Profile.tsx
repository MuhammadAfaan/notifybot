
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [firstName, setFirstName] = useState('Shoparama');
  const [lastName, setLastName] = useState('.');
  const [email, setEmail] = useState('afaan.sales@gmail.com');
  const [address, setAddress] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password updated",
      description: "Your password has been updated successfully",
    });
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-xl font-semibold mb-6">Profile Settings</h1>
          
          <div className="mb-6">
            <h2 className="text-base font-medium text-gray-700 mb-2">Avatar</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                F
              </div>
              <Button className="bg-gray-700 hover:bg-gray-800">Choose File</Button>
              <span className="text-gray-500 text-sm">No file chosen</span>
            </div>
          </div>
          
          <form onSubmit={handleProfileUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <Input 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <Input 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <Input 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" className="bg-custom-orderly-green hover:bg-custom-orderly-green/90">
                Update
              </Button>
            </div>
          </form>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-xl font-semibold mb-6">Change Password</h1>
          
          <form onSubmit={handlePasswordUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <Input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <Input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
            </div>
            
            <Button type="submit" className="w-full bg-custom-orderly-green hover:bg-custom-orderly-green/90">
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
