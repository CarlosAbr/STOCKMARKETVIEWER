<template>
  <v-app>

    <v-content>
      <v-container style="padding:0;" fluid>

        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
};
</script>
