import React from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  Pressable,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';
import isCloseToBottom from './utils/isCloseToBottom';
import randomHeightMinMax from './utils/randomHeightMinMax';

const {width} = Dimensions.get('window');

interface MasonryListProps extends Omit<ScrollViewProps, 'onScroll'> {
  data: T[];
  gap?: number;
  numColumns?: number;
  style?: StyleProp<ScrollViewProps>;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  minHeight?: number;
  maxHeight?: number;
  renderCustomItem?: ({item: {}, i: number}) => React.ReactNode;
}

const MasonryList: React.FC<MasonryListProps> = ({
  data,
  gap = 16,
  numColumns = 2,
  style,
  onEndReached,
  onEndReachedThreshold,
  renderCustomItem,
  minHeight = width * 0.2,
  maxHeight = width * 0.7,
  ...rest
}: MasonryListProps) => {
  const list = Object.keys(data).map(i => ({
    ...data[Number(i)],
    height: randomHeightMinMax(minHeight, maxHeight),
    key: i,
  }));

  return (
    <ScrollView
      removeClippedSubviews={true}
      style={style}
      contentContainerStyle={[
        styles.container,
        {
          paddingHorizontal: gap,
          paddingTop: gap,
        },
      ]}
      {...rest}
      scrollEventThrottle={16}
      onScroll={({nativeEvent}: {nativeEvent: NativeScrollEvent}) => {
        if (isCloseToBottom(nativeEvent, onEndReachedThreshold || 0.1)) {
          onEndReached?.();
        }
      }}>
      {Array.from(Array(numColumns), (_, num) => {
        return (
          <>
            <View key={num.toString()} style={{flex: 1 / numColumns}}>
              {list
                .filter((_, index) => index % numColumns === num)
                .map((item, i) => {
                  if (renderCustomItem) {
                    return renderCustomItem({item, i});
                  } else {
                    return (
                      <MasonryItem
                        key={item.key}
                        height={item.height}
                        image={item.image}
                        gap={gap}
                      />
                    );
                  }
                })}
            </View>
            {num < numColumns - 1 && (
              <View key={`${num + 2}`} style={{width: gap}} />
            )}
          </>
        );
      })}
    </ScrollView>
  );
};

export default MasonryList;

const MasonryItem = ({
  height,
  gap,
  image,
}: {
  height: number;
  gap: number;
  image: string;
}) => {
  return (
    <Pressable
      style={[
        styles.imageStyle,
        {
          height,
          marginBottom: gap,
          borderRadius: gap / 2,
        },
      ]}>
      <Image
        source={{uri: image}}
        resizeMode="cover"
        style={{...StyleSheet.absoluteFillObject}}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  imageStyle: {
    overflow: 'hidden',
    backgroundColor: 'lightgrey',
  },
});
