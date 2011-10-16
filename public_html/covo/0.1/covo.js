/* covo.js v0.1 (c) NAGAYA shun       *
 * https://github.com/haseharu/covojs *
 * Licensed under the MIT license     */

$(function() {
	function split( val ) {
		return val.split( /,¥s*/ );
	}
	function extractLast( term ) {
		return split( term ).pop();
	}
	
	var proxy_server = "http://covo.fluxflex.com/sample_proxy/";
	
	$( "#covo" ).autocomplete({
		source: function( request, response ) {
			request.term = extractLast(request.term);
			var flag = request.term.match(/^.* |-$/);
			var url = "";
			var dataType = "";
			var scriptCharset = "";
			if(request.term.match(/^inis |^i /i)){
				request.term = request.term.replace(/^inis |^i /i,'');
				url ="http://api.scraperwiki.com/api/1.0/datastore/sqlite?format=jsondict&name=inis-thesaurus&query=select * from swdata where keyword like '%25" + request.term + "%25' limit 10";
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
			} else if(request.term.match(/-$/)){
				url ="covo/0.1/list.json";
				dataType = "json";
			}
			$.ajax({
				url: url,
				scriptCharset: scriptCharset,
				dataType: dataType,
				timeout: 18000,
				success: function( data ) {
					if(( flag == "inis " )||(flag == "i " )){
						response( $.map( data, function( item ) {
							return item.keyword;
						}));
					}else if(( flag == "ndl ")||( flag == "n ")){
						var array = new Array();
						for(var i=0 ; i< data.results.bindings.length ; i++){
							array.push(data.results.bindings[i].label.value);
						};
						response(array);
					}else if((flag == "wiki ")||(flag =="w ")){
						response( $.map( data, function( item, i ) {
							return item.keyword;
						}));
					}else if((flag == "fast ")||(flag =="f ")){
						response( $.map( data, function( item, i ) {
							return item.keyword;
						}));
					}else if(flag == "-"){
						response( $.map( data, function( item, i ) {
							return item.keyword;
						}));
					}
				}
			});
		},
		search: function(){
			var term = extractLast( this.value );
			var term = term.replace(/^.* /i,'');		//このvarは不要では？[hayashiyutaka]
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
			if(this.value.match(/, -$|-$/)){
				terms = split( this.value );
				terms.pop();
				terms.push( ui.item.value );
				this.value = terms.join( ", " );
				return false;
			} else {
				terms = split( this.value );
				terms.pop();
				terms.push( ui.item.value );
				terms.push( "" );	//ifとelseで違うのはこの行だけでは？[hayashiyutaka]
				this.value = terms.join( ", " );
				return false;
			}
		}
	});
});