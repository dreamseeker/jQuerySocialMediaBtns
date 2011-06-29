/*
 * jQuery SocialMediaBtns Plugin
 *
 * Copyright (c) 2011 TORU KOKUBUN (http://d-s-b.jp/)
 * Licensed under MIT Lisence:
 * http://www.opensource.org/licenses/mit-license.php
 * http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 *
 * Last Modified: 2011-06-30
 * version: 1.01 
 *
 * This program checked the oparation on jQuery 1.5.2.
 * 
 */

(function($){
	$.fn.SocialMediaBtns = function( options ) {
		var opts = $.extend( {}, $.fn.SocialMediaBtns.defaults, options );
		var defs = $.fn.SocialMediaBtns.defines;
		
		return this.each(function(){
			/* -------------------------------------------------------------------------
		
				Properties
			
			-------------------------------------------------------------------------- */
			var $self			= this;
			
			var margin_h		= opts.margin_h	;
			var margin_v		= opts.margin_v	;
			
			var align			= opts.align;
			var btn_align		= ( align == 'left')		? 'padding-right'		: 'padding-left';
			var span_style		= btn_align + ': ' + margin_h + 'px;';
			
			var url				= ( opts.url )				? opts.url				: location.href;
			var title			= ( opts.title )			? opts.title			: document.title;
			
			// Twitter Properties
			var tw				= opts.twitter;
			var tw_count		= ( tw['count'] )			? tw['count']			: 'none';
			var tw_lang			= ( tw['lang'] )			? tw['lang']			: 'ja';
			var tw_via			= ( tw['via'] )				? tw['via']				: '';
			var tw_url			= url;
			var tw_text			= ( tw['text'] )			? tw['text']			: title;
			
			// Facebook Properties
			var fb				= opts.facebook;
			var fb_url			= '';
			var fb_layout		= ( fb['layout'] )			? fb['layout']			: 'button_count';
			var fb_show_face	= ( fb['show_face'] )		? fb['show_face']		: true;
			var fb_colorscheme	= ( fb['colorscheme'] )		? fb['colorscheme']		: 'light';
			var fb_width		= ( fb['width'] )			? fb['width']			: '';
			var fb_height		= ( fb['height'] )			? fb['height']			: '';
			var fb_sizes		= defs.facebook.sizes;
			
			// Hatena Bookmark Properties
			var hatena			= opts.hatena;
			var hatena_url		= '';
			var hatena_layout	= ( hatena['layout'] )		? hatena['layout']		: 'standard';
			var hatena_title	= title;
			
			// Yahoo! Bookmark Properties
			var yahoo			= defs.yahoo;
			var yahoo_type		= ( opts.yahoo.type )		? opts.yahoo.type		: 'type_a';
			var yahoo_url		= '';
			var yahoo_title		= '';
			
			// livedoor Clip Properties
			var livedoor		= defs.livedoor;
			var livedoor_type	= ( opts.livedoor.type )	? opts.livedoor.type	: 'type_a';
			var livedoor_url	= url;
			var livedoor_title	= '';
			
			// del.icio.us Properties
			var delicious_url	= '';
			var delicious_title	= '';
			
			// Evernote Properties
			var evernote			= defs.evernote;
			var evernote_type		= ( opts.evernote.type )		? opts.evernote.type								: 'type_g';
			var evernote_content_id	= ( opts.evernote.content_id )	? "contentId:'" + opts.evernote.content_id + "'"	: '';
			
			// mixi Check Properties
			var mixi_dev_key	= ( opts.mixi_dev_key )		? opts.mixi_dev_key		: '';
			var mixi_check_type	= ( opts.mixi_check.type )	? opts.mixi_check.type	: 'button-1';
			
			// Google +1 Properties
			var gp1				= opts.google_plus1;
			var gp1_lang		= ( gp1['lang'] )		? gp1['lang']		: 'ja';
			var gp1_parsetags	= ( gp1['parsetags'] )	? gp1['parsetags']	: 'onload';
			var gp1_callback	= ( gp1['callback'] )	? gp1['callback']	: '';
			var gp1_count		= ( gp1['count'] )		? gp1['count']		: true;
			var gp1_href		= url;
			var gp1_size		= ( gp1['size'] )		? gp1['size']		: 'standard';
			
			fb_url =	 yahoo_url = delicious_url	= encodeURIComponent( url );
			hatena_url								= escape( url );
			yahoo_title = delicious_title			= encodeURIComponent( title );
			livedoor_title							= escape( title );
			
			/* -------------------------------------------------------------------------
		
				Initialize
			
			-------------------------------------------------------------------------- */
			init();
			
				/* -------------------------------------------------------------------------
		
					Function
				
				-------------------------------------------------------------------------- */

				// initialize
				function init(){
					$($self).css({ textAlign: opts.align });
					
					var str = opts.btn_set;
						str = str.replace(/ /g,"");
					var arr = str.split(',');
					
					for(var i in arr){
						switch (arr[i]){
							case 'tw':
								createBtnTw( tw_count, tw_lang, tw_url, tw_text, tw_via );
								break;
							case 'fb':
								createBtnFb( fb_layout, fb_url, fb_show_face, fb_colorscheme );
								break;
							case 'hatena':
								createBtnHatena( hatena_layout, hatena_url, hatena_title );
								break;
							case 'yahoo':
								createBtnYahoo( yahoo_type, yahoo_url, yahoo_title );
								break;
							case 'livedoor':
								createBtnLivedoor( livedoor_type, livedoor_url, livedoor_title );
								break;
							case 'delicious':
								createBtnDelicious( delicious_url, delicious_title );
								break;
							case 'evernote':
								createBtnEvernote( evernote_type, evernote_content_id );
								break;
							case 'mixi_check':
								if( mixi_dev_key ){
									createBtnMixiCheck( mixi_dev_key, mixi_check_type );
								}
								break;
							case 'gp1':
								createBtnGooglePlusOne( gp1_lang, gp1_parsetags, gp1_callback, gp1_count, gp1_href, gp1_size );
								break;
						}
					}
				};
				
				// Create Twitter Btn 
				function createBtnTw( count, lang, url, text, via ){
					var tpl = '';
						tpl += '<a href="http://twitter.com/share"'
						tpl += ' class="twitter-share-button"'
						tpl += ' data-url="' + url + '"';
						tpl += ' data-text="' + text + '"';
						tpl += ' data-count="' + count + '"';
						tpl += ( via ) ? ' data-via="' + via + '"' : '';
						tpl += ' data-lang="' + lang + '"';
						tpl += '>Tweet</a>';
						
					var script = '<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>';
					
						$($self).append('<span class="btn-twitter" />');
						
					var obj_span = $('span.btn-twitter', $self);
						obj_span.attr({ style: span_style })
								.append( tpl )
								.append( script );
				};
				
				// Create Facebook Like/Share Btn
				function createBtnFb( layout, url, show_face, colorscheme ){
					var w = ( fb_width ) ? fb_width : fb_sizes[ layout ].width;
					var h = ( fb_height ) ? fb_height : fb_sizes[ layout ].height;
					
					var tpl = '';
						tpl += '<iframe src="http://www.facebook.com/plugins/like.php?';
						tpl += 'href=' + url;
						tpl += '&amp;layout=' + layout;
						tpl += '&amp;show_faces=' + show_face;
						tpl += '&amp;action=like';
						tpl += '&amp;font';
						tpl += '&amp;colorscheme=' + colorscheme;
						tpl += '&amp;width=' + w;
						tpl += '&amp;height=' + h;
						tpl += '" scrolling="no"';
						tpl += ' frameborder="0"';
						tpl += ' style="border:none; overflow:hidden; width:' + w + 'px; height:' + h + 'px;"';
						tpl += ' allowTransparency="true">';
						tpl += '</iframe>';
						
						$($self).append('<span class="btn-facebook" />');
					
					var obj_span = $('span.btn-facebook', $self);
						obj_span.attr({ style: span_style })
								.append( tpl );
				};
				
				// Create HatenaBookmark Btn
				function createBtnHatena( layout, url, title ){
					var tpl = '';
						tpl += '<a href="http://b.hatena.ne.jp/entry/' + url + '"';
						tpl += ' class="hatena-bookmark-button"'
						tpl += ' data-hatena-bookmark-title="' + title + '"';
						tpl += ' data-hatena-bookmark-layout="' + layout + '"';
						tpl += ' title="はてなブックマークに追加">';
						tpl += '</a>';
						
					var script = '<script type="text/javascript" src="http://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script>';
						
						$($self).append('<span class="btn-hatena" />');
					
					var obj_span = $('span.btn-hatena', $self);
						obj_span.attr({ style: span_style })
								.append( tpl )
								.children('a').append('<img />');
						
					var obj_img = $('span.btn-hatena > a > img', $self);
						obj_img.attr({
							src:	'http://b.st-hatena.com/images/entry-button/button-only.gif',
							alt:	'はてなブックマークに追加',
							width:	20,
							height:	20,
							style:	'border:none;'
						});
						
						obj_span.append( script );
				};
				
				// Create Yahoo! Bookmark Btn
				function createBtnYahoo( type, url, title ){
					var href = '';
						href += ( type == 'type_a' || type == 'type_b' ) ? "javascript:void window.open('http://bookmarks.yahoo.co.jp/bookmarklet/showpopup?t=" : "javascript:location.href='http://bookmarks.yahoo.co.jp/action/bookmark?t=";
						href += title + '&amp;u=' + url;
						href += ( type == 'type_a' || type == 'type_b' ) ? "&amp;ei=UTF-8','_blank','width=550,height=480,left=100,top=50,scrollbars=1,resizable=1',0);" : "';";
					
					var tpl = '';
						tpl += '<a href="' + href + '"></a>';
						
						$($self).append('<span class="btn-yahoo" />');
						
					var obj_span = $('span.btn-yahoo', $self)
						obj_span.attr({ style: span_style })
								.append( tpl )
								.children('a').append('<img />');
					
					var icon_type = '';
						icon_type = ( type == 'type_a' || type == 'type_c' ) ? 'icon_l' : 'icon_s' ;
						
					var obj_img = $('span.btn-yahoo > a > img', $self);
						obj_img.attr({
							src:	'http://i.yimg.jp/images/' + yahoo[ icon_type ].src,
							alt:	'Yahoo!ブックマークに登録',
							width:	yahoo[ icon_type ].img_w,
							height:	yahoo[ icon_type ].img_h,
							style:	'border:none;'
						});
				};
				
				// Create livedoor Clip Btn
				function createBtnLivedoor( type, url, title ){
					var tpl = '';
						tpl += '<a href="http://clip.livedoor.com/redirect?link=';
						tpl += url + '&title=' + title;
						tpl += '&ie=UTF-8" class="ldclip-redirect" title="この記事をクリップ！">';
						tpl += '</a>';
						
						$($self).append('<span class="btn-livedoor" />');
						
					var obj_span = $('span.btn-livedoor', $self)
						obj_span.attr({ style: span_style })
								.append( tpl )
								.children('a').append('<img />');
						
					var obj_img = $('span.btn-livedoor > a > img', $self);
						obj_img.attr({
							src:	'http://parts.blog.livedoor.jp/img/cmn/' + livedoor[ type ].src,
							width:	livedoor[ type ].img_w,
							height:	livedoor[ type ].img_h,
							alt:	'この記事をクリップ！',
							style:	'border: none;'
						});
				};
				
				// Create Delicious Btn
				function createBtnDelicious( url, title ){
					var tpl = '';
						tpl += '<a href="http://www.delicious.com/save"';
						tpl += ' onclick="window.open('
						tpl += "'http://www.delicious.com/save?v=5&noui&jump=close&url=";
						tpl += url + '&title=' + title;
						tpl += "', 'delicious','toolbar=no,width=550,height=550'); return false;";
						tpl += '"></a>';
						
						$($self).append('<span class="btn-delicious" />');
						
					var obj_span = $('span.btn-delicious', $self)
						obj_span.attr({ style: span_style })
								.append( tpl )
								.children('a').append('<img />');
						
					var obj_img = $('span.btn-delicious > a > img', $self);
						obj_img.attr({
							src:	'http://l.yimg.com/hr/img/delicious.gif',
							width:	16,
							height:	16,
							alt:	'del.icio.usに追加',
							style:	'border: none;'
						});
				};
				
				// Create Evernote Btn
				function createBtnEvernote( type, content_id ){
					var tpl = '';
						tpl += '<script type="text/javascript" src="http://static.evernote.com/noteit.js"></script>';
						tpl += '<a href="#" onclick="Evernote.doClip({';
						tpl += content_id;
						tpl += '}); return false;">';
						tpl += '</a>';
						
						$($self).append('<span class="btn-evernote" />');
						
					var obj_span = $('span.btn-evernote', $self)
						obj_span.attr({ style: span_style })
								.append( tpl )
								.children('a').append('<img />');
						
					var obj_img = $('span.btn-evernote > a > img', $self);
						obj_img.attr({
							src:	'http://static.evernote.com/' + evernote[ type ].src,
							alt:	'Evernoteにクリップ',
							style:	'border: none;'
						});
				};
				
				// Create mixi Check Btn
				function createBtnMixiCheck( dev_key, type ){
					var tpl = '';
						tpl += '<a href="http://mixi.jp/share.pl"';
						tpl += ' class="mixi-check-button"';
						tpl += ' data-key="' + dev_key + '"';
						tpl += ' data-button="' + type + '"';
						tpl += ' >mixiチェック</a>';
						tpl += '<script type="text/javascript" src="http://static.mixi.jp/js/share.js"></script>';
						
						$($self).append('<span class="btn-mixi-check" />');
						
					var obj_span = $('span.btn-mixi-check', $self)
						obj_span.attr({ style: span_style })
								.append( tpl );
				}
				
				// Create Google +1 Btn
				function createBtnGooglePlusOne( lang, parsetags, callback, count, href, size ){
					var tpl = '';
						tpl += '<script type="text/javascript" src="https://apis.google.com/js/plusone.js">';
						tpl += "{lang:'" + lang + "'" +  + "}";
						tpl += '</script>';
						tpl += '<g:plusone';
						tpl += ' size="' + size + '"';
						tpl += ' count="' + count + '"';
						tpl += ' callback="' + callback + '"';
						tpl += ' href="' + href + '"';
						tpl += ' ></g:plusone>';
						if(parsetags == 'explicit') {
							tpl += '<script type="text/javascript">gapi.plusone.go();</script>';
						}
						
						$($self).append('<span class="btn-google-plus1" />');
						
					var obj_span = $('span.btn-google-plus1', $self)
						obj_span.attr({ style: span_style })
								.append( tpl );
				}
		});
		
	};

	
	/* -------------------------------------------------------------------------
	
		set default options
	
	-------------------------------------------------------------------------- */
	$.fn.SocialMediaBtns.defaults = {
		
		margin_h:			5,
		margin_v:			2,
		
		url:				null,
		title:				null,
		
		btn_set:			'yahoo, livedoor, delicious, evernote, hatena, mixi_check, tw, fb, gp1',
		align:				'left',
		
		twitter: {
			count:			'none',
			lang:			'ja',
			via:			null,
			text:			null
		},
		
		facebook: {
			layout:			'button_count',
			show_face:		true,
			colorscheme:	'light',
			width:			120,
			height:			21
		},
		
		hatena: {
			layout:			'simple'
		},
		
		yahoo: {
			type:			'type_d'
		},
		
		livedoor: {
			type:			'type_a'
		},
		
		evernote: {
			type:			'type_g',
			content_id:		null
		},
		
		mixi_dev_key:		null,
		
		mixi_check: {
			type:			'button-1'
		},
		
		google_plus1: {
			lang:			'ja',
			parsetags:		null,
			callback:		null,
			count:			true,
			href:			null,
			size:			'medium'
		}
	};
	
	$.fn.SocialMediaBtns.defines = {
		facebook: {
			sizes: {
				standard: {
					width:	450,
					height:	80
				},
				button_count: {
					width:	90,
					height:	20
				},
				box_count: {
					width:	55,
					height:	65
				}
			}
		},
		
		yahoo: {
			icon_l: {
				src:		'ybm/blogparts/addmy_btn.gif',
				img_w:		125,
				img_h:		17
			},
			icon_s: {
				src:		'sicons/ybm16.gif',
				img_w:		16,
				img_h:		16
			}
		},
		
		livedoor: {
			type_a: {
				src:		'clip_16_16_w.gif',
				img_w:		16,
				img_h:		16
			},
			type_b: {
				src:		'clip_16_16_b.gif',
				img_w:		16,
				img_h:		16
			},
			type_c: {
				src:		'clip_16_12_w.gif',
				img_w:		16,
				img_h:		12
			},
			type_d: {
				src:		'clip_16_12_b.gif',
				img_w:		16,
				img_h:		12
			}
		},
		
		evernote: {
			type_a: { src: 'article-clipper.png' },
			type_b: { src: 'article-clipper-jp.png' },
			type_c: { src: 'article-clipper-vert.png' },
			type_d: { src: 'site-mem-36.png' },
			type_e: { src: 'site-mem-32.png' },
			type_f: { src: 'site-mem-22.png' },
			type_g: { src: 'site-mem-16.png' }
		}
	};
	
})(jQuery);
