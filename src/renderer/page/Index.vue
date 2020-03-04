<template>
  <div class="page-container">

    <loading-dialog v-bind:showLoading.sync="showLoading"></loading-dialog>

    <md-app md-waterfall md-mode="flexible">
      <md-app-toolbar class="md-large md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="disable = !disable">
              <md-icon>menu</md-icon>
            </md-button>
          </div>
          <!-- EndMenu -->
          <div class="md-toolbar-section-end">
            <md-menu>
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>more_vert</md-icon>
              </md-button>

              <md-menu-content>
                <md-menu-item @click="refreshPage()">
                  <md-icon>refresh</md-icon>
                  <span>Refresh</span>
                </md-menu-item>

                <md-menu-item>
                  <md-icon>phone</md-icon>
                  <span>My Item 2</span>
                </md-menu-item>

                <md-menu-item>
                  <md-icon>phone</md-icon>
                  <span>My Item 3</span>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </div>

        <div class="md-toolbar-row md-toolbar-offset">
          <span class="md-display-1">Viu Download V1</span>
        </div>
      </md-app-toolbar>
      <!-- Drawer -->
      <md-app-drawer :md-active.sync="disable">
        <md-toolbar class="md-transparent" md-elevation="0"
          >Navigation</md-toolbar
        >

        <md-list>
          <md-list-item @click="info">
            <md-icon>move_to_inbox</md-icon>
            <!-- <router-link to="/info">Info</router-link> -->
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <!-- EndDarer -->
      <md-app-content>
        <md-field>
          <label>Url</label>
          <md-input v-model="searchModel"></md-input>
          <div @click="refreshPage(searchModel)">
            <md-icon>search</md-icon>
          </div>
        </md-field>

        <vdo-list v-bind:viu.sync="vui"></vdo-list>
 
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss" scoped>
@import "~vue-material/src/components/MdAnimation/variables.scss";
@import "~vue-material/src/theme/engine";

.md-app {
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  --md-theme-default-primary: #FFBF00;
}

.md-app-toolbar {
  height: 196px;
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}


.md-field {
  .md-icon:hover {
    cursor: pointer;
    // color: #448aff;
    color: var(--md-theme-default-primary);
  }
}

.md-menu-item:hover,.md-list-item:hover {
  cursor: pointer;
  background: #eee;
}


</style>

<script>
import Vue from "vue";
import LoadingDialog from '@/components/LoadingDialog'
import VdoList from '@/components/VdoList'
const url = "https://www.viu.com/ott/th/th/vod/250691/The-Cursed";
// https://www.viu.com/ott/th/th/vod/251066/When-the-Weather-is-Fine
const options = {
  url: url,
  method: "GET"
};

let parseData = html => {
  // #episode-7-250691 > a > div.psr.video-img.float-left > img
  // const baseUrl = 'https://www.viu.com'
  let data = [];
  const $ = Vue.cheerio.load(html);
  console.log("Title", $("title").text());
  $("#select-episode > div > ul > li").each((i, el) => {
    const li = $(el).find("a");
    const epname = li.attr("title");
    let imgUrl = li
      .find("div.psr.video-img.float-left > img")
      .attr("data-original");
    data.push({
      id: i,
      title: epname,
      url: imgUrl.replace("/ott/th/v1/imgprocess/reduceImage.php?p=30&img=", "")
    });
  });
  console.table(data);
  return data;
};

export default {
  name: "index",
  components:{
    LoadingDialog,
    VdoList
  },
  methods: {
    showDialog() {
      this.showLoading = true;
    },
    refreshPage(viuUrl = url) {
      this.showLoading = true;
      Vue.http
        .get(viuUrl)
        .then(res => {
          this.vui = parseData(res.data).reverse();
          this.showLoading = false;
        })
        .catch(e => {
          console.log(e);
          this.showLoading = false;
        });
    },
    info() {
      this.$router.push({path:'/info'})
    }
  },
  data: () => {
    return {
      searchModel: null,
      disable: false,
      showLoading: false,
      data: ["999999", "9999", "99999", "999", "99", "9", "+9"],
      vui: []
    };
  },
  mounted() {
    this.refreshPage();
  }
};
</script>
