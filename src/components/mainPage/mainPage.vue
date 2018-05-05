<template>
  <div>
    <carousel :style="carouselStyle"></carousel>
    <div class="welcome">
      <div class="container outerset" >
        <div class="row">
          <div class="col-xs-12">
            <p>Welcome to the Machine Vision Laboratory website </p>
            <ul>
              <li  v-for="{url,content} in introduce">
                <div class="container-fluid">
                  <div class="col-xs-4">
                    <img
                      :src="url">
                  </div>
                  <div class="col-xs-8">
                      {{content}}
                  </div>
                </div>

              </li>
            </ul>
          </div>
          <div class="col-xs-12 line">
          <div class="col-xs-4 col-xs-offset-7 calender">
            <calender></calender>
          </div>
          </div>
        </div>
      </div>
    </div>
    <!--<p>lll</p>-->

  </div>

</template>

<script>
  import Carousel from 'components/carousel/carousel'
  import Calender from 'components/calender/calender';
  export default {
    name: "mainPage",
    components: {
      Calender,
      Carousel
    },
    data() {
      return {
        carouselStyle: '',
        introduce: [
          {
            url: require('../../assets/img/鬼怪枫叶.jpg'),
            content: '机器视觉系统就是使用机器来代替人眼，来对获得的图像进行测量和判断的操作。它综合了光学、机械、电' +
            '子、计算机软硬件等学科的知识，涉及到计算机、图像处理、模式识别、人工智能、信号处理、光机电一体化等多个领域。' +
            '图像处理和模式识别等技术的快速发展，也大大地推动了机器视觉的发展',
          },
          {
            url: require('../../assets/img/鬼怪~.jpg'),
            content: '机器视觉在工业方面的应用是很多的，例如印刷行业、各种包装生产、汽车生产、半导体材料/元器件/连接器的生产、' +
            '制药/食品生产、烟草工业、纺织工业等行业都可以应用到机器视觉的技术'
          },
          {
            url: require('../../assets/img/鬼怪海浪.jpg'),
            content: '机器视觉技术也可以运用在医学上。机器视觉可以帮助医生进行图像分析，分析主要利用数字图像处理的技术，将x光透视图、核磁共振图谱和CT图进行图像的叠加，然后将结果进行综合的分析机器视觉' +
            '技术还可对血液中的细胞进行自动分类和计数，也可进行DNA分析或是癌细胞识别等工作，帮助医学得到的进一步发展'
          },
          {
            url: require('../../assets/img/鬼怪酒店.jpg'),
            content: '在一些遥感系统中，机器视觉技术会使用在分析得到的遥感图像中，通过分析这些遥感图像，实现环境监测的目的。当然' +
            '不仅仅局限于监测环境，还可以根据遥感卫星获得地形、地貌的图像，通过分析这些图像的特征，来使机器自动对地形地貌进行识别和理解'
          }
        ]
      }
    },
    methods: {
      carouselFitScreen() {
        let screenHeight = window.innerHeight;
        // let headbarHeight = document.getElementById('headbar').offsetHeight;
        // console.log(screenHeight, headbarHeight)
        this.carouselStyle = 'height: ' + screenHeight.toString() + 'px';
        // console.log(this.carouselStyle)
      },
      // introducesimges(){
      //   var arr=[];
      //   for(var i in this.introducesimge){
      //     var obj={background:`url(${this.introducesimge[i]}) norepeat center center`};
      //     arr.push(obj);
      //   }
      //   return arr
      // },

    },
    mounted() {
      this.carouselFitScreen();
      var timer = null
      window.onresize = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.carouselFitScreen();
        }, 100);

      }

    }
  }
</script>
<style scoped>

  .col-xs-4,.col-xs-8{
    padding: 0;
    display: inline-block;
  }
  p:first-child{
    text-align: center;
    font-family: monaco;
    font-size: 40px;
    margin:8% auto 3%;
    color: gray;
  }
  .welcome{
    background: url("../../assets/img/welcome.jpg");
    background-size: cover;
    background-repeat: repeat;
    width: 100%;
    content: "";


  }
  li{
    list-style-type: none;
    padding:2px;
    color: gray;
  }
  ul{
    height: 80%;
  }
  img{
    max-width: 40%;
    border-radius: 15px;
  }
  .outerset {
    background: rgba(255,255,255,0.9)
  }
@font-face {
  font-family: monaco;
  src: url('../../assets/fonts/monaco-webfont.ttf');
}
  .calender{
    margin-top: 20px;
    padding:20px ;

  }
  .line{
    border-top: 1px solid gray;
  }
</style>
