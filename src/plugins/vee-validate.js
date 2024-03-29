import Vue from 'vue';
import VeeValidate from 'vee-validate' //2.2.15

Vue.use(VeeValidate, {
  // This is the default
  inject: true,

  // Important to name this something other than 'fields'
  fieldsBagName: 'veeFields',
  // This is not required but avoids possible naming conflicts
  errorBagName: 'veeErrors',
})
