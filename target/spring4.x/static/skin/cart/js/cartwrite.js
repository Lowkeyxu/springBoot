// JavaScript Document

 jQuery(function($){
					 $(window).resize(function(){
                        var width=$(window).width();
						var height=$(window).height()
				
						   $('.cart-shop-prolist tr:last-child td').css("border-bottom","none");
                    }).resize();
					
				
					
});





$(function(){
    
	$('.written').mouseover(function(){
	    $(this).addClass('selectedwrite');
	}).mouseout(function(){
	    $(this).removeClass('selectedwrite');
	})
	
	
})



$(function(){
    
	$('.modification').click(function(){
		$(".written").removeClass('selectedpro');
	    $(this).parent().addClass('selectedpro');
	})


	$('.pro-cancel').click(function(){
	    $(this).closest('.written').removeClass('selectedpro');
	})
	
	
	
})



$(function(){
    
	$('.sales-promotion-box').mouseover(function(){
	    $(this).children('.sale-Activity').addClass('border-b-none');
		$(this).children('.sales-details').show();
	}).mouseout(function(){
	    $(this).children('.sale-Activity').removeClass('border-b-none');
	    $(this).children('.sales-details').hide();	
	})
	
	
})






