<template>
  <div class="md-layout md-alignment-center">
    <div
      v-for="v in viu"
      :key="v.id"
      class="md-layout-item md-medium-size-33 md-alignment-center md-small-size-50 md-xsmall-size-100"
    >
      <md-card>
        <md-card-media-cover md-solid>
          <md-card-media md-ratio="4:3">
            <img v-bind:src="v.url" alt="Skyscraper" />
          </md-card-media>

          <md-card-area>
            <md-card-header>
              <span class="md-title">{{ v.title }}</span>
            </md-card-header>
          </md-card-area>
        </md-card-media-cover>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    viu: {
      default: []
    }
  },
  methods: {
    update() {}
  }
};
</script>

<style lang="scss" scope>
@import "~vue-material/src/components/MdAnimation/variables.scss";
.md-card:hover {
  filter: brightness(150%);
  cursor: pointer;
}

.md-layout-item {
  align-content: center;
  display: flex;
  justify-content: center;
  height: auto;
  margin-top: auto;
  margin-bottom: auto;
  transition: 0.3s $md-transition-stand-timing;
}

.md-card {
  border-radius: 10px;
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
</style>
