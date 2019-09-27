<!-- Display a single user -->

<template>
  <b-container fluid >
    <b-row align-v="start" class="mb-3" > 
        <b-col align-self="start" > 
          <div>                 
            <b-button variant="success" @click="logacc" class = "mybuttons">Edit</b-button>
            <b-button variant="warning" class = "mybuttons" >Bulk Delete</b-button>   
            <b-button variant="primary" class = "mybuttons" @click="goBack" >Back to list</b-button> 
          </div>
        </b-col>   
    </b-row>
  
    <b-row align-v="start" fluid >
      <b-col align-self="start" >
        <b-list-group>
          <b-list-group-item >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Name</h5>
            </div>
            <p>
              User id:  {{ $route.params.id }}
            </p>
          </b-list-group-item>
        </b-list-group> 
        </b-col>     
    </b-row>

      <b-row align-v="start" fluid >
      <b-col align-self="start" >
        <b-list-group>
          <b-list-group-item >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">Name</h5>
            </div>
            <p>
               sed diam eget risus varius blandit.
            </p>
          </b-list-group-item>
        </b-list-group> 
        </b-col>     
    </b-row>

  </b-container>  
</template>
<script>
import Accounts from '../account/account'
import items from '../account/account'
import UserListProxy from '../../proxies/UserListProxy'
export default {
  name: "User",
  components:{
    
  },
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
      this.$router.replace({path: '/users'})
      // console.log( this.$route.params.id )
    },
      logacc(items){
          console.log(items.fields)
      }

  }
}
</script>

<style>
    .mb-1 { 
      font-weight: bold;
    }
    /*
    .mybuttons {
      padding-right: 1px
    } */
</style>