// pages/HomePage.jsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// 从本地 JSON 读数据（按你的目录结构）
import activities from './data/activities.json';
import stays from './data/stays.json';
import mines from './data/mines.json';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TABS = ['activity', 'stay', 'mine'];

const activityData = activities;
const stayData = stays;
const mineData = mines;

export default function HomePage({ navigation }) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('activity');
  const horizontalRef = useRef(null);

  const handleTabPress = (tabKey) => {
    setActiveTab(tabKey);
    const index = TABS.indexOf(tabKey);
    horizontalRef.current?.scrollTo({
      x: index * SCREEN_WIDTH,
      y: 0,
      animated: true,
    });
  };

  const handleMomentumScrollEnd = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH
    );
    setActiveTab(TABS[index] || 'activity');
  };

  const getDataByTab = (tabKey) => {
    if (tabKey === 'activity') return activityData;
    if (tabKey === 'stay') return stayData;
    if (tabKey === 'mine') return mineData;
    return [];
  };

  const handleCardPress = (tabKey, item) => {
    if (tabKey === 'mine') return;

    navigation.navigate('Detail', {
      type: tabKey,
      id: item.id,
      title: item.title,
      desc: item.desc,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      
      {/* 头部：标题 + tabs */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Text style={styles.headerTitle}>静心后台</Text>

        <View style={styles.topTabsBar}>
          <TopTabButton
            label="活动"
            active={activeTab === 'activity'}
            onPress={() => handleTabPress('activity')}
          />
          <TopTabButton
            label="住宿"
            active={activeTab === 'stay'}
            onPress={() => handleTabPress('stay')}
          />
          <TopTabButton
            label="我的"
            active={activeTab === 'mine'}
            onPress={() => handleTabPress('mine')}
          />
        </View>
      </View>

      {/* 中间内容 */}
      <View style={styles.content}>
        <ScrollView
          ref={horizontalRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumScrollEnd}
        >
          {TABS.map((tabKey) => (
            <View key={tabKey} style={styles.page}>
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={true}
              >
                {getDataByTab(tabKey).map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.card}
                    activeOpacity={0.8}
                    onPress={() => handleCardPress(tabKey, item)}
                  >
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDesc}>{item.desc}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 底部预留条 */}
      <View style={[styles.bottomPlaceholder, { paddingBottom: insets.bottom }]}>
        <Text style={styles.placeholderText}>
          这里以后可以放预约按钮、日期、人数等内容
        </Text>
      </View>

    </SafeAreaView>
  );
}

/** 顶部 tab 按钮组件 */
function TopTabButton({ label, active, onPress }) {
  return (
    <TouchableOpacity style={styles.topTabButton} onPress={onPress}>
      <Text style={[styles.topTabText, active && styles.topTabTextActive]}>
        {label}
      </Text>
      {active && <View style={styles.topTabUnderline} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /** 头部：标题 + tabs（紧凑简洁） */
  header: {
    paddingHorizontal: 16,
    paddingBottom: 4,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
  },

  topTabsBar: {
    flexDirection: 'row',
    height: 32,
    marginBottom: 2,
  },
  topTabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTabText: {
    fontSize: 15,
    color: '#666',
  },
  topTabTextActive: {
    fontWeight: '600',
    color: '#333',
  },
  topTabUnderline: {
    marginTop: 2,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#333',
  },

  content: {
    flex: 1,
  },
  page: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },

  /** 卡片 */
  card: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
  },

  /** 底部预留条 */
  bottomPlaceholder: {
    minHeight: 48,
    borderTopColor: '#eee',
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  placeholderText: {
    fontSize: 12,
    color: '#999',
  },
});
