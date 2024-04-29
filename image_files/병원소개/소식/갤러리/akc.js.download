/*******************************************************
* 프로그램명   : akc.js 
* 설명         : 표준소스3 자동완성
* 작성일       : 2012.04.23
* 작성자       : 기술서비스팀 장진후
* 수정내역     :
  *****************************************************/

var akc_url = "/asan/search/addon/akc.do";		// 자동완성  페이지 경로를 적어준다.
var AKCKwdID_TOP = "topKwd";			// 상단 키워드 input id
var AKCArwID_TOP = "top_arrow";			// 자동완성 화살표 id

var akc_kwd = null;
var akc_lst = null;
var akc_timeid = null;
var akc_cur_kwd = null;
var akc_prv_kwd = null;
var akc_show_flag = false;
//var akc_enable = getCookie("akc_enable");
var akc_enable = true;

if(akc_enable == "false" || akc_enable == false){
	akc_enable = false;
}else{
	akc_enable = true;
}

var akc_opt = 0;

var akc_idx	= -1;
var akc_lst_len = 0;
var akc_evt_key = 0;

$(document).ready(function(){	
	if(sizeStatus > 0){
		$(window).on('resize load', resizeAkcLyr); // resize시 호출
	}
});

/**
 * 리사이징시 자동완성창 크기 조절 액션
 * 
 * @ param
 * 
 * @ return
 */
function resizeAkcLyr(){
	$('#'+AKCArwID_TOP).removeClass('active');
		
	$('.autoWord, .autoName').each(function(){		
		$(this).hide();	
	});	
}

/**
* 자동완성초기화
* 
* @ param 
* 
* @ return   			
**/
function akcInit() {

	if(akc_enable == false){
		$('.autoWord, .autoName').children('ul').each(function(){ 
			$(this).first().html(wrtHelpMsg());
		});
		
		$('.offBtn > a').each(function(){
			$(this).text('켜짐');
		});
		
		$('.foot p a').each(function(){
			$(this).text('자동 완성 켜기');
		});
	}
	
	$('.SearchBox li').children().each(function(){
		$(this).css('ime-mode', 'active');
		$(this).attr("autocomplete","off");
		
		// 키보드 이벤트 등록
		$(this).keyup(function(event){
			akc_evt_key = event.keyCode;
			
			if(event.keyCode == 38){	// up
				akc_idx--;
				if(akc_idx < 0) akc_idx = 0;
				pntAkcLst();			
			}else if(event.keyCode == 40){	// down
				akc_idx++;
				if(akc_idx > akc_lst_len-1) akc_idx = akc_lst_len-1;
				pntAkcLst();
			}else{
				akc_idx	= -1;
			}
		});
		
		// kwd input창에 focus가 있을 경우
		$(this).focus(function(event){
			if(akc_enable == true){
				akc_kwd = $(this);
				
				if(event.target.id == AKCKwdID_TOP){
					akc_lst = $('#topKeywordLst');
					$('#'+AKCArwID_TOP).removeClass('active').addClass('active');
					tglAkcVsb(true);
				}
			}
		});
	});
	
	//setAkcInterval();
	
	// 마우스 클릭시 반응할 이벤트 등록	
	$(document).click(function(event){
		switch(event.target.id){
			case AKCKwdID_TOP :		// input box 클릭시  
				$('#'+AKCArwID_TOP).removeClass('active').addClass('active');
				akc_kwd = $('#' + AKCKwdID_TOP);
				akc_lst = $('#topKeywordLst');
				if(akc_enable == true)	
					tglAkcVsb(true);
				break;
			case AKCArwID_TOP :	// 상단 화살표 클릭시
				$('#'+AKCArwID_TOP).toggleClass('active');
				if($('#topKeywordLst').css('display') == "none"){
					akc_kwd = $('#' + AKCKwdID_TOP);
					akc_lst = $('#topKeywordLst');
					tglAkcVsb(true);
				}else{			
					$('#topKeywordLst').hide();
					tglAkcVsb(false);
				}
				break;
			case "akc_able" :	// 끄기, 켜기 클릭시
				tglAkcAbl();
				break;
			case "searchDesc" :
				$('#topKwd').trigger('click');
				break;
			default :	
				$('#'+AKCArwID_TOP).removeClass('active');
				$('#topKeywordLst').hide();
				clrAkcInterval();
				akc_show_flag = false;
				break;		
		}
	});
}

/**
* 자동완성의 interval값을 세팅 
* @ param 
* @ return   			
**/
function setAkcInterval() {
	if(akc_timeid == null)
		akc_timeid = window.setInterval("chkAkcKwd()", 10);
}

/**
 * 
* 자동완성의 interval값을 지운다 
* @ param 
* @ return   			
**/
function clrAkcInterval() {
	window.clearInterval(akc_timeid);
	akc_timeid = null;	
}

/**
* 키값을 체크한다. 자동완성 페이지를 호출한다. 
* @ param 
* @ return   			
**/
function chkAkcKwd(){
	if(akc_show_flag == true && akc_evt_key != 38 && akc_evt_key != 40 && akc_enable == true && akc_evt_key != 9){
		akc_cur_kwd = akc_kwd.val().toLowerCase();
		
		if(akc_cur_kwd == "" || akc_cur_kwd == null){
			akc_prv_kwd = "";
			akc_lst.children().first().html(wrtHelpMsg);
			return;
		}
		
		if(akc_cur_kwd != akc_prv_kwd) callAkcKwd();
	}
}

/**
* 자동완성 페이지를 호출한다. 
* @ param 
* @ return   			
**/
function callAkcKwd(){
	//var send_url = akc_url + "?kwd=" + akc_cur_kwd + "&opt=" + akc_opt;
	var akc_html = "";
	var temp_hilight =  "";
	var lower_temp_str = "";
	var i = 0;
	
	// get으로 보내면 파폭에서 한글 전송이 안됨.
	$.ajax({
		type: "POST",
		url: akc_url,
		dataType: "json",
		data: "kwd="+akc_cur_kwd+"&opt="+akc_opt,
		success: function(data){
			$.each(data.akcList, function(){				
				temp_hilight = this["KEYWORD"];
				temp_hilight = temp_hilight.replace("<span>","");
				temp_hilight = temp_hilight.replace("</span>","");
				
				lower_temp_str = temp_hilight.toLowerCase(); 
							
				if(lower_temp_str.indexOf(akc_cur_kwd.toLowerCase()) > -1){				
					if( akc_opt == 0){
						temp_hilight = "<span>" + temp_hilight.substring(0, akc_cur_kwd.length) + "</span>" + 
						temp_hilight.substring(akc_cur_kwd.length, temp_hilight.length);					
					}else{					
						temp_hilight = temp_hilight.substring(0, temp_hilight.length-akc_cur_kwd.length) + 
						"<span>" + temp_hilight.substring(temp_hilight.length-akc_cur_kwd.length, temp_hilight.length) + "</span>";
					}
				}
				akc_html += "<li id=\"akc" + i + "\">";
				akc_html += "<a class=\"akclist\" href='#'>" + temp_hilight + "</a>";
				akc_html += "</li>";			
				i++;
			});
			
			akc_lst_len = data.akcTotal;
			
			if(data.akcTotal < 1){
	        	akc_lst.children().first().html(wrtHelpMsg());
	        	akc_lst.hide();
			}else{
				akc_lst.children().first().html(akc_html);
				akc_lst.show();
			}		
			
			$('.akclist').bind('click', function(){
				dftSchKwd($(this).text());
			});
		}
	});
	
	akc_prv_kwd = akc_cur_kwd;
}

/**
* 키보드 이벤트에 따른 자동완성 선택 css 처리
* 
* @ param
*  
* @ return   			
**/
function pntAkcLst(){
	$('#topKeywordLst ul li a').removeClass('slt');
	var slt_kwd = $('#akc'+akc_idx).children().removeClass('akclist').addClass('selected').text();
	
	if( slt_kwd != "" ){
		$('.selected').removeClass('selected').addClass('akclist');
		akc_kwd.val($('#akc'+akc_idx).children().removeClass('akclist').addClass('selected').text());
		$('#akc'+akc_idx).children('a').addClass('slt');
	}
}

/**
* 자동완성 도움말
* @ param 
* @ return help_msg (도움말)   			
**/
function wrtHelpMsg(){
	var help_msg = "";

	if(akc_enable == true){
		help_msg = "<li ><a href=\"#none\">검색어 자동완성 기능을 사용중입니다. (의료진/진료과/질환정보/홈페이지 이용문의 등)</a></li>";		
	}else{
		help_msg = "<li ><a href=\"#none\">검색어 자동완성 기능을 중지합니다.</a></li>";		
	}
	
	return help_msg;
}

/**
* 자동완성창 toggle
* @ param type ( false : hide,  true : show ) 
* @ return    			
**/
function tglAkcVsb( type ){	
	if( type == false ){
		clrAkcInterval();
		akc_show_flag = false;
		akc_lst.hide();
	}else if( type == true ){
		setAkcInterval();
		akc_show_flag = true;
		akc_lst.show();
	}
}

/**
* 자동완성 켜기, 끄기 Flag
* @ param 
* @ return    			
**/
function tglAkcAbl(){	
		
	if($('#akc_able').eq(0).text() == "꺼짐" || $('#akc_able').eq(0).text() == "자동 완성 끄기"){
		akc_lst.hide();
		if($('#akc_able').eq(0).text() == "꺼짐") {
			$('.offBtn > a').each(function(){
				$(this).text('켜짐');
			});
		}else {
			$('.foot p a').each(function(){
				$(this).text('자동 완성 켜기');
			});
		}
		
		akc_show_flag = false;
		akc_enable = false;
		akc_lst.children().first().html(wrtHelpMsg);
		$('#'+AKCArwID_TOP).removeClass('active');
	}else{
		if($('#akc_able').eq(0).text() == "켜짐") {
			$('.offBtn > a').each(function(){
				$(this).text('꺼짐');
			});
		}else {
			$('.foot p a').each(function(){
				$(this).text('자동 완성 끄기');
			});
		}
		
		akc_show_flag = true;
		akc_enable = true;		
		akc_lst.children().first().html(wrtHelpMsg);
		callAkcKwd();
		$('#'+AKCArwID_TOP).removeClass('active').addClass('active');		
	}
	
	setCookie("akc_enable", akc_enable, 365);
}