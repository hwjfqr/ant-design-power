(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{"/Ju5":function(e,t,n){"use strict";n.r(t);n("DYRE");var a=n("zeV3"),r=(n("+BJd"),n("mr32")),i=(n("+L6B"),n("2/Rp")),o=n("tJVT"),l=n("q1tI"),d=n.n(l),c=n("/7QA"),_=[...new Array(100)].map(((e,t)=>({id:t+1,username:"\u7528\u6237".concat(t+1),type:"\u7ba1\u7406\u5458",status:1})));function p(){var e=Object(l["useState"])("table"),t=Object(o["a"])(e,2),n=t[0],p=t[1];return d.a.createElement("div",null,d.a.createElement(i["a"],{type:"primary",onClick:()=>{p((e=>"list"===e?"table":"list"))}},"\u5207\u6362\u663e\u793a\u6a21\u5f0f"),d.a.createElement("div",{style:{paddingTop:10}},d.a.createElement(c["g"],{type:n,fields:[{title:"\u7528\u6237\u540d",dataIndex:"username",type:"title"},{title:"\u7c7b\u578b",dataIndex:"type"},{title:"\u72b6\u6001",dataIndex:"status",render:e=>1===e?d.a.createElement(r["a"],{color:"green"},"\u542f\u7528"):d.a.createElement(r["a"],{color:"red"},"\u7981\u7528")},{title:"\u64cd\u4f5c",dataIndex:"action",type:"action",render:()=>d.a.createElement(a["b"],null,d.a.createElement("a",null,"\u4fee\u6539"))}],commonProps:{rowKey:"id",dataSource:_,pagination:{}}})))}t["default"]=p},N5XS:function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),r=n.n(a),i=n("/7QA"),o=[{id:"1",net_profit_parent:"1.14\u4ebf",net_profit_parent_gr:"-0.523%",non_net_profit_deduction:"7807.03\u4e07",non_net_profit_deduction_gr:"-13.86%",total_operating_income:"94.44\u4ebf",total_operating_income_gr:"28.70%",date:"2022-03-31"},{id:"2",net_profit_parent:"1.14\u4ebf",net_profit_parent_gr:"-0.523%",non_net_profit_deduction:"7807.03\u4e07",non_net_profit_deduction_gr:"-13.86%",total_operating_income:"94.44\u4ebf",total_operating_income_gr:"28.70%",date:"2021-12-31"},{id:"3",net_profit_parent:"1.14\u4ebf",net_profit_parent_gr:"-0.523%",non_net_profit_deduction:"7807.03\u4e07",non_net_profit_deduction_gr:"-13.86%",total_operating_income:"94.44\u4ebf",total_operating_income_gr:"28.70%",date:"2021-09-30"},{id:"4",net_profit_parent:"1.14\u4ebf",net_profit_parent_gr:"-0.523%",non_net_profit_deduction:"7807.03\u4e07",non_net_profit_deduction_gr:"-13.86%",total_operating_income:"94.44\u4ebf",total_operating_income_gr:"28.70%",date:"2021-06-30"}];function l(){return r.a.createElement("div",null,r.a.createElement("div",{style:{paddingTop:10}},r.a.createElement(i["g"],{type:"table",verticalTableLayoutConf:{mainFieldName:"date",firstCol:{title:"\u79d1\u76ee/\u5e74\u5ea6",dataIndex:"subject",fixed:"left"}},fields:[{title:"\u65e5\u671f",dataIndex:"date",render:e=>e||"-",type:"title"},{title:"\u5f52\u6bcd\u51c0\u5229\u6da6(\u5143)",dataIndex:"net_profit_parent"},{title:"\u5f52\u6bcd\u51c0\u5229\u6da6\u540c\u6bd4\u589e\u957f\u7387",dataIndex:"net_profit_parent_gr"},{title:"\u6263\u975e\u51c0\u5229\u6da6(\u5143)",dataIndex:"non_net_profit_deduction"},{title:"\u6263\u975e\u51c0\u5229\u6da6\u540c\u6bd4\u589e\u957f\u7387",dataIndex:"non_net_profit_deduction_gr"},{title:"\u8425\u4e1a\u603b\u6536\u5165(\u5143)",dataIndex:"total_operating_income"},{title:"\u8425\u4e1a\u603b\u6536\u5165\u540c\u6bd4\u589e\u957f\u7387",dataIndex:"total_operating_income_gr"}],commonProps:{dataSource:o,rowKey:"id"},tableProps:{scroll:{x:"max-content"},pagination:!1}})))}t["default"]=l},zYDu:function(e,t,n){"use strict";n.r(t);n("+BJd");var a=n("mr32"),r=(n("DYRE"),n("zeV3")),i=(n("+L6B"),n("2/Rp")),o=n("tJVT"),l=n("q1tI"),d=n.n(l),c=n("/7QA"),_=[...new Array(100)].map(((e,t)=>({id:t+1,username:"\u7528\u6237".concat(t+1),type:"\u7ba1\u7406\u5458",status:1})));function p(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;return _.slice((e-1)*t,e*t)}function u(){var e=Object(l["useState"])("list"),t=Object(o["a"])(e,2),n=t[0],u=t[1];Object(l["useEffect"])((()=>{x(1)}),[n]);var s=Object(l["useState"])([]),m=Object(o["a"])(s,2),g=m[0],f=m[1],y=Object(l["useState"])(1),E=Object(o["a"])(y,2),b=E[0],x=E[1];return Object(l["useEffect"])((()=>{var e=p(b);if("list"===n)if(g.length&&1===b){f(e);var t=document.getElementById("scrollableDiv");t&&(t.scrollTop=0)}else f((t=>[...t,...e]));else f(e)}),[b]),d.a.createElement("div",null,d.a.createElement(r["b"],null,d.a.createElement(i["a"],{type:"primary",onClick:()=>{u((e=>"list"===e?"table":"list"))}},"\u5207\u6362\u663e\u793a\u6a21\u5f0f"),d.a.createElement(i["a"],{onClick:()=>{x(1)}},"\u91cd\u7f6e")),d.a.createElement("div",{style:{paddingTop:10}},d.a.createElement(c["g"],{type:n,infiniteScroll:{dataLength:g.length,next:()=>{x((e=>e+1))},hasMore:g.length<_.length,loader:d.a.createElement("div",{style:{textAlign:"center"}},"\u52a0\u8f7d\u4e2d..."),endMessage:d.a.createElement("div",{style:{textAlign:"center"}},"\u52a0\u8f7d\u5b8c\u6bd5")},scrollableDivHeight:"calc(100vh - 92px - 22px)",fields:[{title:"\u7528\u6237\u540d",dataIndex:"username",type:"title"},{title:"\u7c7b\u578b",dataIndex:"type"},{title:"\u72b6\u6001",dataIndex:"status",render:e=>1===e?d.a.createElement(a["a"],{color:"green"},"\u542f\u7528"):d.a.createElement(a["a"],{color:"red"},"\u7981\u7528")},{title:"\u64cd\u4f5c",dataIndex:"action",type:"action",render:()=>d.a.createElement(r["b"],null,d.a.createElement("a",null,"\u4fee\u6539"))}],commonProps:{rowKey:"id",dataSource:g},tableProps:{pagination:{total:_.length,current:b,defaultPageSize:10,showSizeChanger:!1,onChange:e=>{x(e)}}}})))}t["default"]=u}}]);