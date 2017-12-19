import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Orientation,
  Image,
  findNodeHandle,
  UIManager,
  Dimensions
} from 'react-native';

import * as Animatable from 'react-native-animatable';

export default class CarMatch extends Component {

  constructor(props) {
    super(props);
    this.random = (min,max) => {
      return Math.floor(min+Math.random()*(max-min));
    }
    let initTop = 0;
    // this.endTime = props.endTime;
    this.endTime = 2500;
    this.results = props.result.split(",")
    this.scorllWidth = Dimensions.get('window').width
    this.scorllHeight = this.scorllWidth - 70 //this.props.sporttDitance
    let _this = this
    Animatable.initializeRegistryWithDefinitions({ delay: { from: {}, to: {} } })
    let getCarOption = () => {
      let carOptions = []
      for(let i = 0; i < this.results.length; i++) {
        carOptions.push({
          carTop: initTop,
          endTime: _this.endTime,
          result: _this.results[i],
          easing: "linear",
          carUri: props.cars[i],
        })
      }
      return carOptions
    }
    this.state = {
      carCum: 10,
      carOption : getCarOption(),
      startTime: 0,
      bgLeft: -3600,
      init: false,
    }
  }

  layout(ref) {
    /**
     * 获取当前ref的位置信息
     * Param: param
     * Return: {undefined}
     **/
    const handle = findNodeHandle(ref);
    return new Promise((resolve) => {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        resolve({
          x,
          y,
          width,
          height,
          pageX,
          pageY
        });
      });
    });
  }

  componentDidMount () {
    const { isStart } = this.props;
    const _this = this
    if (isStart) {
      this.setState({
        bgLeft: 0,
      }, () => {
        _this.handleStartAnmation.bind(_this)()
      })
    }
    setTimeout( () =>{
      _this.layout(_this.bck).then( data => {
        _this.setState({bgLeft: -data.width + _this.scorllWidth }, () => {
          _this.setState({
            init: true,
          })
        })
      })
    }, 100)

  }

  componentWillReceiveProps(nextProp) {
    const { isStart } = nextProp;
    if (isStart) {
      this.setState({
        bgLeft: 0,
      })
      this.handleStartAnmation.bind(this)()
    }
  }
  handleStartAnmation () {
    const _this = this
    let start = (i) => {
      const fristSportCum = _this.endTime * _this.state.carOption[i].result
      loopSport(i, fristSportCum)
    }

    let loopSport = (i, sport)  => {
      // ing...
      const c = parseInt(_this.random(-_this.scorllHeight/2, -_this.scorllHeight/3));
      _this.state.carOption[i].carTop = c;
      _this.state.carOption[i].endTime = _this.random(2000, 3000);
      _this.state.carOption[i].easing = "linear";

      _this.setState({
        carOption: _this.state.carOption
      }, async () => {
        const sportCum = parseInt(_this.endTime / 1000)
        let endSport = (i) => {
            _this.closeCarAnimation = setTimeout( () => {
              _this.state.carOption.forEach((n, i) => {
                _this.state.carOption[i].carTop = -_this.scorllHeight;
                _this.state.carOption[i].endTime = _this.state.carOption[i].result * 170;
                _this.state.carOption[i].easing = "linear";
              })
              _this.setState({
                carOption: _this.state.carOption
              })
            }, _this.endTime)
        }

          const sportTime = _this.random(300, 500)
          let loopItemSport = () => {
            _this.state.carOption[i].carTop = _this.random(-_this.scorllHeight/3, -_this.scorllHeight/1.5 );
            _this.state.carOption[i].endTime = 1200;
            _this.state.carOption[i].easing = "linear";
            _this.setState({
              carOption: _this.state.carOption,
            },  () => {
              if (Date.now() - _this.state.startTime <= _this.endTime) {
                _this.loop = setTimeout( () => {
                  loopItemSport()
                }, 1200)
              }
            })
          }
        _this.carCache = await setTimeout(() => loopItemSport(), 100)
        _this["car" + i].delay(0).then( () => {
          endSport(i)
          _this.carCache && clearTimeout(_this.carCache)
          _this.loop && clearTimeout(_this.loop)
        })
      })
    }
    this.setState({
      startTime: Date.now(),
    }, () => {
      this.state.carOption.forEach( (n, i) => {
        start(i)
      })
    })
  }

  componentWillUnmount () {
    this.closeCarAnimation && clearTimeout(this.closeCarAnimation);
    this.carCache && clearTimeout(this.carCache);
  }
  render() {
    return (
      <View
        ref={ ref => this.contain = ref }
        style={ styles.content }>
        <Animatable.View
          style={[styles.bk, {
            left: this.state.bgLeft
          }]}
          transition={this.state.init ? "left" : ""}
          duration={ this.endTime - 500 }
          easing="linear"
          >
          <View
            style={styles.bkB}
            ref={ ref => this.bck = ref }
            >
          <Image
            resizeMode={ Image.resizeMode.stretch }
            style={ styles.sportBgc }
            ref={ ref => this.itembgc = ref }
            />
          <Image
            source={require("./image/endIcon.png")}
            resizeMode={ Image.resizeMode.stretch }
            style={styles.sportBgc}
            />
          <Image
            source={require("./image/icon.png")}
            resizeMode={ Image.resizeMode.stretch }
            style={styles.sportBgc}
            />
          <Image
            source={ require("./image/icon.png")}
            resizeMode={ Image.resizeMode.stretch }
            style={styles.sportBgc}
            />
          <Image
            source={ require("./image/startIcon.png")}
            resizeMode={ Image.resizeMode.stretch }
            style={ styles.sportBgc }
            />
          </View>
        </Animatable.View>
        <View style={ styles.container }>
          {
            this.state.carOption.map( (n, i) => {
              return (
                <Animatable.View
                  key={i}
                  ref={ ref => this["car" + i] = ref }
                  transition={ "left"}
                  duration={ n.endTime }
                  easing={n.easing}
                  style={[styles.car, {
                    left: n.carTop
                  }]}>
                  <Image
                    source={ n.carUri}
                    resizeMode={ Image.resizeMode.contain }
                    style={styles.car}
                    />
                </Animatable.View>
              );
            })
        }
      </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  bk: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'stretch',
    position:'relative',
    flexWrap: "nowrap",
    flexShrink: 1,
  },
  bkB: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  car: {
    height: 10,
    width: 40,
    marginVertical: 1,
  },
  content: {
    height: 140,
  },
  container: {
    zIndex: 10,
    width: "100%",
    left: -20,
    height: 140,
    width: "100%",
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: "flex-end",
  },
  sportBgc: {
    height: 140,
  }
});
