		$('document').ready(function(){
			
			(function(){
			var previousScroll = 0;
			$('.messages_section').scroll(function(){
				var currentScroll = $('.messages_section').scrollTop();
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
	
	   
		$('.icon_container div i:nth-child(1)').click(function(){	
			$('.search_bar').css('display','block');
			$('.back_trigger').css('display','block');
			$('.search_bar').animate({opacity : 1 , width : '100%'},200);
			$('.title_bar').animate({marginTop : '-75px'},200);
			$('.search_bar').focus();
		});
		
		
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
			$('.title_bar').animate({marginTop : '0px'},200);
			$('.back_trigger').css('display','none');
			setTimeout(function(){
				$('.search_bar').css('display','none');
			},600);
		});
		$('.back_button').click(function(){
			REDIRECT('/chats');
		});
		$('*').click(function(e){
			if($(e.target).width() > 100){
				if($(e.target).attr('class') != 'dropdown_menu' || $(e.target).attr('class') !== 'dropdown_item'){
			
					$('.dropdown_menu').animate({width : '0px', height : 'auto',opacity :0 },200);
	
				}
			}
			
		})

	});
