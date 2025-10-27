import React from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';
import { Icon, colors } from '@toss/tds-react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  currentIndex: number;
  currentOpacity: Animated.Value;
  currentY: Animated.Value;
  placeholders: string[];
}

export default function SearchInput({
  value,
  onChangeText,
  currentIndex,
  currentOpacity,
  currentY,
  placeholders,
}: Props) {
  return (
    <View style={styles.searchWrapper}>
      <Icon name="icon-search" size={20} color={colors.grey500} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder=""
        placeholderTextColor={colors.grey500}
        returnKeyType="search"
      />
      {value === '' && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Animated.Text
            style={[styles.placeholder, { opacity: currentOpacity, transform: [{ translateY: currentY }] }]}
          >
            {placeholders[currentIndex]}
          </Animated.Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey100,
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 24,
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: colors.grey800,
    padding: 0,
    textAlignVertical: 'center',
  },
  placeholder: {
    position: 'absolute',
    color: colors.grey500,
    left: 42,
    top: 12,
    fontSize: 16,
    lineHeight: 20,
  },
});
