(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["RecordInfoView"],{"5ab2":function(t,e,r){"use strict";var n=r("e2e2"),i=r.n(n);i.a},b9fb:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"record-info-page"},[r("NavBar",{attrs:{leftBtns:["back"],title:t.title}}),r("div",{staticClass:"overflow-container"},[r("Form",{attrs:{dynamic:t.dynamic},on:{submit:t.onSubmit}})],1)],1)},i=[],c=r("0a0d"),o=r.n(c),a=(r("7f7f"),r("96cf"),r("3b8d")),s=(r("28a5"),r("cebc")),u=r("2f62"),d=r("39ec"),f=r("4260"),h={components:{Form:d["a"]},data:function(){return{dynamic:{},title:"信息发布"}},computed:Object(s["a"])({},Object(u["c"])(["records","userId"])),mounted:function(){var t=this.$route.query,e=t.mode,r=t.recordInfo,n=void 0===r?{}:r;"string"===typeof n&&(n=JSON.parse(n)),"add"===e?this.checkHistoryRecord():"edit"===e&&(this.title="信息修改",n.fromCity=n.fromCity.split("-"),n.toCity=n.toCity.split("-")),n.mode=e,this.$data.dynamic=n},methods:Object(s["a"])({},Object(u["b"])(["FETCH_ALL_RECORDS","UPDATE_ALL_RECORDS"]),{onSubmit:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var r,n,i,c,a,s,u,d,h,m,p,l,y;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.mode,n=e.type,i=e.fromCity,c=e.toCity,a=e.phone,s=e.name,u=e.year,d=e.month,h=e.day,m=e.free,p=e.fee,l=e.remark,e.id,t.next=3,this.FETCH_ALL_RECORDS();case 3:return y=[],"add"===r?(y=this.records,Object(f["c"])("拼车小助手","用户:".concat(this.userId," 手机号:").concat(a," 发布了拼车信息"))):"edit"===r&&(y=this.records.filter(function(t){return t.orderId!==orderId}),Object(f["c"])("拼车小助手","用户:".concat(this.userId," 手机号:").concat(a," 修改了拼车信息"))),y.push({type:n,fromCity:i,toCity:c,phone:a,name:s,year:u,month:d,day:h,free:m,fee:p,remark:l,userId:this.userId,orderId:Object(f["a"])(),time:o()()}),t.next=8,this.UPDATE_ALL_RECORDS(y);case 8:this.$router.push("/home");case 9:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),checkHistoryRecord:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e,r=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.FETCH_ALL_RECORDS();case 2:e=this.records.filter(function(t){return t.userId===r.userId}),e.length&&window.confirm("系统检测到您已经发布了".concat(e.length,"条信息,是否需要更新它们?"))&&this.$router.push("/my");case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()})},m=h,p=(r("5ab2"),r("2877")),l=Object(p["a"])(m,n,i,!1,null,"3e8cd722",null);e["default"]=l.exports},e2e2:function(t,e,r){}}]);
//# sourceMappingURL=RecordInfoView-legacy.f45c1b3a.js.map