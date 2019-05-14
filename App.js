/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, StyleSheet, Text, View,
  ScrollView, Animated, Dimensions, FlatList, TouchableOpacity
} from 'react-native';
import {VelocityTracker} from './input';

const HEADER_HEIGHT = 104;
const KNOB_HEIGHT = 24;

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props)
    const windowSize = Dimensions.get('window');
    this.viewHeight = windowSize.height;
    this.viewWidth = windowSize.width;

    this.scrollTimeout = undefined;
    this.headerState = 'idle';

    this.state = {
      scrollY: new Animated.Value(0),
      calendarScrollable: false,

      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };

    this.onLayout = this.onLayout.bind(this);
    this.onScrollPadLayout = this.onScrollPadLayout.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onStartDrag = this.onStartDrag.bind(this);
    this.onSnapAfterDrag = this.onSnapAfterDrag.bind(this);

    this.knobTracker = new VelocityTracker();
    this.state.scrollY.addListener(({value}) => this.knobTracker.add(value));
  }

  enableCalendarScrolling() {
    this.setState({
      calendarScrollable: true
    });
  }

  onLayout(event) {
    this.viewHeight = event.nativeEvent.layout.height;
    this.viewWidth = event.nativeEvent.layout.width;
    this.forceUpdate();
  }

  onTouchStart() {
    console.log('onTouchStart')
    this.headerState = 'touched';
    if (this.knob) {
      this.knob.setNativeProps({style: {opacity: 0.5}});
    }
  }

  onTouchEnd() {
    console.log('onTouchEnd')
    if (this.knob) {
      this.knob.setNativeProps({style: {opacity: 1}});
    }

    if (this.headerState === 'touched') {
      this.setScrollPadPosition(0, true);
      this.enableCalendarScrolling();
    }
    this.headerState = 'idle';
  }

  onStartDrag() {
    console.log('onStartDrag')
    this.headerState = 'dragged';
    this.knobTracker.reset();
  }

  onSnapAfterDrag(e) {
    console.log('onSnapAfterDrag')
    this.onTouchEnd();
    const currentY = e.nativeEvent.contentOffset.y;
    this.knobTracker.add(currentY);
    const projectedY = currentY + this.knobTracker.estimateSpeed() * 250/*ms*/;
    const maxY = this.initialScrollPadPosition();
    const snapY = (projectedY > maxY / 2) ? maxY : 0;
    this.setScrollPadPosition(snapY, true);
    if (snapY === 0) {
      this.enableCalendarScrolling();
    }
  }

  initialScrollPadPosition() {
    return Math.max(0, this.viewHeight - HEADER_HEIGHT);
  }

  setScrollPadPosition(y, animated) {
    this.scrollPad._component.scrollTo({x: 0, y, animated});
  }

  onScrollPadLayout() {
    this.setScrollPadPosition(this.initialScrollPadPosition(), false);
    setTimeout(() => this.setState({calendarIsReady: true}), 0);
  }


  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const {page, seed} = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({loading: true});
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  };

  reset = () => {
    this.setScrollPadPosition(this.viewHeight, true);
    setTimeout(() => this.setState({calendarIsReady: true, calendarScrollable: false, }), 0);

  }

  render() {
    const agendaHeight = Math.max(0, this.viewHeight - HEADER_HEIGHT);

    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, agendaHeight],
      outputRange: [agendaHeight, 0],
      extrapolate: 'clamp',
    });

    const contentTranslate = this.state.scrollY.interpolate({
      inputRange: [0, agendaHeight],
      outputRange: [0, agendaHeight / 2],
      extrapolate: 'clamp',
    });

    const headerStyle = [
      {
        overflow: 'hidden',
        justifyContent: 'flex-end',
        position: 'absolute',
        height: '100%',
        width: '100%',
      },
      {bottom: agendaHeight, transform: [{translateY: headerTranslate}]},
    ];

    if (!this.state.calendarIsReady) {
      headerStyle.push({height: 0});
    }

    const shouldAllowDragging = !this.state.calendarScrollable;
    const scrollPadPosition = (shouldAllowDragging ? HEADER_HEIGHT : 0) - KNOB_HEIGHT;

    const scrollPadStyle = {
      position: 'absolute',
      width: 80,
      height: KNOB_HEIGHT,
      top: scrollPadPosition,
      left: (this.viewWidth - 80) / 2,
    };

    let knob = (<View style={styles.knobContainer} />);

    let resetBar = <TouchableOpacity
      style={styles.knob} onPress={() => {
        this.reset()
      }}>
    </TouchableOpacity>

    const knobView = <View style={[styles.knob, {alignSelf: 'center', bottom: 10}]} />
    knob = !this.state.calendarScrollable ?
      knobView : <View style={styles.knobContainer}>
        <View ref={(c) => this.knob = c}>{resetBar}</View>
      </View>

    return (
      <View style={{flex: 1}}>
        <View onLayout={this.onLayout} style={[{flex: 1, overflow: 'hidden', backgroundColor: 'white'}]}>
          <Animated.View style={headerStyle}>
            <Animated.View style={{flex: 1, transform: [{translateY: contentTranslate}]}}>
              <View style={{height: '100%', backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.reset()}><Text>TOUCH</Text></TouchableOpacity>
              </View>
            </Animated.View>
            {knob}
          </Animated.View>
          <Animated.ScrollView
            ref={c => this.scrollPad = c}
            overScrollMode='never'
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={scrollPadStyle}
            scrollEventThrottle={1}
            scrollsToTop={false}
            onTouchStart={this.onTouchStart}
            onTouchEnd={this.onTouchEnd}
            onScrollBeginDrag={this.onStartDrag}
            onScrollEndDrag={this.onSnapAfterDrag}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
              {useNativeDriver: true},
            )}
          >
            <View style={{height: agendaHeight + KNOB_HEIGHT}} onLayout={this.onScrollPadLayout}></View>
          </Animated.ScrollView>
        </View>
        {/* <FlatList
          style={{flex: 1}}
          data={this.state.data}
          renderItem={({item}) => <Text style={{margin: 10}}>{`${item.name.first} ${item.name.last}`}</Text>}
          keyExtractor={item => item.email}
        /> */}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  knob: {
    width: 100,
    height: 5,
    //marginTop: 10,
    borderRadius: 3,
    backgroundColor: 'gray'
  },
  header: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  calendar: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  knobContainer: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    height: 24,
    bottom: 10,
    alignItems: 'center',
  },
});
