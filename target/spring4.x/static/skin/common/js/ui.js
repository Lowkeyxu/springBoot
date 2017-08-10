// JavaScript Document
jQuery(function($){
	
				$(window).resize(function(){
                        var width=$(window).width();
						var height=$(window).height();
						//$('.gy-lmeun').css('height', height-225);
						$('.topbox').css('height', height);
                    }).resize();
	
	
	
				$(".gy-lmeun dl dt").click(function(){
					$(this).next().show();
					$(this).parent().siblings().find("dd").hide();
					$(this).addClass("on").parent().siblings().find("dt").removeClass("on");
				});	
				
				/*$(".gy-lmeun dl dd ul li").click(function(){
					$(this).addClass("on").siblings().removeClass("on");
					$(this).addClass("on").closest("dl").siblings().find("li").removeClass("on");
				});*/
				
				
				$(".gy-lmeun dl dd ul li p a").click(function(){
					$(this).addClass("on").siblings().removeClass("on");
					$(this).closest("li").siblings().find("a").removeClass("on");
				});	
				
				
				$(".cg-lmeun dl dd ul li p a").click(function(){
					$(this).addClass("on").siblings().removeClass("on");
					$(this).closest("li").siblings().find("a").removeClass("on");
				});	
				
				$(".cg-lmeun dl dt").click(function(){
					$(this).next().show();
					$(this).parent().siblings().find("dd").hide();
					$(this).addClass("on").parent().siblings().find("dt").removeClass("on");
				});	
				
				/*$(".cg-lmeun dl dd ul li").click(function(){
					$(this).addClass("on").siblings().removeClass("on");
					$(this).addClass("on").closest("dl").siblings().find("li").removeClass("on");
				});*/
				//解决点击li标签颜色变的情况 王波加。。。
				$(".cg-lmeun dl dd ul li a").click(function(){
					$(this).parent().addClass("on").siblings().removeClass("on");
					if($(this).parent().find("input").val()>0){
						$(this).parent().attr("style","background-image:url("+ctx+"/static/skin/common/images/lmenu_b.png)").siblings().removeAttr("style");
					}
					$(this).parent().addClass("on").closest("dl").siblings().find("li").removeClass("on");
				});
				
				
				
				$(".lemeun dl dt").click(function(){
					$(this).siblings("dd").show();
					$(this).parents().siblings().find("dd").hide();
				});	
				
				
				$(".text").click(function(){
					$(this).next('.content').show();
				});	
				$(".content h6").click(function(){
					$(this).parents('.content').hide();
				});	
				
				
				$(".syslist span label").click(function(){
					$(this).toggleClass('on');
				});	
				
				/* 下拉列表 */
				 $("button.btn").click(function(){
					$(this).siblings(".SIMPO_Select_content").animate({height: 'toggle', opacity: 'toggle'}, "");
				   },function(){
					$(this).siblings(".SIMPO_Select_content").animate({height: 'toggle', opacity: 'toggle'}, "");
				   });

				   //供应商中心
				   $(".note dl:last-child").css('float','right');
				   $(".note dl:nth-child(2)").css('position','relative').css('left','10px');
				   $(".zcinfolist dl:last-child").css('margin-right','0').css('border-right','none');
				   $(".czcinfolist dl:last-child").css('margin-right','0').css('border-right','none');
				   $(".d-info:last-child").css('float','right');
				   $(".d-info:nth-child(2)").css('position','relative').css('left','10px');
				   $(".porclass dl:last-child").css('margin-right','0');
				   
				   $(".shopmblist").mousemove(function(){
					$(this).addClass("on");
					});	
					
					$(".shopmblist").mouseout(function(){
					$(this).removeClass("on");
					});	
				   
				   $(".delinfo del").click(function(){
					$(this).closest(".topbox").hide();
					$(this).closest("body").removeClass("nohidden");
	
					});
					
					$(".product-list dl").mousemove(function(){
					$(this).addClass("gold");
					});	
					
					$(".product-list dl").mouseout(function(){
					$(this).removeClass("gold");
					});	
					
					$(".product-list dl:nth-child(4n)").css('margin-right','0');
					$(".product-imglist dl:nth-child(4n)").css('margin-right','0');
					$(".jpbottom dl:last-child").css('margin-right','0');
					$(".cd-info:last-child").css('margin-right','0');
					
				   $(".product-imglist dl").mousemove(function(){
					$(this).addClass("gold");
					}).mouseout(function(){
					$(this).removeClass("gold");	
				    });	
					
					$(".screen ul li").click(function(){
					$(this).css('background','#f6f6f6');
					$(this).siblings().css('background','#ffffff');
	
					});
					
				   
					
					
					
					$(".tab-box p a.line").click(function(){
					$(this).addClass('lines');
					$('.point').addClass('points');
					});
					
					
					$(".tab-box p a.point").click(function(){
					$(this).removeClass('points');
					$('.line').removeClass('lines');
					});
					
					
});
