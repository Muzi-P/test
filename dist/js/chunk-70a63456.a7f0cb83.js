(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70a63456"],{"2b12":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-container",{attrs:{fluid:""}},[n("b-row",{attrs:{"align-v":"start"}},[n("b-button",{attrs:{icon:"",name:"flag",variant:"success"}},[e._v("Add New")]),n("b-button",{attrs:{variant:"warning"}},[e._v("Bulk Delete")]),n("mdb-icon",{attrs:{fab:"",icon:"500px"}})],1),n("b-row",{attrs:{"align-v":"center"}},[n("b-table",{attrs:{"show-empty":"",hover:e.hover,striped:e.striped,bordered:e.bordered,items:e.items,fields:e.fields},on:{"row-clicked":e.rowClicked},scopedSlots:e._u([{key:"cell(index)",fn:function(t){return[e._v("\n            "+e._s(t.index+1)+"\n        ")]}},{key:"actions",fn:function(t){return[n("span",{staticStyle:{display:"block",width:"150px"}},[n("b-button",{attrs:{size:"sm",variant:"warning"},on:{click:function(n){return e.viewUser(t.item)}}},[e._v("View")]),n("b-button",{attrs:{size:"sm",variant:"primary"},on:{click:function(n){return e.editRow(t.item)}}},[e._v("Edit")]),n("b-button",{attrs:{size:"sm",variant:"danger"},on:{click:function(n){return e.deleteRow(t.item.id)}}},[e._v("Delete")])],1)]}}])}),n("nav",[n("b-pagination",{attrs:{size:"sm","total-rows":e.totalRows,"per-page":e.perPage,"prev-text":"Prev","next-text":"Next","hide-goto-end-buttons":""},on:{input:function(t){return e.fetchClass("make")}},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)],1)],1)},i=[],a=(n("7f7f"),n("6b54"),n("f751"),n("85f2")),o=n.n(a);function s(e,t,n){return t in e?o()(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=n("b3ff"),c=n("bc3a"),u=n.n(c),d={name:"Users",props:{caption:{type:String,default:"Users"},hover:{type:Boolean,default:!0},striped:{type:Boolean,default:!0},bordered:{type:Boolean,default:!1},small:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1}},data:function(){var e;return e={items:[],serverError:!1,nameState:null,userModelTitle:"",roles:[{text:"Select One",value:null},"User","Admin"],slot:"selected",fields:[{key:"id",label:" ID"},{key:"name",label:"Name"},{key:"account",label:"Account"},{key:"work_unit",label:"Work Unit"},{key:"position",label:"Position"},{key:"permission",label:"Permision"},{key:"phone_number",label:"Phone Number"},{key:"remarks",label:"Remarks"},{key:"actions"}]},s(e,"items",[{id:1,name:"Muzi",account:"muzi@gmail.com",work_unit:"System Development",position:"Engineer",permission:"Advanced User",phone_number:"0901300826",remarks:"what the hell",_action:!0},{id:2,name:"Eric",account:"eric@gmail.com",work_unit:"System Development",position:"Engineer",permission:"Advanced User",phone_number:"0981300826",remarks:"what the hell",_action:!0}]),s(e,"currentPage",1),s(e,"perPage",0),s(e,"totalRows",0),s(e,"form",{name:"",role:"",unit:""}),e},computed:{},mounted:function(){},created:function(){this.fetchClass("init")},methods:{viewUser:function(e){var t=u.a.get("http://192.168.88.73:8080/TeamPractice/userlist/page/1");console.log(t.data)},created:function(){var e=u.a.get("http://192.168.88.73:8080/TeamPractice/userlist/page/1");console.log(e.data)},validateState:function(e){return this.veeFields[e]&&(this.veeFields[e].dirty||this.veeFields[e].validated)?!this.veeErrors.has(e):null},handleOk:function(e){e.preventDefault(),this.handleSubmit()},handleSubmit:function(){var e=this;this.$validator.validateAll().then(function(t){if(t){if(null==e.form.id){var n=Object.assign({},e.form);delete n["id"],(new l["a"]).create(n).then(function(t){"success"==t.server?e.fetchClass():e.serverError=!0})}else{var r=[];r.push(e.form),(new l["a"]).update(r).then(function(t){"success"==t.server?e.fetchClass():e.serverError=!0})}e.$nextTick(function(){e.$refs["userModel"].hide()})}})},resetModal:function(){this.form.name="",this.form.role=null,this.form.unit="",this.form.id=null},deleteRow:function(e){var t=this;(new l["a"]).delete(e).then(function(e){"success"==e.server?t.fetchClass():t.serverError=!0})},addRow:function(){this.resetModal(),this.$refs["userModel"].show(),this.userModelTitle="Add User"},editRow:function(e){this.userModelTitle="Edit User",this.$refs["userModel"].show(),this.form.name=e.name.toString(),this.form.unit=e.unit.toString(),this.form.role=e.role.toString(),this.form.id=e.id.toString()},fetchClass:function(e){var t=this;(new l["a"]).list(this.currentPage-1).then(function(n){t.items=n.content,"init"==e&&(t.totalRows=n.totalElements,t.perPage=n.pageable.pageSize)}).catch(function(e){console.log("Request failed...")})},userLink:function(e){return"users/".concat(e.toString())},rowClicked:function(e){var t=this.userLink(e.id);this.$router.push({path:t})}}},f=d,m=(n("a425"),n("6f9f"),n("2877")),h=Object(m["a"])(f,r,i,!1,null,"57ec7cb2",null);t["default"]=h.exports},"677f":function(e,t,n){},"6f9f":function(e,t,n){"use strict";var r=n("c308"),i=n.n(r);i.a},a425:function(e,t,n){"use strict";var r=n("677f"),i=n.n(r);i.a},c308:function(e,t,n){}}]);
//# sourceMappingURL=chunk-70a63456.a7f0cb83.js.map