<template>
  <div>
    <carousel :style="carouselStyle"></carousel>
    <div class="container">
      <div class="col-md-4 col-md-offset-8">
        <calender></calender>
      </div>
    </div>
    <!--<p>lll</p>-->
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
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
      }
    },
    methods: {
      carouselFitScreen() {
        let screenHeight = window.innerHeight;
        // let headbarHeight = document.getElementById('headbar').offsetHeight;
        // console.log(screenHeight, headbarHeight)
        this.carouselStyle = 'height: ' + screenHeight.toString() + 'px';
        // console.log(this.carouselStyle)
      }
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
.container{
  margin-top: 20px;
}
</style>
