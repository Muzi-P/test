<template>
    <b-container fluid class="bv-example-row bv-example-row-flex-cols">
        <b-row align-v="start">                            
            <b-button icon name="flag" variant="success">Add New</b-button>
            <b-button variant="warning">Bulk Delete</b-button> 
              <mdb-icon fab icon="500px" />         
        </b-row>

        <b-row align-v="center">
            <b-table striped hover :items="items" :fields="fields" >
                <template v-slot:cell(action)="row">
                    <b-button size="sm" class="mr-2">
                        Show Details
                    </b-button>
                </template>
            </b-table>

        </b-row>
    </b-container>
</template>


<script>
  export default {
    data() {
      return {
        // Note 'isActive' is left out and will not appear in the rendered table
        fields: [
          {
            key: 'name',
            label: 'Name'
          },
          {
            key: 'account',label: 'Account'
          },
          {
            key: 'work_unit',label: 'Work Unit'
          },
          {
            key: 'position',label: 'Position'
          },
          {
            key: 'permission',
            label: 'Permision'
          },
          {
            key: 'phone_number',
            label: 'Phone Number'
          },
          {
            key: 'remarks',
            label: 'Remarks'
            // sortable: false
          },
          {
            key: 'action',
            label: 'Actions'
          }
        ],
        items: [
           { isActive: true,name: 'Muzi', account: 'muzi@gmail.com', work_unit: 'System Development',
            position: 'Engineer', permission: 'Advanced User', phone_number: '0901300826', 
            remarks: 'what the hell', _action: true}
        //   { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        //   { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        //   { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
         ]
      }
    }
  }
</script>