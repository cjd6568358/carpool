(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["HomeView~RecordInfoView"],{"39ec":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-area"},[a("div",{staticClass:"form-item type"},[a("label",{staticClass:"label"},[e._v("我想要")]),a("div",{staticClass:"options"},[a("div",{staticClass:"item",class:{active:1===e.local_type},on:{click:function(t){e.local_type=1}}},[e._v("找车")]),a("div",{staticClass:"item",class:{active:2===e.local_type},on:{click:function(t){e.local_type=2}}},[e._v("找人")])])]),a("div",{staticClass:"form-item date"},[a("label",{staticClass:"label"},[e._v("时间")]),a("div",{staticClass:"options"},[e.isShowDate?e._e():a("div",{staticClass:"item",class:{active:e.local_date===e.today},on:{click:function(t){e.local_date=e.today}}},[e._v("今天")]),e.isShowDate?e._e():a("div",{staticClass:"item",class:{active:e.local_date===e.tomorrow},on:{click:function(t){e.local_date=e.tomorrow}}},[e._v("明天")]),e.isShowDate?e._e():a("div",{staticClass:"item",class:{active:e.local_date===e.dayAfterTomorrow},on:{click:function(t){e.local_date=e.dayAfterTomorrow}}},[e._v("后天")]),a("div",{staticClass:"item",class:{active:e.isShowDate},on:{click:function(t){e.isShowDate=!e.isShowDate}}},[e._v("自选")]),e.isShowDate?a("input",{directives:[{name:"model",rawName:"v-model",value:e.local_date,expression:"local_date"}],attrs:{min:e.today,type:"date"},domProps:{value:e.local_date},on:{input:function(t){t.target.composing||(e.local_date=t.target.value)}}}):e._e()])]),a("div",{staticClass:"form-item free"},[a("label",{staticClass:"label"},[e._v("空座")]),a("div",{staticClass:"options"},["search"===e.local_mode?a("div",{staticClass:"item",class:{active:-1===e.local_free},on:{click:function(t){e.local_free=-1}}},[e._v("不限")]):e._e(),a("div",{staticClass:"item",class:{active:1===e.local_free},on:{click:function(t){e.local_free=1}}},[e._v("1")]),a("div",{staticClass:"item",class:{active:2===e.local_free},on:{click:function(t){e.local_free=2}}},[e._v("2")]),a("div",{staticClass:"item",class:{active:3===e.local_free},on:{click:function(t){e.local_free=3}}},[e._v("3")]),a("div",{staticClass:"item",class:{active:4===e.local_free},on:{click:function(t){e.local_free=4}}},[e._v("4")])])]),a("div",{staticClass:"form-item fromCity"},[a("label",{staticClass:"label"},[e._v("出发地")]),a("div",{staticClass:"options"},[a("div",{staticClass:"picker citylocal_index",on:{click:function(t){return e.selectCityIndex(e.fromCityIndex,"from")}}},[e._v(e._s(e.cityList[e.fromCityIndex]))]),a("span",{attrs:{space:"nbsp"}},[e._v("-")]),a("div",{staticClass:"picker citylocal_arealocal_index",on:{click:function(t){return e.selectCityAreaIndex(e.fromCityAreaIndex,"from")}}},[e._v(e._s(e.fromCityAreaList[e.fromCityAreaIndex]))]),a("div",{staticClass:"tips"},[e._v("(左侧地区可更改)")])])]),a("div",{staticClass:"form-item toCity"},[a("label",{staticClass:"label"},[e._v("目的地")]),a("div",{staticClass:"options"},[a("div",{staticClass:"picker citylocal_index",on:{click:function(t){return e.selectCityIndex(e.toCityIndex,"to")}}},[e._v(e._s(e.cityList[e.toCityIndex]))]),a("span",{attrs:{space:"nbsp"}},[e._v("-")]),a("div",{staticClass:"picker citylocal_arealocal_index",on:{click:function(t){return e.selectCityAreaIndex(e.toCityAreaIndex,"to")}}},[e._v(e._s(e.toCityAreaList[e.toCityAreaIndex]))]),a("div",{staticClass:"tips"},[e._v("(左侧地区可更改)")])])]),"search"!==e.local_mode?a("div",{staticClass:"form-item name"},[a("label",{staticClass:"label"},[e._v("联系人")]),a("div",{staticClass:"options"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.local_name,expression:"local_name"}],attrs:{placeholder:"请输入您的姓名"},domProps:{value:e.local_name},on:{input:function(t){t.target.composing||(e.local_name=t.target.value)}}})])]):e._e(),"search"!==e.local_mode?a("div",{staticClass:"form-item fee"},[a("label",{staticClass:"label"},[e._v("拼车费用")]),a("div",{staticClass:"options"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.local_fee,expression:"local_fee"}],attrs:{type:"number",placeholder:"请输入费用"},domProps:{value:e.local_fee},on:{input:function(t){t.target.composing||(e.local_fee=t.target.value)}}})])]):e._e(),"search"!==e.local_mode?a("div",{staticClass:"form-item phone"},[a("label",{staticClass:"label require"},[e._v("联系方式")]),a("div",{staticClass:"options"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.local_phone,expression:"local_phone"}],attrs:{maxlength:"11",placeholder:"请输入您的手机号码",type:"tel"},domProps:{value:e.local_phone},on:{input:function(t){t.target.composing||(e.local_phone=t.target.value)}}})])]):e._e(),"search"!==e.local_mode?a("div",{staticClass:"form-item remark"},[a("div",{staticClass:"options"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.local_remark,expression:"local_remark"}],staticClass:"textarea",attrs:{maxlength:"120",placeholder:"具体出发时间，是否有小孩，行李有多少...个性化需求都可以写在这里哦~~"},domProps:{value:e.local_remark},on:{input:function(t){t.target.composing||(e.local_remark=t.target.value)}}})])]):e._e(),"add"===e.local_mode||"edit"===e.local_mode?a("div",{staticClass:"form-buttons"},[a("button",{staticClass:"btn submit",attrs:{type:"primary"},on:{click:e.bindSubmit}},["add"===e.local_mode?[e._v("提交")]:[e._v("更新")]],2),a("button",{staticClass:"btn reset",attrs:{type:"default"},on:{click:e.bindReset}},[e._v("重置")])]):e._e()])},l=[];a("28a5");function s(e){if(Array.isArray(e))return e}function c(e,t){var a=[],i=!0,l=!1,s=void 0;try{for(var c,r=e[Symbol.iterator]();!(i=(c=r.next()).done);i=!0)if(a.push(c.value),t&&a.length===t)break}catch(o){l=!0,s=o}finally{try{i||null==r["return"]||r["return"]()}finally{if(l)throw s}}return a}function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function o(e,t){return s(e)||c(e,t)||r()}var n=a("be94"),d=a("1da1"),h=(a("ac6a"),a("4260")),m=a("a75d"),p=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"picker",on:{click:function(e){e.stopPropagation()}}},[a("div",{staticClass:"picker-choose"},[a("span",{staticClass:"cancel",on:{click:e.cancel}},[e._v(e._s(e.cancelTxt))]),a("span",{staticClass:"confirm",on:{click:e.confirm}},[e._v(e._s(e.confirmTxt))]),a("h1",{staticClass:"picker-title"},[e._v(e._s(e.title))])]),a("PickerView",{ref:"pickerView",attrs:{selectedIndex:e.selectedIndex,data:e.pickerData},on:{change:e.handleChange}})],1)},f=[],u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"picker-view"},[a("div",{staticClass:"picker-content"},[a("div",{staticClass:"mask-top"}),a("div",{staticClass:"mask-bottom"}),a("div",{ref:"wheelWrapper",staticClass:"wheel-wrapper"},e._l(e.pickerData,function(t,i){return a("div",{key:i,staticClass:"wheel"},[a("ul",{staticClass:"wheel-scroll"},e._l(t,function(t,i){return a("li",{key:i,staticClass:"wheel-item"},[e._v(e._s(t.text))])}),0)])}),0)])])},y=[];const _="PickerView",v="change";var C={name:_,props:{data:{type:Array,default(){return[]}},selectedIndex:{type:Array,default(){return[]}}},data(){return{pickerSelectedIndex:this.selectedIndex.length?this.selectedIndex:new Array(this.pickerData.length).fill(0)}},computed:{pickerData(){return this.data.slice()}},beforeMount(){},mounted(){this.enable()},methods:{enable(){if(!this.wheels||this.dirty)this.$nextTick(()=>{this.wheels=[];let e=this.$refs.wheelWrapper;for(let t=0;t<this.pickerData.length;t++)this._createWheel(e,t);this.dirty=!1});else for(let e=0;e<this.pickerData.length;e++)this.wheels[e].enable(),this.wheels[e].wheelTo(this.pickerSelectedIndex[e])},disable(){for(let e=0;e<this.pickerData.length;e++)this.wheels[e].disable()},setSelectedIndex(e){this.pickerSelectedIndex=e},refill(e){let t=[];return e.length?(e.forEach((e,a)=>{t[a]=this.refillColumn(a,e)}),t):t},refillColumn(e,t){if(this.state!==STATE_SHOW)return void console.error("can not use refillColumn when picker is not show");const a=this.$refs.wheelWrapper;let i=a.children[e].querySelector(".wheel-scroll"),l=this.wheels[e];if(i&&l){let i=this.pickerData[e];this.$set(this.pickerData,e,t);let s=l.getSelectedIndex(),c=0;if(i.length){let e=i[s].value;for(let a=0;a<t.length;a++)if(t[a].value===e){c=a;break}}return this.pickerSelectedIndex[e]=c,this.$nextTick(()=>{l=this._createWheel(a,e),l.wheelTo(c)}),c}},scrollTo(e,t){const a=this.wheels[e];this.pickerSelectedIndex[e]=t,a.wheelTo(t)},refresh(){setTimeout(()=>{this.wheels.forEach((e,t)=>{e.refresh()})},200)},_createWheel(e,t){var i=this;return Object(d["a"])(function*(){let l=yield a.e("betterScroll").then(a.bind(null,"1fba")),s=l.default;return i.wheels[t]?i.wheels[t].refresh():(i.wheels[t]=new s(e.children[t],{wheel:{selectedIndex:i.pickerSelectedIndex[t]},probeType:3}),i.wheels[t].on("scrollEnd",()=>{i.$emit(v,t,i.wheels[t].getSelectedIndex())})),i.wheels[t]})()}},watch:{pickerData(){this.dirty=!0,this.enable()}}},k=C,x=(a("fb89"),a("2877")),w=Object(x["a"])(k,u,y,!1,null,null,null),b=w.exports;const I="Picker",g="select",S="valuechange",A="cancel";var $={name:I,props:{data:{type:Array,default(){return[]}},title:{type:String},cancelTxt:{type:String,default:"取消"},confirmTxt:{type:String,default:"确定"},selectedIndex:{type:Array,default(){return[]}},cascade:{type:Boolean,default:!1}},components:{PickerView:b},data(){let e=this.getColumnsSelectedIndex();return{pickerSelectedVal:[],pickerSelectedText:[],pickerSelectedIndex:e,pickerData:this.getPickerData(e)}},computed:{},beforeMount(){},watch:{},methods:{getPickerData(e){if(this.cascade){let t=[];return e.forEach((e,a)=>{0==t.length&&t.push(this.data);let i=t.slice(-1)[0][e].children;i&&t.push(i)}),t}return this.data},getColumnsSelectedIndex(){if(this.selectedIndex.length)return this.selectedIndex.slice();if(this.cascade){let e=[],t=a=>{e.push(a),a[0].children&&Array.isArray(a[0].children)&&t(a[0].children)};return t(this.data),new Array(e.length).fill(0)}return new Array(this.data.length).fill(0)},confirm(e){if(!this._canConfirm())return;this.$emit("closeModal",e);this.$refs.pickerView;let t=!1;this.pickerData.forEach((e,a)=>{let i=this.pickerSelectedIndex[a];this.pickerSelectedVal[a]=e[i].value,this.pickerSelectedText[a]=e[i].text,t||i===this.selectedIndex[a]||(t=!0)}),this.$emit(g,this.pickerSelectedIndex,this.pickerSelectedVal,this.pickerSelectedText),t&&this.$emit(S,this.pickerSelectedIndex,this.pickerSelectedVal,this.pickerSelectedText)},cancel(e){this.$emit("closeModal",e),this.$emit(A)},_canConfirm(){return this.$refs.pickerView.wheels.every(e=>{return!e.isInTransition})},handleChange(e,t){let a=this.$refs.pickerView;if(t!==this.pickerSelectedIndex[e]&&this.cascade){this.pickerSelectedIndex.splice(e,1,t);for(let t=this.pickerData.length-1;t>e;t--)this.pickerSelectedIndex.splice(t,1,0),a.scrollTo(t,0);e!=this.pickerData.length-1&&(a.setSelectedIndex(this.pickerSelectedIndex),this.pickerData=this.getPickerData(this.pickerSelectedIndex))}a.refresh()}}},D=$,T=(a("7cfc"),Object(x["a"])(D,p,f,!1,null,null,null)),L=T.exports,P={name:"Form",props:{dynamic:{type:Object,default:{}}},data(){let e=Date.now(),t=new Date(e).Format("yyyy-MM-dd"),a=new Date(e+864e5).Format("yyyy-MM-dd"),i=new Date(e+1728e5).Format("yyyy-MM-dd"),l=t;return{local_mode:"add",local_type:1,local_date:l,local_fromCity:["建湖","全部"],local_toCity:["上海","全部"],local_free:1,local_fee:100,local_phone:"",local_name:"",local_remark:"",isShowDate:!1,today:t,tomorrow:a,dayAfterTomorrow:i,cityList:Object.keys(m),fromCityIndex:0,fromCityAreaIndex:0,fromCityAreaList:[],toCityIndex:1,toCityAreaIndex:0,toCityAreaList:[]}},updated(){"search"===this.$data.local_mode&&this.bindSubmit()},mounted(){var e=this;return Object(d["a"])(function*(){Object(h["b"])().then(t=>{let a=e.$props.dynamic;Object.keys(a).forEach(t=>{e.$data["local_"+t]=a[t]});let i=e.$data,l=i.local_mode,s=i.local_fromCity,c=i.local_toCity,r=i.cityList;"上海市"===t&&"search"===l&&(s=["上海","全部"],c=["建湖","全部"]);let o=r.findIndex(e=>e===s[0]),d=m[s[0]].findIndex(e=>e===s[1]),h=r.findIndex(e=>e===c[0]),p=m[c[0]].findIndex(e=>e===c[1]),f=m[r[o]],u=m[r[h]];Object.assign(e.$data,{cityArea:m,cityList:r,local_fromCity:s,fromCityIndex:o,fromCityAreaIndex:d,fromCityAreaList:f,local_toCity:c,toCityIndex:h,toCityAreaIndex:p,toCityAreaList:u}),e.attachedData=Object(n["a"])({},e.$data)})})()},methods:{selectCityIndex(e,t){const a=this.$createElement;let i=[e],l=this.$data.cityList.map((e,t)=>{return{text:e,value:e}});this.$openModal({customClass:"modal-popup-picker",position:"bottom",maskClosable:!0,content:a(L,{attrs:{title:"请选择城市",cascade:!0,selectedIndex:i,data:l},on:{select:(e,a,i)=>this.cityPickerChange(e,a,i,t)}})})},selectCityAreaIndex(e,t){const a=this.$createElement;let i=[e],l=this.$data[t+"CityAreaList"].map((e,t)=>{return{text:e,value:e}});this.$openModal({customClass:"modal-popup-picker",position:"bottom",maskClosable:!0,content:a(L,{attrs:{title:"请选择地区",cascade:!0,selectedIndex:i,data:l},on:{select:(e,a,i)=>this.cityAreaPickerChange(e,a,i,t)}})})},cityPickerChange(e,t,a,i){let l=o(e,1),s=l[0],c=this.$data,r=c.cityList,n=c.cityArea,d=0,h=1,m=[],p=[];"from"===i?(d=s,h=d+1,r.length-1===d&&(h=0),m=n[r[d]],p=n[r[h]]):(h=s,d=h+1,r.length-1===h&&(d=0),m=n[r[d]],p=n[r[h]]),Object.assign(this.$data,{fromCityAreaList:m,toCityAreaList:p,fromCityIndex:d,toCityIndex:h,fromCityAreaIndex:0,toCityAreaIndex:0})},cityAreaPickerChange(e,t,a,i){let l=o(e,1),s=l[0];this.$data[i+"CityAreaIndex"]=s},bindSubmit(){let e=this.$data,t=e.local_mode,a=e.cityList,i=e.local_type,l=e.local_phone,s=e.local_name,c=e.local_free,r=e.local_fee,n=e.local_remark,d=e.local_date,h=e.fromCityAreaIndex,m=e.fromCityAreaList,p=e.fromCityIndex,f=e.toCityAreaIndex,u=e.toCityAreaList,y=e.toCityIndex,_=new Date(d).Format("yyyy-MM-dd").split("-"),v=o(_,3),C=v[0],k=v[1],x=v[2];if(!a)return;if(("add"===t||"edit"===t)&&!/^0?1[123456789]\d{9}$/.test(l))return void this.$Toast.info("请输入正确的手机号");let w=a[p]+"-"+m[h],b=a[y]+"-"+u[f],I={mode:t,type:i,phone:l,name:s,free:c,fee:r,remark:n,fromCity:w,toCity:b,year:C,month:k,day:x};"edit"===t&&(I.orderId=this.$data.local_orderId),this.$emit("submit",I)},bindReset(){Object.assign(this.$data,this.attachedData)}}},M=P,O=(a("43e6"),Object(x["a"])(M,i,l,!1,null,"5269d6c3",null));t["a"]=O.exports},"43e6":function(e,t,a){"use strict";var i=a("695b"),l=a.n(i);l.a},"695b":function(e,t,a){},"7cfc":function(e,t,a){"use strict";var i=a("b298"),l=a.n(i);l.a},a75d:function(e){e.exports={"上海":["全部","宝山","长宁","崇明","奉贤","虹口","黄浦","嘉定","金山","静安","卢湾","闵行","南汇","浦东","普陀","青浦","松江","徐汇","杨浦"],"建湖":["全部","上冈镇","建阳镇","颜单镇","恒济镇","庆丰镇","高作镇","芦沟镇","沿河镇","冈西镇","宝塔镇","九龙口镇","近湖街道","钟庄街道","塘河街道","经济开发区","高新经济区","九龙口"]}},b298:function(e,t,a){},ddd7:function(e,t,a){},fb89:function(e,t,a){"use strict";var i=a("ddd7"),l=a.n(i);l.a}}]);
//# sourceMappingURL=HomeView~RecordInfoView.7c8c17eb.js.map