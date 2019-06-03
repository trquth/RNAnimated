/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet, Text, View,
  FlatList, TouchableOpacity, requireNativeComponent
} from 'react-native';
import AnimatedCalendarWrapper from './animated-calendar/AnimatedCalendarWrapper';
const GenerateThumbnail = requireNativeComponent("GenerateThumbnail")


type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
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

  render() {
    return <View style={{flex:1}}>
        <GenerateThumbnail style={{flex:1}}/>
    </View>
    // return <View style={{flex:1}}>
    //   <View style={{
    //   width: 200, height: 160,
    //   justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
    // }}>
    // <GenerateThumbnail
    // url={"https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"} 
    // type="video"/></View>
    // <View style={{
    //   width: 200, height: 160,
    //   justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
    // }}><GenerateThumbnail
    // url={"https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf"} 
    // type="pdf"/></View>
    // </View> 
    
   

    return (
      <View style={{flex: 1}}>
        {/* <AnimatedCalendarWrapper>
          <View style={{height: '100%', backgroundColor: 'pink', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.reset()}><Text>TOUCH</Text></TouchableOpacity>
          </View>
        </AnimatedCalendarWrapper>
        <FlatList
          style={{flex: 1}}
          data={this.state.data}
          renderItem={({item}) => <Text style={{margin: 10}}>{`${item.name.first} ${item.name.last}`}</Text>}
          keyExtractor={item => item.email}
        /> */}
        <GenerateVideoThumbnail />
      </View>

    );
  }
}


