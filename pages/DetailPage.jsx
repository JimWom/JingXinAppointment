// pages/Detail.jsx
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Detail({ route, navigation }) {
  const { type, id, title, desc } = route.params;

  // 根据来源类型决定标题
  const typeLabel = type === 'activity' ? '静心活动' : '静心住宿';

  // 动态设置顶部标题为“活动”或“住宿”
  useLayoutEffect(() => {
    navigation.setOptions({ title: typeLabel });
  }, [navigation, typeLabel]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#999',
    marginBottom: 8,
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  desc: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
});
