/* covo.js v0.2 (c) NAGAYA shun
 * https://github.com/haseharu/covojs
 * Licensed under the MIT license
*/

$(function() {
	
	function checkVar( text ){
		console.log(text + ':['+ text + ']');
	}

	function splitTerms( val ) {
		return val.split( /,\s*/ );
	}

	function extractLast( term ) {
		return splitTerms( term ).pop();
	}

	function extractTrigger( term ){
		return term.replace(/\s.*$/,'');
	}

	function changeKeywords( currentTerm , beforeTerm ){
			if(extractTrigger(beforeTerm) === extractTrigger(extractLast(currentTerm))){
				return true;
			} else{
				return false;
			}
	}

	function growlSetting( settings ){
				$(function(){$.growl( settings )});
	}
	
	var proxy_server = "http://haseharu.org/labs/covojs/0.1/sample_proxy/"; //sample proxy server
	var growlFlag = "";

	$( "#covo" ).autocomplete({
		source: function( request, response ) {
			
			if( extractTrigger(extractLast(request.term)) === '-' ){
				growlSetting('select authority file !');
			}else if(changeKeywords(request.term , growlFlag)){
				growlSetting('setting : [' + extractTrigger(extractLast(request.term)) + ']');
				growlFlag = extractLast(request.term);
			}
		
			request.term = extractLast(request.term);
			var flag = request.term.match(/^.*\s|-$/);
			var url = "";
			var dataType = "";
			var scriptCharset = "";

			if(request.term.match(/^inis |^i /i)){
				request.term = request.term.replace(/^inis |^i /i,'');
				url ="http://api.scraperwiki.com/api/1.0/datastore/sqlite?format=jsondict&name=inis-thesaurus&query=select * from swdata where keyword like '%25" + request.term + "%25' limit 10&callback=inis";	//sample proxy
				jsonpCallback = "inis";
				dataType = "jsonp";
			} else if(request.term.match(/^ndl |^n /i)){
				request.term = request.term.replace(/^ndl |^n /i,'');
				request.term = encodeURI(request.term);
				url ="http://id.ndl.go.jp/auth/ndla/?query=PREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0ASELECT+%3Fx+%3Flabel+WHERE+{%0D%0A+++++++%3Fx+rdfs%3Alabel+%3Flabel.%0D%0Afilter+regex%28%3Flabel%2C+%22^" + request.term + "%22%29%0D%0A}%0D%0ALIMIT+10%0D%0A&output=json&callback=ndl";
				jsonpCallback = "ndl";
				dataType = "jsonp";
				scriptCharset = "UTF-8";
			} else if(request.term.match(/^wiki |^w /i)){
				request.term = request.term.replace(/^wiki |^w /i,'');
				url = proxy_server + "proxy_wikipedia.php?q=" +request.term;
				dataType = "jsonp";
			} else if(request.term.match(/^fast |^f /i)){
				request.term = request.term.replace(/^fast |^f /i,'');
				request.term = encodeURI(request.term);
				url =proxy_server + "proxy_oclc.php?q=" +request.term+ "&subject=fast&callback=?";
				dataType = "jsonp";
			} else if(request.term.match(/^lcsh |^l /i)){
				request.term = request.term.replace(/^lcsh |^l /i,'');
				request.term = encodeURI(request.term);
				url =proxy_server + "proxy_oclc.php?q=" +request.term+ "&subject=lcsh&callback=?";
				dataType = "jsonp";
			} else if(request.term.match(/^mesh |^m /i)){
				request.term = request.term.replace(/^mesh |^m /i,'');
				request.term = encodeURI(request.term);
				url =proxy_server + "proxy_oclc.php?q=" +request.term+ "&subject=mesh&callback=?";
				dataType = "jsonp";
			} else if(request.term.match(/^bisacsh |^b /i)){
				request.term = request.term.replace(/^bisacsh |^b /i,'');
				request.term = encodeURI(request.term);
				url =proxy_server + "proxy_oclc.php?q=" +request.term+ "&subject=bisacsh&callback=?";
				dataType = "jsonp";
			} else if(request.term.match(/^gsafd |^gs /i)){
				request.term = request.term.replace(/^gsafd |^g /i,'');
				request.term = encodeURI(request.term);
				url =proxy_server + "proxy_oclc.php?q=" +request.term+ "&subject=gsafd&callback=?";
				dataType = "jsonp";
			} else if(request.term.match(/^lcgft |^lcg /i)){
				request.term = request.term.replace(/^lcgft |^lcg /i,'');
				request.term = encodeURI(request.term);
				url =proxy_server + "proxy_oclc.php?q=" +request.term+ "&subject=lcgft&callback=?";
				dataType = "jsonp";
			} else if(request.term.match(/^lcshac /i)){
				request.term = request.term.replace(/^lcshac /i,'');
				request.term = encodeURI(request.term);
				url =proxy_server + "proxy_oclc.php?q=" +request.term+ "&subject=lcshac&callback=?";
				dataType = "jsonp";
			} else if(request.term.match(/^lctgm |^lct /i)){
				request.term = request.term.replace(/^lctgm |^lct /i,'');
				request.term = encodeURI(request.term);
				url =proxy_server + "proxy_oclc.php?q=" +request.term+ "&subject=lctgm&callback=?";
				dataType = "jsonp";
			} else if(request.term.match(/^gmgpc |^g /i)){
				request.term = request.term.replace(/^gmgpc |^gm /i,'');
				request.term = encodeURI(request.term);
				url =proxy_server + "proxy_oclc.php?q=" +request.term+ "&subject=gmgpc&callback=?";
				dataType = "jsonp";
			} else if(request.term.match(/^multi |^m /i)){
				request.term = request.term.replace(/^multi/i,'');
				url ="./multilingual.json";
				jsonpCallback = "multi";
				dataType = "jsonp";
			} else if(request.term.match(/^mytag /)){
				request.term = request.term.replace(/^mytag\s/,'');
				url = "https://dl.dropbox.com/u/156594/mytag.json";
				jsonpCallback = "mytag";
				dataType = "jsonp";
			} else if(request.term.match(/-$/)){
				jsonpCallback = "trigger";
				url ="./list.json";
				dataType = "json";
			} else{
				;
			}
			$.ajax({
				url: url,
				dataType: dataType,
				jsonpCallback: jsonpCallback,
				timeout: 18000,
				success: function( data ) {
					if(( flag == "inis " )||(flag == "i " )||(flag == "wiki ")||(flag =="w ")||(flag == "fast ")||(flag =="f ")||(flag == "lcsh ")||(flag =="l ")||(flag == "-")||( flag == "mesh " )||(flag == "m ")||( flag == "bisacsh " )||( flag == "b " )||( flag == "gsafd " )||( flag == "gs " )||( flag == "lcgft " )||( flag == "lcg " )||( flag == "lcshac " )||( flag == "lctgm " )||( flag == "lct " )||( flag == "gmgpc " )||( flag == "gm " )){
						response( $.map( data, function( item ) {
							return item.keyword;
						}));
					}else if(( flag == "ndl ")||( flag == "n ")){
						var ndlTerms = new Array();
						for(var i=0 ; i< data.results.bindings.length ; i++){
							ndlTerms.push(data.results.bindings[i].label.value);
						};
						response(ndlTerms);
					}else if ( flag == "multi "){
						var keyword = new Array();
						keyword = $.map(data, function(item){
							return {
								label : item.label,
								value : item.value
							}
						});
					request.term = extractLast(request.term);
					request.term = request.term.replace(/^./,'');
					response($.ui.autocomplete.filter(keyword,request.term));

					}else if(flag == "mytag "){
						var mytag = new Array();
						mytag = $.map(data, function(item){
							return item.keyword;
						});
						request.term = extractLast(request.term);
						response($.ui.autocomplete.filter(mytag,request.term))
					}
				}
			});
		},

		search: function(){
			var term = extractLast( this.value );
			if(term === "-" || term.replace(/^.*\s/,'').length > 2){
				return true;
			}else{
				return false;
			}
		},

		focus: function(){
			return false;
		},

		select: function( event, ui ) {
			var terms = splitTerms( this.value );
			terms.pop();
			terms.push( ui.item.value );

			if(ui.item.value.match(/\s$/)){
				growlSetting('setting :[' + ui.item.value.replace(/\s$/,'') + ']');
			}else{
				growlSetting('selected :[' + ui.item.value + ']');
			}

			if(!this.value.match(/, -$|-$/)){
				terms.push('');
			}
			this.value = terms.join( ", " );
			return false;
		}

	});
});
