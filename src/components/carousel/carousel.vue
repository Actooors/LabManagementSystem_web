<template>
  <div>
    <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="3000" data-pause="none">
      <!-- 轮播（Carousel）指标 -->
      <ol class="carousel-indicators">
        <li v-for="(background,index) in backgrounds"
             :class="{'active':index===0}"
            data-target="#myCarousel" :data-slide-to="index"></li>
      </ol>
      <!-- 轮播（Carousel）项目 -->
      <div class="carousel-inner">
        <div v-for="(background,index) in backgrounds"
        :class="{'item':true,'active':index===0}"
        :style="background" ></div>
      </div>
    </div>
    <!-- 轮播（Carousel）导航 -->
    <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>
<script>
  // document.getElementById("myCarousel").carousel('cycle', {interval: 2000});
  // // console.log($(window).height())
  export default {
    name: "carousel",
    data() {
      return {
        imageurls: [
          require('../../assets/img/shu1.jpg'),
          require('../../assets/img/shu2.jpg'),
          require('../../assets/img/shu3.jpg')
        ],
      }

    },
    computed: {
      backgrounds() {
        var arr = [];
        for (let item in this.imageurls) {
          let obj = {background: `url(${this.imageurls[item]})  center center / cover no-repeat`}
          arr.push(obj)
        }
        return arr
      }
    },
    // methods:{
    //         height:
    // }
    //

  }

  // window.onresize = () => {
  //   this.screenHeight = 'height:' + $(window).height() + 'px';
  // }
</script>
<style scoped>


  .carousel {
    /*overflow: hidden;*/
    height: 100%;
  }

  .carousel-inner, .carousel-inner .item {
    height: 100%;
  }

</style>


