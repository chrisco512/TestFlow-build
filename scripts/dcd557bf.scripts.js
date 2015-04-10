"use strict";angular.module("testFlowApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngAnimate"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/sidebar",{templateUrl:"views/sidebar.html",controller:"SidebarCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("testFlowApp").directive("node",["$compile","EventHandlers","Tree","$timeout",function(a,b,c,d){return{restrict:"E",replace:!0,templateUrl:"templates/node.html",link:function(c,e,f,g){c.clickNode=c.clickNode||function(a){b.ClickNode(a,e)},c.collapse=c.collapse||function(a){b.Collapse(a)},c.expand=c.expand||function(a){b.Expand(a)},e.mouseover(function(a){a.stopPropagation(),$(".col-exp").hide(),c.node.children.length>0&&e.children(".col-exp").show()}).mouseleave(function(){e.children(".col-exp").hide()});var h="<a>Add Note</a> <br> Add Attachment <br> Annotate <br> View Annotations <br> Delete";e.children(".bullet").popover({trigger:"manual",html:!0,placement:"bottom",content:h}).on("mouseenter",function(){var a=this;d(function(){$(".bullet:hover")[0]===a&&($(a).popover("show"),$(".popover").on("mouseleave",function(){$(a).popover("hide")}))},300)}).on("mouseleave",function(){var a=this;d(function(){$(".popover:hover").length||$(a).popover("hide")},100)}),angular.isArray(c.node.children)&&(e.append("<nodecollection nodecollection='node.children'></nodecollection>"),a(e.contents())(c))}}}]),angular.module("testFlowApp").directive("nodecollection",function(){return{restrict:"E",replace:!0,scope:{nodecollection:"="},templateUrl:"templates/nodecollection.html"}}),angular.module("testFlowApp").directive("content",["Tree","EventHandlers","$timeout",function(a,b,c){function d(a){if(a.focus(),"undefined"!=typeof window.getSelection&&"undefined"!=typeof document.createRange){var b=document.createRange();b.selectNodeContents(a),b.collapse(!1);var c=window.getSelection();c.removeAllRanges(),c.addRange(b)}else if("undefined"!=typeof document.body.createTextRange){var d=document.body.createTextRange();d.moveToElementText(a),d.collapse(!1),d.select()}}return{restrict:"E",require:"ngModel",compile:function(a,e){a.attr("class")&&!a.closest("pre")[0]&&d(a[0]);var f=function(a,e,f,g){var h=(a.$root.$$childHead,$._data(e[0],"events"));h||e.keydown(function(f){switch(f.which){case b.KeyCodes.Enter:f.preventDefault(),b.EnterKey(a,e);break;case b.KeyCodes.Tab:f.preventDefault(),f.shiftKey?b.ShiftTabKey(a):b.TabKey(a);break;case b.KeyCodes.Up:case b.KeyCodes.Down:f.preventDefault();var h=e.closest("#content").find("content"),i=_.indexOf(h,e[0]);f.which===b.KeyCodes.Up&&i>0?d(h[i-1]):f.which===b.KeyCodes.Down&&i<h.length-1&&d(h[i+1]);break;case b.KeyCodes.Backspace:if(""===e.text()){var h=e.closest("div").find("content"),i=_.indexOf(h,e[0]),j=b.BackspaceKey(a);j&&(f.preventDefault(),d(h[i-1]))}}c(function(){a.$apply(function(){g.$setViewValue(e.html())})},0)}),g.$render=function(){e.html(g.$viewValue)},g.$render()};return f}}}]),angular.module("testFlowApp").controller("MainCtrl",["$scope","$timeout","$animate","Tree","EventHandlers",function(a,b,c,d,e){function f(a){function b(a){return _.map(a,function(a){var c=d.Node(a.content);return a.children&&c.appendChild(b(a.children)),c})}var c=[{content:"Remaining Paycheck Calculations",children:[{content:"YearlyGoal_RemainingPaysLabelsDisplayedCorrectly",children:[{content:"Given I navigate to Myself -> Life Events as an employee",children:[{content:"User: RemPayWkL/password"},{content:"LE Session: RPDOLH- Remain pays date of last hire en"},{content:"Type: DEF"}]},{content:"When I elect a plan with a yearly goal rule",children:[{content:"Plan: DEF- cont goal - DS00/CS00 -(GDFC1)"}]},{content:"Then the Remaining Paychecks Label is displayed",children:[{content:"Label: Remaining pay checks"}]}]}]},{content:"Home Page",children:[{content:"Log in",children:[{content:"Without entering any username and password",children:[{content:"Empty out input fields",children:[]},{content:"Click log in",children:[]}]},{content:"Test it only with username",children:[]},{content:"Test it only with password",children:[]},{content:"User name with wrong password",children:[]},{content:"Password with wrong user name",children:[]},{content:"Right username and right password",children:[]},{content:"Cancel, after entering username and password",children:[]},{content:"Enter long username and password that exceeds the set limit of characters",children:[]},{content:"Try copy/paste in the password text box",children:[]}]}]},{content:"Reservations",children:[{content:"Datepicker",children:[{content:"Set departure date previous to today",children:[]},{content:"Select an arrival date before departure date",children:[]}]}]}],e=b(c);a.children=[],a.appendChild(e)}a.root=d.root,a.rootIsTreeRoot=function(){return a.root===d.root},f(a.root)}]),angular.module("testFlowApp").factory("Tree",function(){var a={},b={root:"root",suite:"suite","case":"case",step:"step"};return a.Node=function(a,c){function d(a){return a===b.root?b.suite:a===b.suite?b["case"]:b.step}function e(a){if(_.isArray(a)){var b=_.filter(a,function(a){return""+f==""+a.constructor});return b.length===a.length}return!1}function f(a,b){this.content=a||"",this.children=[],this.level="root",b instanceof f&&(this.parentNode=b,this.level=d(b.level))}return f.prototype.setParents=function(){var a=this;_.each(a.children,function(b){b.parentNode=a,b.level=d(a.level),b.setParents()})},f.prototype.appendChild=function(a){e(a)?this.children.push.apply(this.children,a):a instanceof f?this.children.push(a):void 0===a&&this.children.push(newNode(null,this)),this.setParents()},f.prototype.prependChild=function(a){e(a)?this.children.unshift.apply(this.children,a):a instanceof f?this.children.unshift(a):void 0===a&&this.children.unshift(new f(null,this)),this.setParents()},new f(a,c)},a.root=a.Node(),a}),angular.module("testFlowApp").service("EventHandlers",["$animate","Tree",function(a,b){function c(a){if(0===a.node.children.length){var c=_.indexOf(a.nodecollection,a.node)+1;a.nodecollection.splice(c,0,b.Node()),a.node.parentNode.setParents()}else a.node.children.length>0&&a.node.prependChild()}function d(){a.enabled(!1)}function e(b){b.$$postDigest(function(){setTimeout(function(){a.enabled(!0)},0)})}this.KeyCodes={Enter:13,Tab:9,Up:38,Down:40,Backspace:8},this.EnterKey=function(a,b){d(),c(a),e(a)},this.TabKey=function(a,b){d();var c=_.indexOf(a.nodecollection,a.node);if(c>0){a.isCollapsible=!1;{a.nodecollection.splice(c,1)}a.nodecollection[c-1].children.push(a.node),a.node.parentNode.setParents()}e(a)},this.ShiftTabKey=function(a,b){d();var c,f,g,h;if(c=_.indexOf(a.nodecollection,a.node),a.$parent&&a.$parent.$parent){if(f=a.$parent.$parent.nodecollection,!f)return;g=a.$parent.$parent.node,h=_.indexOf(f,g),a.isCollapsible=!1,a.nodecollection.splice(c,1),f.splice(h+1,0,a.node),a.node.parentNode.parentNode.setParents()}e(a)},this.BackspaceKey=function(a,b){var c=a.node.children.length;if(!c){var d=_.indexOf(a.nodecollection,a.node);return a.nodecollection.splice(d,1),!0}return!1},this.ClickNode=function(a,b){a.$root.$$childHead.root=a.node},this.ClickStep=function(a){a.$root.$$childHead.root=a.step},this.Collapse=function(a){a.node.children.collapsed="~!%@%!~"},this.Expand=function(a){a.node.children.collapsed=""}}]),angular.module("testFlowApp").controller("SidebarCtrl",["$scope","Tree","EventHandlers",function(a,b,c){a.testSuites=_.each(b.root.children,function(a){return a}),a.clickNode=function(a){c.ClickNode(a)}}]),angular.module("testFlowApp").directive("breadcrumbs",["Tree","EventHandlers",function(a,b){return{template:'<div><span ng-repeat="step in steps"><a ng-click="clickStep(this)">{{ getStepText(this) }}</a><span> > </span></span></div>',restrict:"E",link:function(c,d,e){function f(a){var b=a.parentNode,c=[];return b?(c.push(b),f(b).concat(c)):c}c.steps=[],c.getStepText=function(b){var c=b.step===a.root?"Home":b.step.content;return c},c.clickStep=function(a){b.ClickStep(a)},c.$watch("root",function(b){c.steps=a.root===b?[]:f(b)})}}}]);