import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, View, Animated, Easing, Alert } from 'react-native';
import { createRoute } from '@granite-js/react-native';
import { Icon, Button, colors } from '@toss/tds-react-native';

export const Route = createRoute('/search', {
  validateParams: (params) => params,
  component: Search,
});

function Search() {
  const placeholders = [
    '카공하기 좋은 판교역 카페 추천해줘',
    '요즘 인기 있는 루프탑 카페 찾아줘',
    '조용한 공부 카페 알려줘',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [value, setValue] = useState('');

  // 🔹 애니메이션 값 (현재 / 다음)
  const currentOpacity = useRef(new Animated.Value(1)).current;
  const currentY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      if (value.trim() !== '') return; // 입력 중엔 placeholder 유지

      // 1️⃣ 현재 placeholder 위로 사라짐
      Animated.parallel([
        Animated.timing(currentOpacity, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(currentY, {
          toValue: -15,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        // 2️⃣ 다음 placeholder 아래에서 올라옴
        setCurrentIndex((prev) => nextIndex);
        const newNext = (nextIndex + 1) % placeholders.length;
        setNextIndex(newNext);

        currentOpacity.setValue(0);
        currentY.setValue(15);

        Animated.parallel([
          Animated.timing(currentOpacity, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(currentY, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [value, nextIndex]);

  // 🔹 API POST 구조
  const handleNext = async () => {
    if (!value.trim()) {
      Alert.alert('알림', '검색어를 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('https://api.example.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: value }),
      });

      if (!response.ok) throw new Error('서버 오류');

      const result = await response.json();
      Alert.alert('성공', '검색 요청이 전송되었습니다!');
      console.log('검색 결과:', result);
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '검색 요청 중 문제가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{`No more Research,\nAcon`}</Text>

      <View style={styles.searchWrapper}>
        <Icon name="icon-search" size={20} color={colors.grey500} />
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.input}
          placeholder=""
          placeholderTextColor={styles.placeholder.color}
          returnKeyType="search"
        />
        {/* Animated placeholder overlay */}
        {value === '' && (
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Animated.Text
              style={[
                styles.placeholder,
                {
                  opacity: currentOpacity,
                  transform: [{ translateY: currentY }],
                },
              ]}
            >
              {placeholders[currentIndex]}
            </Animated.Text>
          </View>
        )}
      </View>

      <Button display="block" viewStyle={styles.nextButton} onPress={handleNext}>
        다음
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    lineHeight: 34,
    marginHorizontal: 24,
    marginTop: 24,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'left',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey100,
    borderRadius: 12,

    marginTop: 42,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 24,
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    marginLeft: 8,
    color: colors.grey800,
  },
  placeholder: {
    position: 'absolute',
    left: 40,
    top: 14,
    fontSize: 16,
    color: colors.grey500,
  },
  nextButton: {
    paddingBottom: 24,
    marginHorizontal: 20,
  },
});

export default Search;
