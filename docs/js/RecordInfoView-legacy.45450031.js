(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["RecordInfoView"],{"33e8":function(t,e,r){"use strict";var n=r("af4d"),i=r.n(n);i.a},af4d:function(t,e,r){},b9fb:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"record-info-page"},[r("NavBar",{attrs:{leftBtns:["back"],title:t.title}}),r("div",{staticClass:"overflow-container"},[r("Form",{attrs:{dynamic:t.dynamic},on:{submit:t.onSubmit}})],1)],1)},i=[],o=r("0a0d"),a=r.n(o),c=(r("7f7f"),r("96cf"),r("3b8d")),s=(r("28a5"),r("cebc")),u=r("2f62"),d=r("39ec"),f=r("4260"),h={components:{Form:d["a"]},data:function(){return{dynamic:{},title:"信息发布"}},computed:Object(s["a"])({},Object(u["c"])(["records","userId"])),mounted:function(){var t=this.$route.query,e=t.mode,r=t.recordInfo,n=void 0===r?{}:r;"string"===typeof n&&(n=JSON.parse(n)),"add"===e?this.checkHistoryRecord():"edit"===e&&(this.title="信息修改",n.fromCity=n.fromCity.split("-"),n.toCity=n.toCity.split("-")),n.mode=e,this.$data.dynamic=n},methods:Object(s["a"])({},Object(u["b"])(["FETCH_ALL_RECORDS","UPDATE_ALL_RECORDS"]),{onSubmit:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e){var r,n,i,o,c,s,u,d,h,m,p,l,y,b;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(r=e.mode,n=e.type,i=e.fromCity,o=e.toCity,c=e.phone,s=e.name,u=e.year,d=e.month,h=e.day,m=e.free,p=e.fee,l=e.remark,e.id,y=(new Date).getDate(),!(h<y||h>y+3)){t.next=5;break}return this.$Toast.info("时间只能选择未来三天以内"),t.abrupt("return");case 5:return t.next=7,this.FETCH_ALL_RECORDS();case 7:return b=[],"add"===r?b=this.records:"edit"===r&&(b=this.records.filter(function(t){return t.orderId!==orderId})),b.push({type:n,fromCity:i,toCity:o,phone:c,name:s,year:u,month:d,day:h,free:m,fee:p,remark:l,userId:this.userId,orderId:Object(f["a"])(),time:a()()}),t.next=12,this.UPDATE_ALL_RECORDS(b);case 12:this.$router.push("/home");case 13:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),checkHistoryRecord:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e,r=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.FETCH_ALL_RECORDS();case 2:e=this.records.filter(function(t){return t.userId===r.userId}),e.length&&window.confirm("系统检测到您已经发布了".concat(e.length,"条信息,是否需要更新它们?"))&&this.$router.push("/my");case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()})},m=h,p=(r("33e8"),r("2877")),l=Object(p["a"])(m,n,i,!1,null,"489463c2",null);e["default"]=l.exports}}]);
//# sourceMappingURL=RecordInfoView-legacy.45450031.js.map