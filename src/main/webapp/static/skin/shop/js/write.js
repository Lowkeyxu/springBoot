// JavaScript Document
 jQuery(function($){
					 $(window).resize(function(){
                        var width=$(window).width();
						var height=$(window).height()
				
                           $('.new-pro-box ul li:nth-child(4n)').css("margin-right","0");
						   $('.discoutlist ul li:nth-child(4n)').css("margin-right","0");
						   $('.s-prolist-box ul li:nth-child(4n)').css("margin-right","0");
						   $('.s-prolist-boxs ul li:nth-child(4n)').css("margin-right","0");
                    }).resize();
					
				
					
});







//店铺商城列表和大图切换js   
   
   $(function(){
	    $('#bigpic').click(function(){
		    $(this).removeClass('bigpic_grey_button').addClass('bigpic_red_button')	;
			$('#listpic').removeClass('list_red_button').addClass('list_grey_button');
		}) ;
		
		$('#listpic').click(function(){
		    $(this).removeClass('list_grey_button').addClass('list_red_button')	;
			$('#bigpic').removeClass('bigpic_red_button').addClass('bigpic_grey_button');
		})
   })















