<template>
  <b-container>
    <b-row>
      <b-col cols="12" xl="8">
        <b-alert show variant="danger" v-if="serverError">Server Error!</b-alert>
        <b-modal
          id="userModel"
          ref="userModel"
          :title="userModelTitle"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group label="Name" label-for="name-input">
              <b-form-input
                name="name-input"
                id="name-input"
                v-model="form.name"
                v-validate="{ required: true }"
                :state="validateState('name-input')"
                aria-describedby="name-input-feedback"
              ></b-form-input>

              <b-form-invalid-feedback id="name-input-feedback">This is a required field</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Unit" label-for="unit-input">
              <b-form-input
                id="unit-input"
                name="unit-input"
                v-model="form.unit"
                v-validate="{ required: true }"
                :state="validateState('unit-input')"
                aria-describedby="unit-input-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="unit-input-feedback">This is a required field</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Role" label-for="role-input">
              <b-form-select id="role-input" v-model="form.role" :options="roles" name="role-input" v-validate="{ required: true }" :state="validateState('role-input')"
          aria-describedby="role-input-feedback"></b-form-select>
          <b-form-invalid-feedback id="input-2-live-feedback">
          This is a required field.
        </b-form-invalid-feedback>
            </b-form-group>
          </form>
        </b-modal>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" xl="8">
        <transition name="slide">
          <b-card>
            <div slot="header">
              User List
              <div class="card-header-actions">
                <b-button size="sm" variant="outline-primary" @click="addRow">New</b-button>
              </div>
            </div>
            <b-table
              show-empty
              :hover="hover"
              :striped="striped"
              :bordered="bordered"
              :small="small"
              :fixed="fixed"
              responsive="sm"
              :items="items"
              :fields="fields"
              @row-clicked="rowClicked"
            >
              <template slot="userid" slot-scope="data">
                <strong>{{data.item.userid}}</strong>
              </template>
              <template slot="name" slot-scope="data">
                <strong>{{data.item.name}}</strong>
              </template>
              <template slot="actions" slot-scope="data">
                <span style="display:block; width:100px">
                  <b-button size="sm" variant="outline-primary" @click="editRow(data.item)">Edit</b-button>
                  <b-button
                    size="sm"
                    variant="outline-primary"
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
          </b-card>
          <!-- Info modal -->
        </transition>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import UserListProxy from "../../proxies/UserListProxy";
export default {
  name: "Users",

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
  data: () => {
    return {
      items: [],
      serverError: false,
      nameState: null,
      userModelTitle: "",
      roles: [{ text: "Select One", value: null }, "User", "Admin"],
      fields: [
        { key: "id", label: " ID" },
        { key: "name" },
        { key: "role" },
        { key: "unit" },
        { key: "actions" }
      ],
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
  },
  methods: {
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
          new UserListProxy().create(obj).then(response => {
            if (response.server == "success") {
              this.fetchClass();
            } else {
              this.serverError = true;
            }
          });
        } else {
          var ary=[];
          ary.push(this.form);
          new UserListProxy().update(ary).then(response => {
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
      new UserListProxy().delete(id).then(response => {
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
      new UserListProxy()
        .list(this.currentPage-1)
        .then(response => {
          this.items = response.content;
          console.log(items)
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
