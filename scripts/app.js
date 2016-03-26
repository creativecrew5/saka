"use strict";angular.module("ui.flowtjjabs",[]).directive("flowtabsGroup",["$window",function(){return{templateUrl:"app/components/flowtabs/views/index.html",restrict:"EA",replace:!0,scope:{collection:"="},controller:["$scope","$element","$attrs","$transclude",function(){this["goto"]=function(e,t){console.log([e,t]),this.scrollTo(e)}}],link:function(){}}}]).directive("member",["$compile",function(e){return{restrict:"E",replace:!0,require:"^flowtabsGroup",scope:{member:"=",parent:"=name"},templateUrl:"app/components/flowtabs/views/flowtab.html",link:function(t,a){angular.extend(t.member,{id:"fl-"+_.uniqueId(),isActive:!1}),t["goto"]=function(e,a,n){for(var s=t.member.children.length-1;s>=0;s--)t.member.children[s].isActive=!1;t.member.children[n].isActive=!0,_.defer(function(){$("#"+a).offset().top},0)},"root"===t.member.data.type&&(t.member.isActive=!0);var n='<flowtabs-group parent="member.name" collection="member.children"></flowtabs-group>';angular.isArray(t.member.children)&&e(n)(t,function(e){a.append(e)})}}}]),angular.module("ui.flowtabs",[]).directive("decisiontree",["$window",function(){return{templateUrl:"app/components/decisiontree/decisiontree.html",restrict:"EA",replace:!0,scope:{data:"=data"},controller:["$scope","$element","$attrs","$transclude",function(e){function t(e,a){var n=e.decisions;if(_.isUndefined(e.name)||a<e.id&&a!==e.id&&"content-block"===e.type&&(e.isActive=!1),!_.isUndefined(n))for(var s=0;s<n.length;s++)t(n[s],a)}this.hideChilds=function(a){t(e.data,a)}}],link:function(){}}}]).directive("decisiontreeNode",["$compile",function(e){return{restrict:"E",replace:!0,require:"^decisiontree",scope:{nodeData:"=nodeData"},templateUrl:"app/components/decisiontree/node.html",link:function(t,a,n,s){angular.extend(t.nodeData,{id:"dn-"+_.uniqueId(),isActive:!1});var i='<decisiontree data="nodeData"></decisiontree>';t["goto"]=function(e,a){for(var n=t.nodeData.decisions.length-1;n>=0;n--)t.nodeData.decisions[n].isActive=t.nodeData.decisions[n].id===a?!0:!1;s.hideChilds(a),_.defer(function(){var e=$("body"),t=$("#"+a).offset().top+$("#"+a).position().top-e.offset().top;$("body").animate({scrollTop:t},700)},200)},angular.isArray(t.nodeData.decisions)&&e(i)(t,function(e){a.append(e)})}}}]),angular.module("app.components",[]),angular.module("commons.services",[]),angular.module("csoon",[]),angular.module("webApp",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ui.bootstrap","ui.flowtabs","csoon"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t){t.otherwise("/")}]).run(["$templateCache",function(){}]).constant("_",window._);var httpInterceptor=function(e,t){e.factory("httpInterceptor",["$q","$location","$rootScope",function(e,t,a){return{response:function(t){return 302===t.status&&window.location.reload(!0),a.$emit("app.response.success",t),t||e.when(t)},responseError:function(t){return a.$emit("app.response.error",t),401===t.status&&window.location.reload(!0),e.reject(t)}}}]),t.interceptors.push("httpInterceptor")};httpInterceptor.$inject=["$provide","$httpProvider"],angular.module("webApp").config(httpInterceptor),function(){function e(){return{isLoggedIn:function(){return!1},getUser:function(){return t},getCalData:function(){return calData}}}angular.module("commons.services").factory("AppServices",e),e.$inject=["$http","$window","$q","appConfig"];var t={userName:"John Doe",jobRole:"Sales Comp HR"}}(),angular.module("webApp").config(["$stateProvider","$urlRouterProvider",function(e){e.state("home",{url:"/",templateUrl:"app/main/index.html",controller:"MainCtrl",controllerAs:"vm"})}]).controller("MainCtrl",["$rootScope","$scope","$state","$timeout","$log",function(){var e=this;e.tree={decisions:[]},e.tree.decisions=[{name:"Do you have a serious health problem? ",type:"root",content:{title:"Do you have a serious health problem? "},decisions:[{name:"Yes",type:"terminal",content:{title:"Go to hospital"}},{name:"No",type:"node",content:{title:"Have you used Drug A to treat your symptoms before?"},decisions:[{name:"Yes",type:"terminal",content:{title:"Please consult doctors"}},{name:"No",type:"node",content:{title:"Do you notice any side effects?"},decisions:[{name:"Yes",type:"terminal",content:{title:"Please consult doctors "}},{name:"No",type:"node",content:{title:"How is your symptom today?"},decisions:[{name:"Better",type:"node",content:{title:"Is your symptom mild? "},decisions:[{name:"Yes",type:"node",content:{title:"Do you have redness or flushing on your forehead, chin or nose?"},decisions:[{name:"Yes",type:"node",content:{title:"Describe the location of your pimples (Left, Right, Center)"},decisions:[{name:"Left",type:"terminal",content:{title:"You have side pimples"}},{name:"Right",type:"terminal",content:{title:"You have side pimples"}},{name:"Center",type:"terminal",content:{title:"You have pimples"}}]},{name:"No",type:"terminal",content:{title:"Please consult doctors"}}]},{name:"No",type:"terminal",content:{title:"Your health is better today"}}]},{name:"Same",type:"terminal",content:{title:"Please consult doctors"}},{name:"Worse",type:"terminal",content:{title:"Please consult doctors"}}]}]}]}]}]}]),angular.module("csoon").config(["$stateProvider","$urlRouterProvider",function(e){e.state("csoon",{url:"/csoon",templateUrl:"app/csoon/csoon.html",controller:"ComingSoonCtrl",controllerAs:"vm"}),e.state("csoon.a",{url:"/csoon/a",templateUrl:"app/csoon/csoon.html",controller:"ComingSoonCtrl",controllerAs:"vm"})}]).controller("ComingSoonCtrl",function(){}),angular.module("webApp").factory("appConfig",function(){var e={},t=!0,a=" ";return t&&(a=" "),{get:function(t){return e[t]},getURL:function(e){return a+e}}}),angular.module("webApp").run(["$templateCache",function(e){e.put("app/csoon/csoon.html",'<div class="container-fluid"><div class="atl-panel"><div class="atl-panel__header"><h1>Coming soon...</h1></div></div></div>'),e.put("app/main/index.html",'<div class="container"><div class="decision-tree-container"><decisiontree data="vm.tree"></decisiontree></div></div>'),e.put("app/components/decisiontree/decisiontree.html",'<div class="decisiontree-branch"><decisiontree-node ng-repeat="decision in data.decisions" node-data="decision"></decisiontree-node></div>'),e.put("app/components/decisiontree/node.html",'<div id="{{nodeData.id}}" class="decisiontree-node {{nodeData.type}}" ng-class="{\'active\':nodeData.isActive || nodeData.type===\'root\', \'collapsed\':!nodeData.isActive && nodeData.type !==\'root\'}"><div class="decisiontree-node-content leaf" ng-if="nodeData.type===\'leaf\'"><h3>{{nodeData.content.title}}</h3><p>{{nodeData.content.description}}</p></div><div class="decisiontree-node-content" ng-if="nodeData.type!==\'leaf\'"><h3>{{nodeData.content.title}}</h3><p class="node-description">{{nodeData.content.description}}</p><div class="decisiontree-nav" ng-class="{\'active\':nodeData.isActive}"><button class="btn btn-default {{item.type}}" ng-class="{\'active\':item.isActive}" ng-repeat="item in nodeData.decisions" ng-click="goto(item,item.id,item.type,item.name)">{{item.name}} <span class="down-arrow"></span></button></div><div class="canvas-wrap"><div id="dcn-{{nodeData.id}}"></div></div></div><div class="nav-drop-shadow" ng-if="nodeData.content.dropShadow"></div><div class="node-block-content"><div ng-include="nodeData.content.templateUrl"></div></div></div>'),e.put("app/components/flowtabs/views/flowtab.html",'<li id="{{member.id}}" class="flowtab {{member.data.type}}" ng-class="{\'active\':member.isActive}"><div class="tab-group" ng-if="member.data.type!==\'leaf\'"><div class="flowtab-header"><h1>{{member.title}}</h1><p>{{member.description}}</p></div><div class="flowtab-content"><div ng-include="member.data.templateUrl"></div></div><div class="flowtab-nav"><div ng-repeat="nextItem in member.children"><button class="btn btn-default" ng-click="goto(member.id,nextItem.id,$index)">{{nextItem.title}}</button></div></div></div><div class="tab-group" ng-if="member.data.type==\'leaf\'"><div class="flowtab-header"><h1>{{member.title}}</h1><p>{{member.description}}</p></div></div></li>'),e.put("app/components/flowtabs/views/index.html",'<ul id="{{member.id}}" class="flowtab-group {{member.type}}"><member ng-repeat="member in collection" member="member"></member></ul>'),e.put("app/components/decisiontree/views/flowtab.html",'<li id="{{member.id}}" class="flowtab {{member.data.type}}" ng-class="{\'active\':member.isActive}"><div class="tab-group" ng-if="member.data.type!==\'leaf\'"><div class="flowtab-header"><h1>{{member.title}}</h1><p>{{member.description}}</p></div><div class="flowtab-content"><div ng-include="member.data.templateUrl"></div></div><div class="flowtab-nav"><div ng-repeat="nextItem in member.children"><button class="btn btn-default" ng-click="goto(member.id,nextItem.id,$index)">{{nextItem.title}}</button></div></div></div><div class="tab-group" ng-if="member.data.type==\'leaf\'"><div class="flowtab-header"><h1>{{member.title}}</h1><p>{{member.description}}</p></div></div></li>'),e.put("app/components/decisiontree/views/index.html",'<ul id="{{member.id}}" class="flowtab-group {{member.type}}"><member ng-repeat="member in collection" member="member"></member></ul>'),e.put("app/components/decisiontree/demo/templates/content-1.html",'<div class="flow-content"><strong>If the mandate is struck down</strong><div class="col-md-6"><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p></div><div class="col-md-6"><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p></div></div>'),e.put("app/components/decisiontree/demo/templates/content-2.html",'<div class="flow-content"><strong>The central reforms protecting</strong><div class="col-md-12"><p>The central reforms protecting those with pre-existing conditions would be lost. Remaining provisions in the law would need to be adjusted. The federal government argued for this option if the mandate is struck down. The justices seemed uneasy with too much judicial editing of the law.</p></div><div class="col-md-6"><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p></div></div>'),e.put("app/components/decisiontree/demo/templates/content-3.html",'<div class="flow-content"><strong>If the mandate is struck down</strong><div class="col-md-6"><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p></div><div class="col-md-6"><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p></div></div>'),e.put("app/components/flowtabs/demo/templates/1.html",'<div class="flow-content"><i>The Supreme Court will issue a decision this month on President Obama’s 2010 health care law. The court is considering a series of questions to determine whether the law, or parts of it, will survive. <a href="">Related Article »</a></i><h1>1. Is it too soon to consider this case?</h1><p>The Anti-Injunction Act says that taxes cannot be challenged in court until they are first levied. The justices will decide if the health law’s penalties, which will not be due until 2015, can be considered a tax.</p></div>'),e.put("app/components/flowtabs/demo/templates/2.html",'<div class="flow-content"><h3>Try again later</h3><p>The door would be left open for a challenge later on, but the law would continue to go into effect.</p></div>'),e.put("app/components/flowtabs/demo/templates/3.html",'<div class="flow-content"><h1>2. Is the individual mandate constitutional?</h1><p>The mandate requires most people to have health insurance or pay an annual penalty. Opponents of the law say the requirement to buy a product or service is not within the federal government’s powers.</p></div>'),e.put("app/components/flowtabs/demo/templates/4.html",'<div class="flow-content"><h3>Carry on</h3><p>If the mandate is upheld, it will take effect as planned in 2014.</p></div>'),e.put("app/components/flowtabs/demo/templates/5.html",'<div class="flow-content"><h1></h1><p></p></div>'),e.put("app/components/flowtabs/demo/templates/7.html",'<div class="flow-content"><h1>3. How much of the law will have to be cut?</h1><p>Two of the law’s major provisions — health insurers must take all applicants and cannot charge them different rates based on health — rely on the mandate to help offset costs. Congress did not include an explicit “severability” clause in the health law, which is sometimes used to say what parts of a law survive if other parts are found unconstitutional.</p></div>'),e.put("app/components/flowtabs/demo/templates/8.html",'<div class="flow-content"><h1>3. How much of the law will have to be cut?</h1><p>Two of the law’s major provisions — health insurers must take all applicants and cannot charge them different rates based on health — rely on the mandate to help offset costs. Congress did not include an explicit “severability” clause in the health law, which is sometimes used to say what parts of a law survive if other parts are found unconstitutional.</p></div>'),e.put("app/components/flowtabs/demo/templates/content-1.html",'<div class="flow-content"><strong>If the mandate is struck down</strong><div class="col-md-6"><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p></div><div class="col-md-6"><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p><p>It would be up to Congress to retool the law to ensure the remaining rules don’t trigger a “death spiral” of soaring premiums as all but the sickest flee the market. During oral arguments in March, liberal justices indicated they preferred cutting as little as possible and leaving any necessary changes to Congress.</p></div></div>')}]);