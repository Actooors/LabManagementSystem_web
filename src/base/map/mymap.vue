<template>
  <div style="display: block;width: 800px;margin: auto ; padding: 10px" >
    <!--百度地图容器-->
    <div style="text-align: center">
      <span class="title2">详细地址</span>
    </div>
    <div style="width:800px;height:300px;border:#ccc solid 1px;font-size:12px" id="map"></div>
  </div>
</template>

<script>
  import BMap from 'BMap'
  export default {
        name: "mymap",
    data(){
          return{
          map: ''
          }
    },
      mounted() {
        //创建和初始化地图函数：

        this.initMap();
      },
      methods: {
        //创建和初始化地图函数：
        initMap(){
        this.createMap();//创建地图

          // 这后面都错了我不知道为啥，说是什么map没有这个函数心痛
          //
        this.setMapEvent();//设置地图事件
        this.addMapControl();//向地图添加控件
        this.addMapOverlay();//向地图添加覆盖物
      },
      createMap(){
        this.map = new BMap.Map("map");
        this.map.centerAndZoom(new BMap.Point(121.406808,31.323843),19);
      },
      setMapEvent(){
        this.map.enableScrollWheelZoom=true;
        this.map.enableKeyboard=true;
        this.map.enableDragging=true;
        this.map.enableDoubleClickZoom=true
      },
      addClickHandler(target,window){
        target.addEventListener("click",function(){
          target.openInfoWindow(window);
        });
      },
      addMapOverlay(){
        var markers = [
        {content:"No. 99, Baoshan District Road, Shanghai",title:"College of computer engineering and science, Shanghai University",imageOffset: {width:0,height:3},position:{lat:31.323755,lng:121.406422}},
      ];
      for(var index = 0; index < markers.length; index++ ){
        var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
        var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
            imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
          })});
        var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
        var opts = {
          width: 200,
          title: markers[index].title,
          enableMessage: false
        };
        var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
        marker.setLabel(label);
        this.addClickHandler(marker,infoWindow);
        this.map.addOverlay(marker);
      };
    },
    //向地图添加控件
    addMapControl(){
      var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
      scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
      this.map.addControl(scaleControl);
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
      this.map.addControl(navControl);
      var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:false});
      this.map.addControl(overviewControl);
    },
    }
    }

</script>

<style scoped>
  .iw_poi_title {color:#CC5522;font-size:14px;font-weight:bold;overflow:hidden;padding-right:13px;white-space:nowrap}
  .iw_poi_content {font:12px arial,sans-serif;overflow:visible;padding-top:4px;white-space:-moz-pre-wrap;word-wrap:break-word}
  .title2{
    display: block;
    color: gray;
    font-size: 30px;
    font-family: "Adobe 楷体 Std R";
    font-weight: bolder;
    letter-spacing: 10px;
    line-height: 50px;
    margin-bottom: 20px;
  }
</style>
