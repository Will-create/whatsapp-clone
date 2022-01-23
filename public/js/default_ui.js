		$('document').ready(function(){
		$('#dropdown_menu').tclass('hidden');
		//
		// CODE TO BRING OUT UP THE IMAGE LIGHTBOX
		//
		// On the change of the search bar input
		// Code to make search bar work
		$('body').on('change, keyup','.search_bar',function(){
			var thisValue = $(this).val().toLowerCase();
			var thisLength = $(this).val().length;
			$('.single_chat').each(	function () {
				var thisChat = $(this);
				var username  = $(this).find('.user_name name').text().toLowerCase();
				if(username.indexOf(thisValue) < 0){
					thisChat.hide();
				}else{
					thisChat.show();
				}
			  });
		});
		 $('.back_trigger').click(function(){
			$('.search_bar').val('');
			$('.search_bar').keyup();
			$('.search_bar').animate({opacity : 0},200);

			$('.back_trigger').css('display','none');
			$('.back_button').css('display','none');
			$('.search_bar').css('display','none');
			$('.back_trigger').addClass('hidden');
			
	
		});
		$('.back_button').click(function(){
			$('.ion-ios-telephone-outline').addClass('hidden');
			$('.ion-ios-videocam-outline').addClass('hidden');
			$('.tab_phone').removeClass('hidden');
			$('.wallet').removeClass('hidden');
			$('.marketplace').removeClass('hidden');
			$('.body_section').addClass('hidden');
			$('.chat_footer').addClass('hidden');
			$('.android_controls').removeClass('hidden');
			NAV.back();
		});
		$('.marketplace').click(function(){
			$('.ion-ios-telephone-outline').addClass('hidden');
			$('.ion-ios-videocam-outline').addClass('hidden');
			$('.tab_phone').removeClass('hidden');
			$('.body_section').addClass('hidden');
			REDIRECT('/marketplace');
		});
		$('.wallet').click(function(){
			$('.ion-ios-telephone-outline').addClass('hidden');
			$('.ion-ios-videocam-outline').addClass('hidden');
			$('.tab_phone').removeClass('hidden');
			$('.body_section').addClass('hidden');
			REDIRECT('/wallet');
		});
		$('*').click(function(e){
			if($(e.target).width() > 100){
				if($(e.target).attr('class') != 'dropdown_menu' || $(e.target).attr('class') !== 'dropdown_item'){
					$('#dropdown_menu').animate({height : 'auto',width : '200px' },400);
					$('#dropdown_menu').tclass('hidden');
				}
			}
		});
		$('#search').click(function(){	
			$('.search_bar').removeClass('hidden');
			$('.search_bar').focus();
			$('.search_bar').animate({opacity : 1 , width : '100%'},200);
			$('.back_trigger').removeClass('hidden');
			$('.back_trigger').css('display','block');
		});
		if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
			REDIRECT('/');
			console.info( "This page is reloaded" );
		  } else {
			console.info( "This page is not reloaded");
		  };

	
		
		
	});
