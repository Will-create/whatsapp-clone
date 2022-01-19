		$('document').ready(function(){
			
			(function(){
			var previousScroll = 0;
			$('.ui-viewbox').scroll(function(){
				var currentScroll = $('.ui-viewbox').scrollTop();
				if(currentScroll > previousScroll){
					if(currentScroll > 0 && currentScroll <= 90){
						$('.title_bar').css('margin-top', '-'+currentScroll+'px');
						
					}else{
						$('.title_bar').css('margin-top', '-75px');
					}
				}else{
					if( currentScroll <= 90){
						
						$('.title_bar').css('margin-top', '-'+currentScroll+'px');
					}else{
						$('.title_bar').css('margin-top', '-75px');
					}
				}
	
				previousScroll = currentScroll;
			});

			
	
		})();


		$('.icon_container div i:nth-child(2)').click(function(){	
			
			$('.dropdown_menu').animate({width : '300px', height : 'auto',opacity :1 },200);
		});
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
			$('.title_bar').animate({marginTop : '-75px'},200);
			$('.back_trigger').css('display','none');
			$('.back_trigger').addClass('hidden');
			
			setTimeout(function(){
				$('.search_bar').css('display','none');
				$('.search_bar').addClass('hidden');
			},200);
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
			REDIRECT('/chats');
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
			
					$('.dropdown_menu').animate({width : '0px', height : 'auto',opacity :0 },200);
	
				}
			}
			
		});


		$('.ion-ios-search').click(function(){	
			
			$('.search_bar').animate({opacity : 1 , width : '100%'},200);
			$('.title_bar').animate({marginTop : '-75px'},200);
			$('.search_bar').removeClass('hidden');
			$('.back_trigger').removeClass('hidden');
			$('.back_trigger').css('display','block');
			$('.search_bar').focus();
		});
		
		
	});
