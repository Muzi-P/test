<template>
  <b-row>
    <b-col cols="12" lg="6">
      <b-card no-header>
        <template slot="header">
          User id:  {{ $route.params.id }}
        </template>
        <b-table striped small fixed responsive="sm" :items="items" :fields="fields">
          <template slot="key" slot-scope="data">
            <strong>{{data.item.key}}</strong>
          </template>
        </b-table>
        <template slot="footer">
          <b-button @click="goBack">Back</b-button>
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import UserListProxy from '../../proxies/UserListProxy'
export default {
  name: 'User',
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  data: () => {
    return {
      items:[],
      fields: [
        {key: 'key'},
        {key: 'value'},
      ]
    }
  },
  mounted(){

    this.fetchClass(this.$route.params.id);
  },

  methods: {
    fetchClass(id){
        new UserListProxy()
        .detail(id)
        .then((response) => {

          const ary=[];
          Object.keys(response).map(function(key, index) {
            //console.log(response[key]);

              ary.push({"key":key,"value":response[key]})
          });
         console.log(ary)
         this.items= ary;
        })
        .catch((response) => {
          console.log('Request failed...');
        });
    },
    goBack() {
      this.$router.go(-1)
      // this.$router.replace({path: '/users'})
    }
  }
}
</script>
