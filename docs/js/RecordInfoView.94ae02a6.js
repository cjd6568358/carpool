(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["RecordInfoView"],{"919a":function(e,t,r){},b8f4:function(e,t,r){"use strict";var o=r("919a"),i=r.n(o);i.a},b9fb:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"record-info-page"},[r("NavBar",{attrs:{leftBtns:["back"],title:e.title}}),r("div",{staticClass:"overflow-container"},[r("Form",{attrs:{dynamic:e.dynamic},on:{submit:e.onSubmit}})],1)],1)},i=[],a=(r("a481"),r("1da1")),c=(r("28a5"),r("be94")),d=r("2f62"),n=r("39ec"),s=r("4260"),u={components:{Form:n["a"]},data(){return{dynamic:{},title:"信息发布"}},computed:Object(c["a"])({},Object(d["c"])(["records","userId","blackList"])),mounted(){let e=this.$route.query,t=e.mode,r=e.recordInfo,o=void 0===r?{}:r;"string"===typeof o&&(o=JSON.parse(o)),"add"===t?this.checkHistoryRecord():"edit"===t&&(this.title="信息修改",o.fromCity=o.fromCity.split("-"),o.toCity=o.toCity.split("-")),o.mode=t,this.$data.dynamic=o,this.FETCH_BLACKLIST()},methods:Object(c["a"])({},Object(d["b"])(["FETCH_ALL_RECORDS","UPDATE_ALL_RECORDS","FETCH_BLACKLIST"]),{onSubmit(e){var t=this;return Object(a["a"])(function*(){let r=e.mode,o=e.type,i=e.fromCity,a=e.toCity,c=e.phone,d=e.name,n=e.year,u=e.month,l=e.day,m=e.free,f=e.fee,b=e.remark,y=e.orderId;if(t.blackList.includes(c))return void alert("该用户已被禁止访问");yield t.FETCH_ALL_RECORDS();let C=[];"add"===r?(C=t.records,Object(s["c"])("拼车小助手",`用户:${t.userId} 手机号:${c} 发布了拼车信息`)):"edit"===r&&(C=t.records.filter(e=>e.orderId!==y),Object(s["c"])("拼车小助手",`用户:${t.userId} 手机号:${c} 修改了拼车信息`)),C.push({type:o,fromCity:i,toCity:a,phone:c,name:d,year:n,month:u,day:l,free:m,fee:f,remark:b,userId:t.userId,orderId:Object(s["a"])(),time:Date.now()}),yield t.UPDATE_ALL_RECORDS(C),t.$router.replace("/home")})()},checkHistoryRecord(){var e=this;return Object(a["a"])(function*(){yield e.FETCH_ALL_RECORDS();let t=e.records.filter(t=>t.userId===e.userId);t.length&&window.confirm(`系统检测到您已经发布了${t.length}条信息,是否需要更新它们?`)&&e.$router.push("/my")})()}})},l=u,m=(r("b8f4"),r("2877")),f=Object(m["a"])(l,o,i,!1,null,"595bba4c",null);t["default"]=f.exports}}]);