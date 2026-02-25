import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '@/screens/LoginScreen/LoginScreen';
import RegisterScreen from '@/screens/RegisterScreen/RegisterScreen';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { NearYouScreen } from '@/screens/NearYouScreen';
import { ChooseAlbumScreen } from '@/screens/ChooseAlbumScreen';
import { AlbumsScreen } from '@/screens/AlbumsScreen';
import { PurchaseAlbumScreen } from '@/screens/PurchaseAlbumScreen';
import { AlbumScreen } from '@/screens/AlbumScreen';
import UserProfile from '@/screens/UserProfile/UserProfile';
import { NotificationsScreen } from '@/screens/NotificationsScreen';
import { MessagesScreen } from '@/screens/MessagesScreen';
import { ChatScreen } from '@/screens/ChatScreen';
import { FollowListScreen } from '@/screens/FollowListScreen';
import EditProfileScreen from '@/screens/EditProfileScreen';
import EditFieldScreen from '@/screens/EditFieldScreen';
import ChangePasswordScreen from '@/screens/ChangePasswordScreen';
import EditRegionScreen from '@/screens/EditRegionScreen';
import AboutScreen from '@/screens/AboutScreen/AboutScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size, focused }) => {
          const iconNameRules = {
            'HomeScreen': focused ? 'home' : 'home-outline',
            'AlbumsScreen': focused ? 'book' : 'book-outline',
            'MyProfileScreen': focused ? 'person' : 'person-outline',
          }

          const iconName = iconNameRules[route.name];

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary100,
        tabBarInactiveTintColor: theme.primary100,
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="AlbumsScreen" component={AlbumsScreen} />
      <Tab.Screen name="MyProfileScreen" component={UserProfile} />
    </Tab.Navigator>
  );
}

export default function AppNavigator({ initialRoute }: { initialRoute: 'Main' | 'Login' }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="NearYouScreen" component={NearYouScreen} />
        <Stack.Screen name="ChooseAlbumScreen" component={ChooseAlbumScreen} />
        <Stack.Screen name="PurchaseAlbumScreen" component={PurchaseAlbumScreen} />
        <Stack.Screen name="AlbumScreen" component={AlbumScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="UserProfileScreen" component={UserProfile} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="FollowListScreen" component={FollowListScreen} />
        <Stack.Screen name="ExternalUserAlbumsScreen" component={AlbumsScreen} />
        <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="EditFieldScreen" component={EditFieldScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        <Stack.Screen name="EditRegionScreen" component={EditRegionScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}