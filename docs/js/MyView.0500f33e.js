(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["MyView"],{"0941":function(t,e,s){"use strict";var i=s("d461"),r=s.n(i);r.a},"28b5":function(t,e,s){},"8e8b":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"records"},[t._l(t.records,function(e,i){return s("div",{key:i,staticClass:"record"},[s("div",{staticClass:"detail"},[s("div",{staticClass:"from-to"},[t.showEdit?[t._v("["+t._s(1===e.type?"人找车":"车找人")+"]")]:t._e(),t._v("\n\t\t\t\t"+t._s(e.fromCity)+" → "+t._s(e.toCity)+"\n\t\t\t")],2),s("div",{staticClass:"name"},[t._v(t._s(1===e.type?"乘客":"车主")+" : "+t._s(e.name))]),s("div",{staticClass:"free"},[t._v("空座 : "+t._s(e.free))]),s("div",{staticClass:"fee"},[t._v("费用 : "+t._s(e.fee))]),s("div",{staticClass:"remark"},[t._v(t._s(e.remark))])]),s("div",{staticClass:"action"},[t.showContact?s("a",{staticClass:"contact-btn btn",attrs:{href:"tel:"+e.phone,size:"mini"}},[t._v("联系我")]):t._e(),t.showEdit?s("button",{staticClass:"edit-btn btn",attrs:{type:"default",size:"mini"},on:{click:function(s){return t.bindEdit(e)}}},[t._v("编辑")]):t._e(),t.showDelete?s("button",{staticClass:"delete-btn btn",attrs:{type:"warn",size:"mini"},on:{click:function(s){return t.bindDelete(e)}}},[t._v("删除")]):t._e()])])}),t.records.length?t._e():s("div",{staticClass:"record empty"},[t._v("暂无数据")])],2)},r=[],o=s("1da1"),a=s("be94"),n=s("2f62"),d={props:{records:{type:Array,default:[]},showContact:{type:Boolean,default:!0},showEdit:{type:Boolean,default:!1},showDelete:{type:Boolean,default:!1}},computed:{},methods:Object(a["a"])({},Object(n["b"])(["FETCH_ALL_RECORDS","UPDATE_ALL_RECORDS"]),{bindEdit(t){this.$emit("editRecord",t)},bindDelete(t){var e=this;return Object(o["a"])(function*(){confirm("是否确认删除?")&&(yield e.FETCH_ALL_RECORDS(),records=e.$store.state.records.filter(e=>e.orderId!==t.orderId),yield e.UPDATE_ALL_RECORDS(records),e.$Toast.info("删除成功!"),e.$emit("reload",{}))})()}})},c=d,l=(s("0941"),s("2877")),u=Object(l["a"])(c,i,r,!1,null,"23fa8f8b",null);e["a"]=u.exports},abbe:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"my-page"},[s("div",{staticClass:"overflow-container"},[s("div",{staticClass:"section"},[s("div",{staticClass:"title"},[t._v("我的发布")]),s("recordList",{attrs:{records:t.myRecords,showContact:!1,showEdit:!0,showDelete:!0},on:{reload:t.getMyRecords,editRecord:t.bindeditRecord}})],1)]),s("TabBar")],1)},r=[],o=s("be94"),a=s("2f62"),n=s("8e8b"),d={components:{RecordList:n["a"]},data(){return{}},computed:Object(o["a"])({},Object(a["c"])(["records","userId"]),{myRecords(){return this.records.filter(t=>{return t.userId===this.userId})}}),mounted(){this.FETCH_ALL_RECORDS()},methods:Object(o["a"])({},Object(a["b"])(["FETCH_ALL_RECORDS"]),{getMyRecords(){this.$Toast.info("加载中..."),this.FETCH_ALL_RECORDS()},bindeditRecord(t){this.$router.push(`/record/info?mode=edit&recordInfo=${JSON.stringify(t)}`)}})},c=d,l=(s("b7b6"),s("2877")),u=Object(l["a"])(c,i,r,!1,null,"8dd0a0da",null);e["default"]=u.exports},b7b6:function(t,e,s){"use strict";var i=s("28b5"),r=s.n(i);r.a},d461:function(t,e,s){}}]);
//# sourceMappingURL=MyView.0500f33e.js.map