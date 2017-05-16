<template>
  <div id="app">
    <sell-header></sell-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="/goods"></router-link>
      </div>
       <div class="tab-item">
        <router-link :to="/ratings"></router-link>
      </div>
       <div class="tab-item">
        <router-link :to="/seller"></router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="/seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
    import sellHeader from "components/header/header"
    import {urlParse} from "common/js/util.js"
    const ERR_OK = 0

    export default {
      data () {
        return {
          seller: {
            id: ( () => {
              let queryParam = urlParse()
              return queryParam.id
            })()
          }
        }
      },
      created () {
        this.$http.get('/api/seller?id='+this.seller.id).then( (response) => {
          response = response.body
          if(response.errno === ERR_OK){
            this.seller = Object.assign({},this.seller,response.data)
          }
        }).catch((e) => {})
      }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>