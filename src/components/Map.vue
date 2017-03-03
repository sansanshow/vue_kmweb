<template>
  <div id="map-container"></div>
</template>

<style>
  #map-container {
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import mm_params from 'js/common';
  import AMap from 'AMap'
  console.log(AMap)

  export default {
    props: ['longitude', 'latitude', 'zoom'],
    data(){
      return {
        lon: 116.39,
        lat: 39.9

      }
    },
    route: {
      data({to}){

        return
        {

        }
      }
    },
    ready () {
      let lon = this.longitude
      let lat = this.latitude
      let zoom = this.zoom
      console.log("----location-lon-" + lon + ",lat:" + lat + ",zoom:" + zoom)
      const map = new AMap.Map('map-container', {
        zoom: 15,
        center: [lon, lat]
      })
      console.log(map)
      const marker = new AMap.Marker({
        position: [lon, lat]
      });
      marker.setMap(map);
      const circle = new AMap.Circle({
        center: [lon, lat],
        radius: 100,
        fillOpacity: 0.2,
        strokeWeight: 1
      });
      circle.setMap(map);
      map.setFitView();
      const info = new AMap.InfoWindow({
        content: "您孩子的位置",
        offset: new AMap.Pixel(0, -28)
      });
      info.open(map, marker.getPosition())
    }
  }
</script>
