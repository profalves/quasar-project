<template>
  <div>
    <loading-screen ref="loadingScreen">
    <div class="page-header">
      <h1>People</h1>
    </div>
    
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="obj in objects">
            <td>{{obj.id}}</td>
            <td>{{obj.name}}</td>
          </tr>
        </tbody>
      </table>
    </loading-screen>
  </div>
</template>
 
<script>
import LoadingScreen from 'vue-loading-screen';
 
export default {
  components: {
    LoadingScreen,
  },
  data() {
    return {
      objects: [],
    };
  },
  methods: {
    refresh() {
      const p = new Promise((resolve, reject) => {
        setTimeout(resolve, 5000);
      });
 
      this.$refs.loadingScreen.load(p);
 
      p.then(() => {
        this.objects = [
          { id: 1, name: 'Foo' },
          { id: 2, name: 'Bar' },
        ];
      });
    },
  },
  created() {
    this.$nextTick(() => {
      this.refresh();
    });
  },
};
</script> 