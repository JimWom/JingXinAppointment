// App.jsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',   // 所有页面标题默认居中
          }}
        >
          {/* 首页：隐藏 React Navigation 自带的 Header，用你自己在 HomePage 里做的头部 */}
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{
              headerShown: false,         // ← 关键：关掉这个，页面上就不会再出现“静心后台”那条栏了
            }}
          />

          {/* 详情页：保留系统导航栏，有返回箭头 */}
          <Stack.Screen
            name="Detail"
            component={DetailPage}
            options={{
              title: '详情',
              // headerTitleAlign: 'center', // 已经在 screenOptions 里统一居中，其实可以不用写
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
