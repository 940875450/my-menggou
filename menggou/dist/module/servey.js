"use strict";define(function(){function e(){}return e.prototype.init=function(){var e=$(".shouye-server").offset().top;$(document).on("scroll",function(){$(document).scrollTop()>=e?($(".shouye-server").css({width:1e3,position:"fixed",top:-70,left:0,right:0,"z-index":999,"text-align":"center"}),$(".shouye-server input").css({width:810})):($(".shouye-server").css({width:780,position:"relative",margin:"70px auto -70px",top:0}),$(".shouye-server input").css({width:570}))})},new e});