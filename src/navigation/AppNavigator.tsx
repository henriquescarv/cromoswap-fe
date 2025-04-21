import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '@/screens/LoginScreen/LoginScreen';
import RegisterScreen from '@/screens/RegisterScreen/RegisterScreen';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import useStore from '@/services/store';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { NearYouScreen } from '@/screens/NearYouScreen';
import { ChooseAlbumScreen } from '@/screens/ChooseAlbumScreen';
import { MyAlbumsScreen } from '@/screens/MyAlbumsScreen';
import { PurchaseAlbumScreen } from '@/screens/PurchaseAlbumScreen';
import { AlbumScreen } from '@/screens/AlbumScreen';
import UserProfile from '@/screens/UserProfile/UserProfile';
import { NotificationsScreen } from '@/screens/NotificationsScreen';
import { MessagesScreen } from '@/screens/MessagesScreen';
import { ChatScreen } from '@/screens/ChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          const isCurrentRoute = (routeName) => {
            return routeName === route.name;
          };

          const iconNameRules = {
            'HomeScreen': isCurrentRoute('HomeScreen') ? 'home' : 'home-outline',
            'MyAlbumsScreen': isCurrentRoute('MyAlbumsScreen') ? 'book' : 'book-outline',
            'MyProfileScreen': isCurrentRoute('MyProfileScreen') ? 'person' : 'person-outline',
          }

          const iconName = iconNameRules[route.name];

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary100,
        tabBarInactiveTintColor: theme.primary100,
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="MyAlbumsScreen" component={MyAlbumsScreen} />
      <Tab.Screen name="MyProfileScreen" component={UserProfile} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { login: loginStore } = useStore((state: any) => state);

  const initialRouteName = 'Main';
  // const initialRouteName = loginStore.isAuthenticated ? 'Home' : 'Login';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="NearYouScreen" component={NearYouScreen} />
        <Stack.Screen name="ChooseAlbumScreen" component={ChooseAlbumScreen} />
        <Stack.Screen name="PurchaseAlbumScreen" component={PurchaseAlbumScreen} />
        <Stack.Screen name="AlbumScreen" component={AlbumScreen} />
        <Stack.Screen name="UserProfileScreen" component={UserProfile} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}