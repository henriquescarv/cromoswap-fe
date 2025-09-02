import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer, useNavigation, useNavigationContainerRef } from '@react-navigation/native';
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
import { AlbumsScreen } from '@/screens/AlbumsScreen';
import { PurchaseAlbumScreen } from '@/screens/PurchaseAlbumScreen';
import { AlbumScreen } from '@/screens/AlbumScreen';
import UserProfile from '@/screens/UserProfile/UserProfile';
import { NotificationsScreen } from '@/screens/NotificationsScreen';
import { MessagesScreen } from '@/screens/MessagesScreen';
import { ChatScreen } from '@/screens/ChatScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import { FollowListScreen } from '@/screens/FollowListScreen';
import AlbumScreenV2 from '@/screens/AlbumScreenV2/AlbumScreenV2';

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

const getLoginStoreCache = async () => {
  try {
    const loginStoreCacheString = await AsyncStorage.getItem('login_store');
    return loginStoreCacheString ? JSON.parse(loginStoreCacheString) : null;
  } catch (error) {
    console.error('Error retrieving login store cache:', error);
    return null;
  }
}

export default function AppNavigator() {
  const [loadingSplash, setLoadingSplash] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState<'Login' | 'Main'>('Login');

  const navigationRef = useNavigationContainerRef();

  const {
    invalidToken,
    login: loginStore,
    summary: summaryStore,
    setLogin: setLoginStore,
    requestSummary,
  } = useStore((state: any) => state);

  const { theme } = useTheme();

  const loadBaseRequests = useCallback(() => {
    const checkLogin = async () => {
      const loginCacheData = await getLoginStoreCache();

      if (loginCacheData && loginCacheData.isAuthenticated) {
        setLoginStore({ token: loginCacheData.token, isAuthenticated: true });
      }

      if (loginStore.isAuthenticated && !invalidToken) {
        await requestSummary();
      }

      if (navigationRef.isReady()) {
        if (loginStore.isAuthenticated && !invalidToken) {
          navigationRef.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        } else {
          navigationRef.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      }

      setLoadingSplash(false);
    };

    checkLogin();
  }, [loginStore.isAuthenticated, summaryStore.status, invalidToken]);

  useEffect(() => {
    loadBaseRequests();
  }, [loadBaseRequests]);

  if (loadingSplash) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.highLight }}>
        <Text style={{ fontFamily: 'primaryBold', fontSize: 20, color: theme.primary100 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomTabNavigator} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="NearYouScreen" component={NearYouScreen} />
        <Stack.Screen name="ChooseAlbumScreen" component={ChooseAlbumScreen} />
        <Stack.Screen name="PurchaseAlbumScreen" component={PurchaseAlbumScreen} />
        <Stack.Screen name="AlbumScreen" component={AlbumScreenV2} options={{ gestureEnabled: false }} />
        <Stack.Screen name="UserProfileScreen" component={UserProfile} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="FollowListScreen" component={FollowListScreen} />
        <Stack.Screen name="ExternalUserAlbumsScreen" component={AlbumsScreen} />
        <Stack.Screen name="MessagesScreen" component={MessagesScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}