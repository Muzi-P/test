<template>
  <b-container fluid >

    <b-row align-v="start">                            
            <b-button icon name="flag" variant="success" v-on:click = "logres(received)"  >Add New</b-button>
            <b-button variant="warning">Bulk Delete</b-button> 
            <!-- <mdb-icon fab icon="500px" />          -->
    </b-row>

    <b-row align-v="center"  >
          <b-table
            show-empty
            :hover="hover"
            :striped="striped"
            :bordered="bordered"
            :items="items"
            :fields="fields"
            @row-clicked="rowClicked"
          >
          <template v-slot:cell(index)="data">
              {{ data.index + 1 }}
          </template>
          <!-- Comment
          <template slot="selected" slot-scope="row">
            <span style="display:block; width:2px">
              <b-form-checkbox
                  id="checkbox-1"
                  v-model="status"
                  name="checkbox-1"
                  value="accepted"
                  unchecked-value="not_accepted">
              </b-form-checkbox>
            </span>
          </template> -->

          <template slot="actions" slot-scope="data">
            <span style="display:block; width:150px">
              <b-button size="sm" variant="warning" v-on:click = "viewUser(data.item)">View</b-button>
              <b-button size="sm" variant="primary" @click="editRow(data.item)">Edit</b-button>
              <b-button
                size="sm"
                variant="danger"
                @click="deleteRow(data.item.id)"
              >Delete</b-button>
            </span>
          </template>
          </b-table>
          <nav>
            <b-pagination
              size="sm"
              :total-rows="totalRows"
              :per-page="perPage"
              v-model="currentPage"
              prev-text="Prev"
              next-text="Next"
              hide-goto-end-buttons
              @input="fetchClass('make')"
            />
          </nav>
        <!-- Info modal -->
    </b-row>
  </b-container>
</template>

<script>
import AccountProxy from "../../proxies/AccountProxy";
// import axios from 'axios';
export default {
  name: "Accounts",

  props: {
    caption: {
      type: String,
      default: "Users"
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [],
      received: '',
      serverError: false,
      nameState: null,
      userModelTitle: "",
      roles: [{ text: "Select One", value: null }, "User", "Admin"],
      slot: "selected",
      fields: [
        { key: "id", label: " ID" },
        { key: "name",label: 'Name'  },
        { key: 'account',label: 'Account'},
        { key: 'work_unit',label: 'Work Unit' },
        { key: 'position',label: 'Position'},
        { key: 'permission',label: 'Permision'},
        { key: 'phone_number',label: 'Phone Number'},
        { key: 'remarks',label: 'Remarks'},
        { key: "actions" }
      ],
      // items:[
      //     {id: 1, name: 'Muzi', account: 'muzi@gmail.com', work_unit: 'System Development',
      //       position: 'Engineer', permission: 'Advanced User', phone_number: '0901300826', 
      //       remarks: 'what the hell', _action: true},

      //     {id:2, name: 'Eric', account: 'eric@gmail.com', work_unit: 'System Development',
      //       position: 'Engineer', permission: 'Advanced User', phone_number: '0981300826', 
      //       remarks: 'what the hell', _action: true}
      // ],
      currentPage: 1,
      perPage: 0,
      totalRows: 0,

      form: {
        name: "",
        role: "",
        unit: ""
      }
    };
  },
  computed: {},
  mounted() {},
  created() {
       this.fetchClass("init");     
    // console.log(123) 
  },
  methods: {
    logres(received){
      // let res =  axios.get('http://localhost:8084/TeamPractice/userlist/page/1')
      // console.log(res.data) 
      // console.log(1) 

      axios.get('http://localhost:8084/TeamPractice/userlist/page/1')
          .then(res => this.received = res.data)
          .catch(err => console.log(err));
      console.log(received)
      // let res =  axios.get('http://192.168.88.73:8080/TeamPractice/userlist/page/1')
      // console.log(res.data) 
    },
    viewUser(item){
      // const userLink = this.userLink(item.id);
      // this.$router.push({ path: userLink });

      let res =  axios.get('http://192.168.88.73:8080/TeamPractice/userlist/page/1')
      console.log(res.data) 
      // http://localhost:8084/#/account
      // http://192.168.88.66:8083
      // axios.get('http://localhost:8084/#/account/TeamPractice/userlist/page/1')
      //     .then(res => this.items = res.data)
      //     .catch(err => console.log(err));
    },
    created(){
      // let res =  axios.get('http://192.168.88.73:8080/TeamPractice/userlist/page/1')
      console.log(123) 
      
        //  axios.get('http://192.168.88.73:8080/TeamPractice/userlist/page/1')
        //   .then(res => this.items = res.data)
        //   .catch(err => console.log(err));
    },
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }

        if (this.form.id == null) {
          var obj = Object.assign({}, this.form);
          delete obj["id"];
          new AccountsProxy().create(obj).then(response => {
            if (response.server == "success") {
              this.fetchClass();
            } else {
              this.serverError = true;
            }
          });
        } else {
          var ary=[];
          ary.push(this.form);
          new AccountProxy().update(ary).then(response => {
            if (response.server == "success") {
              this.fetchClass();
            } else {
              this.serverError = true;
            }
          });
        }
        this.$nextTick(() => {
          this.$refs["userModel"].hide();
        })
      });
    },
    resetModal() {
      this.form.name = "";
      this.form.role = null;
      this.form.unit = "";
      this.form.id = null;
    },
    deleteRow(id) {
      new AccountProxy().delete(id).then(response => {
        if (response.server == "success") {
          this.fetchClass();
        } else {
          this.serverError = true;
        }
      });
    },
    addRow() {
      this.resetModal();
      this.$refs["userModel"].show();
      this.userModelTitle = "Add User";
    },
    editRow(item) {
      this.userModelTitle = "Edit User";
      this.$refs["userModel"].show();

      this.form.name = item.name.toString();
      this.form.unit = item.unit.toString();
      this.form.role = item.role.toString();
      this.form.id = item.id.toString();
    },
    fetchClass(type) {
      console.log("sss")
      new AccountProxy()
        .list(this.currentPage)
        .then(response => {
          this.items = response.content;
             console.log(response.content)
          if (type == "init") {
            this.totalRows = response.totalElements;
            this.perPage = response.pageable.pageSize;
          }
        })
        .catch(response => {
          console.log("Request failed...");
        });
    },
    userLink(id) {
      return `users/${id.toString()}`;
    },
    rowClicked(item) {
      const userLink = this.userLink(item.id);
      this.$router.push({ path: userLink });
      
    }
  }
};
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
<style lang="css">
.actions {
  display: inline-block;
}
</style>



<!-- Comment -->