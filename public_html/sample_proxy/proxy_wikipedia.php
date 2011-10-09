<?php
$query = strip_tags($_GET["q"]);
$lang = strip_tags($_GET["la"]);
$callback = strip_tags($_GET["callback"]);

if (strlen($query) == mb_strlen($query, 'UTF8')) {
	$lang = "English";
} else {
	$lang = "Japanese";
}

$url = 'http://dev.sigwp.org/WikipediaThesaurusV3/Search.aspx?k='. urlencode($query) .'&t=0&l='. $lang;
$source = file_get_contents($url);
preg_match_all('/<a id=\"dSearchResults_ctl[0-9][0-9]_hTitle.*<\/a>/',$source,$result,PREG_SET_ORDER);

echo $callback ."([";
foreach($result as $value){
	$value = preg_replace('/<a.*">|<\/a>/','',$value);
	echo '{"keyword":"'. $value[0] .'"},';
}
echo "])";

?>
