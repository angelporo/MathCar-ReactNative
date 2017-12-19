#赛车赛跑动画

使用`react-native`写的赛车动画库
总动画时间为2500毫秒

可控制先后到底顺序, 总动画时间最好不要改, 不然跑到会有差池,  主是要写的比较粗糙.

演示动画:
[https://github.com/angelporo/MathCar-ReactNative/blob/master/demoImg/demoGif.gif]()


内部使用`react-native-animatable`

调用代码
```react
        <CarMatch
          isStart={ this.state.start }
          result = { "1, 2, 3, 5, 4, 6, 7, 9, 8, 10" } // 比赛结果
          cars={[require("./src/image/01.png"), require("./src/image/01.png"), require("./src/image/02.png"), require("./src/image/03.png"), require("./src/image/04.png"), require("./src/image/05.png"), require("./src/image/06.png"), require("./src/image/07.png"), require("./src/image/08.png"), require("./src/image/09.png"), require("./src/image/10.png")]} // 图片
          />
```
