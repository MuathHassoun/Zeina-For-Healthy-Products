import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

// TODO: Add image assets to src/assets/images/ and update these paths
// Main product image: IMG_0534.JPG-removebg-preview
// Decorative plant image: b02febf6cf86a5a691445820d3ceacc5-removebg-preview
// const mainProductImage = require('../../assets/images/main_product.png');
// const decorativePlantImage = require('../../assets/images/decorative_plant.png');

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Design canvas: 390x844 (iPhone 13 & 14)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;
const scaleX = (x: number) => (x / BASE_WIDTH) * SCREEN_WIDTH;
const scaleY = (y: number) => (y / BASE_HEIGHT) * SCREEN_HEIGHT;

interface SplashScreenProps {
  onFinish?: () => void;
}

export default function SplashScreen({onFinish}: SplashScreenProps) {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      onFinish?.();
    });
  }, [onFinish, progressAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    // Track is 115px, filled portion is 92px (~80%)
    outputRange: [0, scaleX(92)],
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Decorative plant — top-left, faded */}
      <View style={[styles.decorLeft, {opacity: 0.25}]}>
        {/* Replace with <Image source={decorativePlantImage} style={styles.decorLeftImage} /> */}
        <View style={styles.decorLeftImage} />
      </View>

      {/* Decorative plant — top-right corner, faded, rotated */}
      <View style={[styles.decorTopRight, {opacity: 0.25}]}>
        {/* Replace with <Image source={decorativePlantImage} style={styles.decorTopRightImage} resizeMode="contain" /> */}
        <View style={styles.decorTopRightImage} />
      </View>

      {/* Main product image — centered */}
      <View style={styles.mainImageContainer}>
        {/* Replace with <Image source={mainProductImage} style={styles.mainImage} resizeMode="contain" /> */}
        <View style={styles.mainImage} />
      </View>

      {/* Decorative plant — bottom-right, faded, rotated 180° */}
      <View style={[styles.decorBottomRight, {opacity: 0.25}]}>
        {/* Replace with <Image source={decorativePlantImage} style={styles.decorBottomRightImage} resizeMode="contain" /> */}
        <View style={styles.decorBottomRightImage} />
      </View>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, {width: progressWidth}]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EFE6', // rgb(245, 239, 230)
  },

  // Decorative plant — left side (144x250, at 0,48)
  decorLeft: {
    position: 'absolute',
    left: 0,
    top: scaleY(48),
  },
  decorLeftImage: {
    width: scaleX(144),
    height: scaleY(250),
    // TODO: remove backgroundColor once image asset is added
    backgroundColor: 'transparent',
  },

  // Decorative plant — top-right corner (81x68, at 306,0), rotated ~180°
  decorTopRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    transform: [{rotate: '180deg'}],
  },
  decorTopRightImage: {
    width: scaleX(81),
    height: scaleY(68),
    backgroundColor: 'transparent',
  },

  // Main product image (298x552, at 51,146)
  mainImageContainer: {
    position: 'absolute',
    left: scaleX(51),
    top: scaleY(146),
  },
  mainImage: {
    width: scaleX(298),
    height: scaleY(552),
    // TODO: remove backgroundColor once image asset is added
    backgroundColor: 'rgba(150,107,60,0.08)',
    borderRadius: 8,
  },

  // Decorative plant — bottom-right (196x251, at 194,564), rotated ~180°
  decorBottomRight: {
    position: 'absolute',
    left: scaleX(194),
    top: scaleY(564),
    transform: [{rotate: '180deg'}],
  },
  decorBottomRightImage: {
    width: scaleX(196),
    height: scaleY(251),
    backgroundColor: 'transparent',
  },

  // Progress bar (115x5, centered at x:137, y:689)
  progressContainer: {
    position: 'absolute',
    left: scaleX(137),
    top: scaleY(689),
  },
  progressTrack: {
    width: scaleX(115),
    height: scaleY(5),
    backgroundColor: '#DCD8D2', // rgb(220, 216, 210)
    borderRadius: 200,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#966B3C', // rgb(150, 107, 60)
    borderRadius: 200,
  },
});
