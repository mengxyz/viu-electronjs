<template>
  <md-dialog :md-active.sync="showLoading" :md-click-outside-to-close="false">
    <md-dialog-title>Loading</md-dialog-title>

    <div class="loading">
      <md-progress-spinner
        :md-diameter="50"
        class="md-accent"
        md-mode="indeterminate"
      ></md-progress-spinner>
      <p>Loading ...</p>
    </div>

    <md-dialog-actions>
      <md-button class="md-primary" @click="update"
        >Close</md-button
      >
      <md-button class="md-primary" @click="update"
        >Save</md-button
      >
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  props: {
      showLoading: {
          type: Boolean,
          default: false
      }
  },
  methods: {
      update(){
          this.$emit('update:showLoading', !this.showLoading)
      }
  }  
};
</script>

<style lang="scss" scoped>
.loading {
  display: inline-block;
  .md-progress-spinner {
    margin: 10px;
    vertical-align: middle;
  }
  p {
    vertical-align: middle;
    display: inline-block;
  }
}
</style>
