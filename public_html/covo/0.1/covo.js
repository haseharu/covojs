/* covo.js v0.1 (c) Li:d tech
 * https://github.com/haseharu/covojs
 * Licensed under the MIT license
*/

$(function() {
	function split( val ) {
		return val.split( /,\s*/ );
	}
	function extractLast( term ) {
		return split( term ).pop();
	}
	
	var proxy_server = "http://covo.fluxflex.com/sample_proxy/"; //sample proxy server
	
	$( "#covo" ).autocomplete({
		source: function( request, response ) {
			request.term = extractLast(request.term);
			var flag = request.term.match(/^.* |-$/);
			var url = "";
			var dataType = "";
			var scriptCharset = "";
			if(request.term.match(/^inis |^i /i)){
				request.term = request.term.replace(/^inis |^i /i,'');
				url ="http://api.scraperwiki.com/api/1.0/datastore/sqlite?format=jsondict&name=inis-thesaurus&query=select * from swdata where keyword like '%25" + request.term + "%25' limit 10";	//sample proxy
				dataType = "jsonp";
			} else if(request.term.match(/^ndl |^n /i)){
				request.term = request.term.replace(/^ndl |^n /i,'');
				request.term = encodeURI(request.term);
				url ="http://id.ndl.go.jp/auth/ndla/?query=PREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0ASELECT+%3Fx+%3Flabel+WHERE+{%0D%0A+++++++%3Fx+rdfs%3Alabel+%3Flabel.%0D%0Afilter+regex%28%3Flabel%2C+%22^" + request.term + "%22%29%0D%0A}%0D%0ALIMIT+10%0D%0A&output=json&callback=?";
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
			} else if(request.term.match(/-$/)){
				url ="list.json";
				dataType = "json";
			}
			$.ajax({
				url: url,
				scriptCharset: scriptCharset,
				dataType: dataType,
				timeout: 18000,
				success: function( data ) {
					if(( flag == "inis " )||(flag == "i " )||(flag == "wiki ")||(flag =="w ")||(flag == "fast ")||(flag =="f ")||(flag == "lcsh ")||(flag =="l ")||(flag == "-")||( flag == "bisacsh " )||( flag == "b " )||( flag == "gsafd " )||( flag == "gs " )||( flag == "lcgft " )||( flag == "lcg " )||( flag == "lcshac " )||( flag == "lctgm " )||( flag == "lct " )||( flag == "gmgpc " )||( flag == "gm " )){
						response( $.map( data, function( item ) {
							return item.keyword;
						}));
					}else if(( flag == "ndl ")||( flag == "n ")){
						var array = new Array();
						for(var i=0 ; i< data.results.bindings.length ; i++){
							array.push(data.results.bindings[i].label.value);
						};
						response(array);
					}
				}
			});
		},
		search: function(){
			var term = extractLast( this.value );
			if( term != "-" && term.length < 2){
				return false;
			} else if( term == "-"){
				return true;
			}
		},
		focus: function(){
			return false;
		},
		select: function( event, ui ) {
			var terms = "";
			terms = split( this.value );
			terms.pop();
			terms.push( ui.item.value );
			if(!this.value.match(/, -$|-$/)){
				terms.push( "" );
			}
			this.value = terms.join( ", " );
			return false;
		}
	});
});