<template>
  <div>
    <carousel :style="carouselStyle"></carousel>
    <!--<p>lll</p>-->
  </div>

</template>

<script>

  import Carousel from 'components/carousel/carousel'

  export default {
    name: "mainPage",
    components: {
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
        let headbarHeight = document.getElementById('headbar').offsetHeight;
        // console.log(screenHeight, headbarHeight)
        this.carouselStyle = 'height: ' + (screenHeight - headbarHeight).toString() + 'px;';
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


</style>
