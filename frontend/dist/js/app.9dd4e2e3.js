(function(t){function e(e){for(var a,n,o=e[0],l=e[1],c=e[2],p=0,d=[];p<o.length;p++)n=o[p],r[n]&&d.push(r[n][0]),r[n]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(d.length)d.shift()();return i.push.apply(i,c||[]),s()}function s(){for(var t,e=0;e<i.length;e++){for(var s=i[e],a=!0,o=1;o<s.length;o++){var l=s[o];0!==r[l]&&(a=!1)}a&&(i.splice(e--,1),t=n(n.s=s[0]))}return t}var a={},r={app:0},i=[];function n(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=a,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(s,a,function(e){return t[e]}.bind(null,a));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;i.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"034f":function(t,e,s){"use strict";var a=s("1356"),r=s.n(a);r.a},"07e9":function(t,e,s){},1:function(t,e){},1356:function(t,e,s){},"1e7b":function(t,e,s){t.exports=s.p+"img/p1.4519e12c.svg"},"56d7":function(t,e,s){"use strict";s.r(e);var a=s("2b0e"),r=s("bb71");s("da64");a["a"].use(r["a"]);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},n=[],o={name:"App"},l=o,c=(s("034f"),s("2877")),u=Object(c["a"])(l,i,n,!1,null,null,null);u.options.__file="App.vue";var p=u.exports,d=s("8c4f"),v=s("2f62"),m=s("8055"),h=s.n(m);a["a"].use(v["a"]);var g=new v["a"].Store({state:{socket:h()("hyperline.herokuapp.com",{path:"/backend/"}),sessionId:void 0,marker:0,p1:"",p2:"",firstTurn:"p1",starter:!1},mutations:{assignSession(t,{id:e,marker:s,starter:a}){t.sessionId=e,t.marker=s,t.starter=a},setPlayerNames(t,{p1:e,p2:s}){t.p1=e,t.p2=s},invertStarter(t){t.starter=!t.starter,t.firstTurn=t.firstTurn.endsWith("1")?"p2":"p1"}}}),f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-container",{staticClass:"pa-0",attrs:{"fill-height":"",fluid:""}},[a("v-layout",{staticClass:"wrapper"},[a("v-flex",{staticClass:"setup grey lighten-5"},[a("v-layout",{staticClass:"content-setup",attrs:{column:""}},[a("div",{staticClass:"mt-3 content-setup-title"},[a("p",{staticClass:"text-xs-center headline font-monospace"},[t._v("Setup")]),a("v-divider")],1),a("div",{staticClass:"content-setup-host"},[a("v-img",{staticClass:"mx-4 my-4 illus",attrs:{src:s("c25b"),"max-height":"280",contain:""},on:{click:function(e){t.openSetup(0)}}}),a("p",{staticClass:"text-xs-center body-2"},[t._v("Host a new game")])],1),a("div",{staticClass:"content-setup-connect"},[a("v-img",{staticClass:"mx-4 my-4 illus",attrs:{src:s("9a6e"),"max-height":"280",contain:""},on:{click:function(e){t.openSetup(1)}}}),a("p",{staticClass:"text-xs-center body-2"},[t._v("Connect with a friend")])],1)])],1),a("v-flex",{staticClass:"about light-blue lighten-5"},[a("v-layout",{staticClass:"content-about",attrs:{column:""}},[a("div",{staticClass:"mt-3 content-about-title"},[a("p",{staticClass:"text-xs-center headline font-monospace game-title"},[t._v("hyperline")]),a("v-divider")],1),a("div",{staticClass:"mx-5 content-about-info"},[a("p",{staticClass:"text-xs-center font-italic title font-weight-regular spacing"},[t._v("“Line. Not the usual one.”")]),a("br"),a("div",{staticClass:"mx-5"},[a("p",{staticClass:"subheading"},[t._v("\n                                A generalized tic-tac-toe game with 3 different levels and 2 different variants to play.\n                                The goal is to create a hyperline spanning across a row, column, or any of the 2 diagonals.\n                            ")]),a("p",{staticClass:"subheading font-weight-medium pt-2"},[t._v("Levels/Grids")]),a("p",{staticClass:"subheading"},[t._v("\n                                • Child's play "),a("span",{staticClass:"px-1"},[t._v("➝")]),t._v(" 3 ✖ 3\n                                "),a("br"),t._v("\n                                • Passable "),a("span",{staticClass:"px-1"},[t._v("➝")]),t._v(" 5 ✖ 5\n                                "),a("br"),t._v("\n                                • Insane "),a("span",{staticClass:"px-1"},[t._v("➝")]),t._v(" 7 ✖ 7\n                            ")]),a("p",{staticClass:"subheading font-weight-medium pt-2"},[t._v("Variants")]),a("p",{staticClass:"subheading"},[t._v("\n                                ―  Standard\n                                "),a("br"),t._v("\n                                The normal tic-tac-toe. Two players, X & O take turns in marking the places. First to create a hyperline wins.\n                            ")]),a("p",{staticClass:"subheading"},[t._v("\n                                ―  Numeric\n                                "),a("br"),t._v("\n                                Two players, one plays with odd numbers, other with even. For a given grid, numbers from 1 to X are used.\n                                First to create a hyperline summing upto Y wins.\n                            ")]),a("br"),a("v-data-table",{staticClass:"elevation-3 mx-auto",staticStyle:{"max-width":"60%"},attrs:{headers:t.headers,items:t.items,"hide-actions":""},scopedSlots:t._u([{key:"items",fn:function(e){return[a("td",{staticClass:"text-xs-center",domProps:{innerHTML:t._s(e.item.grid)}}),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.x))]),a("td",{staticClass:"text-xs-center"},[t._v(t._s(e.item.y))])]}}])})],1)])])],1)],1),a("v-dialog",{attrs:{"max-width":"500px",persistent:""},model:{value:t.setupDialog,callback:function(e){t.setupDialog=e},expression:"setupDialog"}},[a("v-card",[a("v-card-title",{staticClass:"pb-1 title font-weight-regular"},[t._v(t._s(t.currentTitle))]),a("v-window",{model:{value:t.setupStep,callback:function(e){t.setupStep=e},expression:"setupStep"}},[a("v-window-item",{attrs:{value:1}},[a("v-card-text",[t.setupDialog?a("v-text-field",{attrs:{label:"Gamer name",autofocus:""},model:{value:t.gamerName,callback:function(e){t.gamerName=e},expression:"gamerName"}}):t._e(),a("p",{staticClass:"mb-0 caption grey--text text--darken-1"},[t._v("You will be identified by this name throughout the game")])],1),a("v-divider"),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"my-1 mr-1",attrs:{color:"primary",loading:t.buttonLoader,disabled:t.buttonLoader},on:{click:t.nextWindow}},[t._v("\n                                "+t._s(0===t.setupChoice?"host":"next")+"\n                            ")])],1)],1),0===t.setupChoice?a("v-window-item",{attrs:{value:2}},[a("v-card-text",{staticClass:"pt-0"},[a("p",{staticClass:"py-4 mb-0 text-xs-center display-1 blue--text text--darken-2 font-monospace"},[t._v("\n                                "+t._s(t.$store.state.sessionId)+"\n                            ")]),a("p",{staticClass:"pt-2 mb-0 caption grey--text text--darken-1"},[t._v("\n                                Ask your friend to use the above session ID to connect with you\n                            ")])])],1):a("v-window-item",{attrs:{value:2}},[a("v-card-text",[a("v-text-field",{attrs:{label:"Session ID","error-messages":t.sessionError,autofocus:""},on:{focus:t.onFocus},model:{value:t.sessionId,callback:function(e){t.sessionId=e},expression:"sessionId"}}),a("p",{staticClass:"mb-0 pt-3 caption grey--text text--darken-1"},[t._v("Enter session ID generated by your friend to connect")])],1),a("v-divider"),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"my-1 mr-1",attrs:{color:"primary"},on:{click:t.validateSession}},[t._v("\n                                connect\n                            ")])],1)],1)],1)],1)],1)],1)],1)},b=[],y={name:"Setup",data(){return{setupDialog:!1,setupChoice:0,setupStep:1,buttonLoader:!1,gamerName:"",sessionId:"",sessionError:"",headers:[{text:"Grid",align:"center",sortable:!1},{text:"X",align:"center",sortable:!1},{text:"Y",align:"center",sortable:!1}],items:[{grid:"3 &#10006; 3",x:"9",y:"15"},{grid:"5 &#10006; 5",x:"25",y:"65"},{grid:"7 &#10006; 7",x:"49",y:"175"}]}},methods:{openSetup(t){this.setupDialog=!0,this.setupChoice=t},nextWindow(){0===this.setupChoice?(this.buttonLoader=!0,this.$store.state.socket.emit("newHost",this.gamerName),this.$store.state.socket.on("sessionAssigned",t=>{this.$store.commit({type:"assignSession",id:t,marker:1,starter:!0}),this.buttonLoader=!1,this.setupStep++}),this.$store.state.socket.on("playerAdded",t=>{t.success&&(this.$store.commit({type:"setPlayerNames",p1:t[1],p2:t[2]}),this.$router.push("/game"))})):this.setupStep++},validateSession(){this.$store.state.socket.emit("addPlayer",this.gamerName,this.sessionId.trim()),this.$store.state.socket.on("playerAdded",t=>{t.success?(this.$store.commit({type:"assignSession",id:this.sessionId,marker:2,starter:!1}),this.$store.commit({type:"setPlayerNames",p1:t[1],p2:t[2]}),this.$router.push("/game")):this.sessionError="Session not found"})},onFocus(){this.sessionError=""}},computed:{currentTitle(){switch(this.setupStep){case 1:return"Name";case 2:return 0===this.setupChoice?"Waiting...":"Connect"}}}},x=y,C=(s("e05e"),s("6544")),_=s.n(C),w=s("7496"),k=s("8336"),$=s("b0af"),S=s("99d9"),V=s("12b2"),T=s("a523"),A=s("8fea"),O=s("169a"),I=s("ce7e"),P=s("0e8f"),L=s("adda"),D=s("a722"),N=s("9910"),j=s("2677"),B=s("f665"),E=s("1e6c"),F=Object(c["a"])(x,f,b,!1,null,"3989f2c0",null);F.options.__file="Setup.vue";var G=F.exports;_()(F,{VApp:w["a"],VBtn:k["a"],VCard:$["a"],VCardActions:S["a"],VCardText:S["b"],VCardTitle:V["a"],VContainer:T["a"],VDataTable:A["a"],VDialog:O["a"],VDivider:I["a"],VFlex:P["a"],VImg:L["a"],VLayout:D["a"],VSpacer:N["a"],VTextField:j["a"],VWindow:B["a"],VWindowItem:E["a"]});var M=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-toolbar",{attrs:{prominent:""}},[a("v-toolbar-title",{staticClass:"text-xs-center headline font-monospace game-title"},[t._v("hyperline")]),a("v-spacer"),a("v-toolbar-items",[a("v-menu",{attrs:{transition:"slide-y-transition",bottom:"","offset-y":""}},[a("v-btn",{attrs:{slot:"activator",flat:""},slot:"activator"},[t._v("level")]),a("v-list",t._l(t.levels,function(e,s){return a("v-list-tile",{key:s,attrs:{disabled:t.gameOngoing||!t.$store.state.starter},on:{click:function(s){t.emitChange(e)}}},[a("v-list-tile-title",[t._v(t._s(e.name))])],1)}))],1),a("v-menu",{attrs:{transition:"slide-y-transition",bottom:"","offset-y":""}},[a("v-btn",{attrs:{slot:"activator",flat:""},slot:"activator"},[t._v("variant")]),a("v-list",t._l(t.variants,function(e,s){return a("v-list-tile",{key:s,attrs:{disabled:!0},on:{click:function(s){t.resetGrid(e)}}},[a("v-list-tile-title",[t._v(t._s(e.name))])],1)}))],1)],1)],1),a("v-container",{staticClass:"pa-0",attrs:{"fill-height":"",fluid:""}},[a("v-layout",{staticClass:"wrapper"},[a("v-flex",{staticClass:"game",attrs:{"justify-center":"","align-center":""}},[a("div",{staticClass:"pa-5 grid",class:"grid-size-"+t.currentLevel},t._l(t.gridArray,function(e,r){return a("div",{key:r,staticClass:"grid-box",on:{click:function(e){t.markSpace(r)}}},[e?a("v-img",{attrs:{src:s("bea4")("./p"+e+".svg"),"max-width":"35%",contain:""}}):t._e()],1)}))]),a("v-flex",{class:"updates "+t.resultColor+" lighten-5"},[a("v-layout",{staticClass:"py-5 mx-5",attrs:{column:"","fill-height":""}},[a("div",{staticClass:"mb-5 versus"},[a("p",{staticClass:"mb-0 text-xs-center title"},[t._v(t._s(t.$store.state.p1))]),a("v-img",{staticClass:"mx-4",attrs:{src:s("a6c7"),"max-width":"50px",contain:""}}),a("p",{staticClass:"mb-0 text-xs-center title"},[t._v(t._s(t.$store.state.p2))])],1),t.wonBy?"none"===t.wonBy?a("div",[a("p",{staticClass:"title text-xs-center"},[t._v("Draw!")])]):a("div",[a("p",{staticClass:"title text-xs-center"},[t._v("Winner: "+t._s(t.wonBy))]),a("p",{staticClass:"text-xs-center"},[t.$store.state.starter?a("v-btn",{attrs:{color:"blue-grey darken-3",dark:""},on:{click:t.emitPlayAgain}},[t._v("\n                                play again\n                            ")]):t._e()],1)]):a("div",[a("p",{staticClass:"subheading text-xs-center"},[t._v("Current turn")]),a("p",{staticClass:"title text-xs-center"},[t._v(t._s(t.currentPlayer))])])])],1)],1)],1)],1)},W=[],H={name:"Game",data(){return{levels:[{name:"Child's play",value:3},{name:"Passable",value:5},{name:"Insane",value:7}],currentLevel:3,variants:[{name:"Standard",value:0},{name:"Numeric",value:1}],currentVariant:0,resultColor:"amber",gridArray:[0,0,0,0,0,0,0,0,0],currentPlayer:this.$store.state[this.$store.state.firstTurn],turn:this.$store.state.starter,gameOngoing:!1,wonBy:""}},methods:{emitChange(t){this.$store.state.socket.emit("gridChange",t.value)},resetGrid(t){this.currentLevel=t,this.gridArray=Array(t*t).fill(0)},markSpace(t){this.gameOngoing=!0,this.gridArray[t]||!this.turn||this.wonBy||(this.turn=!1,this.$set(this.gridArray,t,this.$store.state.marker),this.$store.state.socket.emit("turnPlayed",{index:t,gridArray:this.gridArray}))},checkForDraw(){-1===this.gridArray.indexOf(0)&&(this.wonBy="none",this.resultColor="blue-grey",this.gameOngoing=!1,this.$store.commit("invertStarter"),this.turn=this.$store.state.starter)},emitPlayAgain(){this.$store.state.socket.emit("playAgain",this.currentLevel)},playAgain(t){this.resetGrid(t),this.wonBy="",this.resultColor="amber",this.currentPlayer=this.$store.state[this.$store.state.firstTurn]}},mounted:function(){this.turn=1===this.$store.state.marker,this.$store.state.socket.on("destroySession",()=>{window.location.reload()}),this.$store.state.socket.on("nextTurn",t=>{this.currentPlayer=this.$store.state[`p${t.newMarker}`],Object.assign(this.gridArray,t.gridArray),this.turn=t.newMarker===this.$store.state.marker,this.wonBy=t.wonBy,this.wonBy?(this.resultColor="green",this.gameOngoing=!1,this.$store.commit("invertStarter"),this.turn=this.$store.state.starter):this.checkForDraw()}),this.$store.state.socket.on("updateGrid",t=>this.resetGrid(t)),this.$store.state.socket.on("resetGame",t=>this.playAgain(t))}},X=H,Y=(s("9100"),s("8860")),z=s("ba95"),J=s("5d23"),U=s("e449"),q=s("71d9"),K=s("2a7f"),Q=Object(c["a"])(X,M,W,!1,null,"b5b9b692",null);Q.options.__file="Game.vue";var R=Q.exports;_()(Q,{VApp:w["a"],VBtn:k["a"],VContainer:T["a"],VFlex:P["a"],VImg:L["a"],VLayout:D["a"],VList:Y["a"],VListTile:z["a"],VListTileTitle:J["b"],VMenu:U["a"],VSpacer:N["a"],VToolbar:q["a"],VToolbarItems:K["a"],VToolbarTitle:K["b"]}),a["a"].use(d["a"]);var Z=new d["a"]({mode:"history",base:"/",routes:[{path:"/",redirect:"/game"},{path:"/setup",component:G,beforeEnter:(t,e,s)=>{void 0===g.state.sessionId?s():s("/game")}},{path:"/game",component:R,beforeEnter:(t,e,s)=>{void 0!==g.state.sessionId?s():s("/setup")}},{path:"*",redirect:"/setup"}]});s("d5e8"),s("d7c4"),s("d1e7");a["a"].config.productionTip=!1,new a["a"]({router:Z,store:g,render:t=>t(p)}).$mount("#app")},"7e00":function(t,e,s){},9100:function(t,e,s){"use strict";var a=s("7e00"),r=s.n(a);r.a},"9a6e":function(t,e,s){t.exports=s.p+"img/connect.58b1af0b.svg"},a6c7:function(t,e,s){t.exports=s.p+"img/versus.1930fb55.svg"},bea4:function(t,e,s){var a={"./p1.svg":"1e7b","./p2.svg":"e019"};function r(t){var e=i(t);return s(e)}function i(t){var e=a[t];if(!(e+1)){var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}return e}r.keys=function(){return Object.keys(a)},r.resolve=i,t.exports=r,r.id="bea4"},c25b:function(t,e,s){t.exports=s.p+"img/host.4d673146.svg"},e019:function(t,e,s){t.exports=s.p+"img/p2.0be17b7b.svg"},e05e:function(t,e,s){"use strict";var a=s("07e9"),r=s.n(a);r.a}});