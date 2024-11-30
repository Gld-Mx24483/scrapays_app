import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { useAuth0 } from 'react-native-auth0';

const ProfileScreen: React.FC = () => {
  const { user, clearSession } = useAuth0();

  const logoutUser = async () => {
    try {
      await clearSession();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center p-6 bg-gray-100`}>
      <Text style={tw`text-3xl font-bold mb-4`}>Profile</Text>
      {user && (
        <View style={tw`w-full items-center`}>
          {user.picture && (
            <Image 
              source={{ uri: user.picture }} 
              style={tw`w-24 h-24 rounded-full mb-4`} 
            />
          )}
          <Text style={tw`text-xl mb-2`}>Name: {user.name}</Text>
          <Text style={tw`text-lg mb-6`}>Email: {user.email}</Text>
        </View>
      )}
      <TouchableOpacity 
        onPress={logoutUser}
        style={tw`px-8 py-4 bg-red-500 rounded-full`}
      >
        <Text style={tw`text-white text-lg font-semibold`}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;