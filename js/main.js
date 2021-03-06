
// JavaScript Document
jQuery.noConflict();

	'use strict';	


	jQuery(document).ready(function($) {

		
			// BURGER JQuery
		// jQuery('.header__burger').click(function(){
		// 	jQuery('.header').toggleClass('open-menu');
		// 	jQuery('.header__burger-svg').toggleClass('active');
		// 	jQuery('.header__menu').toggleClass('open-menu');
		// 	jQuery('body').toggleClass('fixed-page');
		// });
		
		// PAGE-SCROLLED
		let elem = $('.header');
		let doc = $(document);
		function scrolled() {
   		let threshold = doc.scrollTop() > 50;
   		elem.toggleClass('scrolled', threshold);
   		}
		$(window).on({ scroll: scrolled });


		// BUTTON-UP
		let button = $('#button-up');	
		$(window).scroll(function() {
			if ($(window).scrollTop() > 700) {
				button.addClass('show');
			} else {
				button.removeClass('show');
			}
		});	 
		button.on('click', function(){
		$('body, html').animate({
		scrollTop: 0
		}, 500);
		return false;
		});




		let note = $('#note'),
			ts = new Date(2021, 08, 27),
			newYear = true;
		
		if((new Date()) > ts){
			// The new year is here! Count towards something else.
			// Notice the *1000 at the end - time must be in milliseconds
			ts = (new Date()).getTime() + 10*24*60*60*1000;
			newYear = false;
		}
			
		$('#countdown').countdown({
			timestamp	: ts,
			callback	: function(days, hours, minutes, seconds){
				
				let message = "";
				
				message += days + " day" + ( days==1 ? '':'s' ) + ", ";
				message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
				message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
				message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
				
				if(newYear){
					message += "left until the new year!";
				}
				else {
					message += "left to 10 days from now!";
				}
				
				note.html(message);
			}
		});
		$('#countdown2').countdown({
			timestamp	: ts,
			callback	: function(days, hours, minutes, seconds){
				
				let message = "";
				
				message += days + " day" + ( days==1 ? '':'s' ) + ", ";
				message += hours + " hour" + ( hours==1 ? '':'s' ) + ", ";
				message += minutes + " minute" + ( minutes==1 ? '':'s' ) + " and ";
				message += seconds + " second" + ( seconds==1 ? '':'s' ) + " <br />";
				
				if(newYear){
					message += "left until the new year!";
				}
				else {
					message += "left to 10 days from now!";
				}
				
				note.html(message);
			}
		});
		
		$('.countDays').append('<p>????????</p>');
		$('.countHours').append('<p>??????????</p>');
		$('.countMinutes').append('<p>??????????</p>');
		$('.countSeconds').append('<p>????????????</p>');
	
	});



	// BURGER JS

	const headerBurger = document.querySelector('.header__burger');
	const header = document.querySelector('.header');
	const headerBurgerSvg = document.querySelector('.header__burger-svg');
	const headerMenu = document.querySelector('.header__menu');
	const body = document.querySelector('body');

	headerBurger.addEventListener('click', openMenu);

	function openMenu () {
		header.classList.toggle('open-menu');
		headerBurgerSvg.classList.toggle('active');
		headerMenu.classList.toggle('open-menu');
		body.classList.toggle('fixed-page');
		
	}
	

	// FORM-VALIDATION JS
	const forms = document.querySelectorAll('.form');
	if(forms.length > 0) {	
		for(let form of forms) {
			form.addEventListener('submit', function formSend (e) {
				e.preventDefault();
				let error = formValidate(form);
				
				// if(error === 0) {
				// } else {
				// alert('?????????????????? ?????? ????????!');
				// }
			});
		}
	}

	function formValidate (form) {
		let error = 0;
		let formReq = form.querySelectorAll('._required');

		for(let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if(input.classList.contains('form__phone')) {
				if(phoneTest(input)) {
					formAddError(input);
					error++;
				}
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}

		}
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	function phoneTest(input) {
		return !(/^\+380\d{9}$|^0\d{9}$/.test(input.value));
	}

	
	// MODAL-WINDOW JS
const modalLinks = document.querySelectorAll('.modal__link');
// const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if(modalLinks.length > 0) {
	for(let index = 0; index < modalLinks.length; index++) {
		const modalLink = modalLinks[index];
		modalLink.addEventListener('click', function (e) {
			const modalName = modalLink.getAttribute('href').replace('#', '');
			const curentModal = document.getElementById(modalName);
			modalOpen (curentModal);
			e.preventDefault();
		})
	}
}

const modalCloseIcon = document.querySelectorAll('.close-modal');
if(modalCloseIcon.length > 0) {
	for (let index = 0; index < modalCloseIcon.length; index++) {
		const elem = modalCloseIcon[index];
		elem.addEventListener('click', function(e) {
			modalClose(elem.closest('.modal-window'));
			e.preventDefault();
		});

	}
}

function modalOpen (curentModal) {
	if (curentModal && unlock) {
		const modalActive = document.querySelector('.modal-window.open');
		if(modalActive) {
			modalClose(modalActive, false);
		} else {
			bodyLock();
		}
		curentModal.classList.add('open');
		curentModal.addEventListener('click', function (e) {
			if(!e.target.closest('.modal-content')) {
				modalClose(e.target.closest('.modal-window'));
			}
		})
	}
}

function modalClose (modalActive, doUnlock = true) {
	if(unlock) {
		modalActive.classList.remove('open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock () {
	const lockPaddingValue = window.innerWidth - document.querySelector('.for__page').offsetWidth + 'px';

	if(lockPadding.length > 0) {
		for(let index = 0; index < lockPadding.length; index++) {
			const elem = lockPadding[index];
			elem.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock () {

	setTimeout(function () {
		if(lockPadding.length > 0) {
			for(let index = 0; index < lockPadding.length; index++) {
				const elem = lockPadding[index];
				elem.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);
		
	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}


document.addEventListener('keydown', function(e) {
	if(e.which === 27) {
		const modalActive = document.querySelector('.modal-window.open');
		modalClose(modalActive);
	}
});





