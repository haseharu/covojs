<?php$query = strip_tags($_GET["q"]);$subject = strip_tags($_GET["subject"]);$callback = strip_tags($_GET["callback"]);$url = 'http://tspilot.oclc.org/'. $subject .'/?query=oclcts.terms+any+%22'. $query .'%22&version=1.1&operation=searchRetrieve&recordSchema=info%3Asrw%2Fschema%2F1%2Fmarcxml-v1.1&maximumRecords=10&startRecord=1&recordPacking=xml&sortKeys=';$source = file_get_contents($url);$xml =new SimpleXMLElement($source);$xml->registerXPathNamespace('ns2', 'http://www.loc.gov/MARC21/slim');$source=$xml->xpath('//ns2:datafield[@tag="150"]/ns2:subfield[@code="a"]');echo $callback ."([";foreach($source as $value){	echo '{"keyword":"'. $value .'"},';}echo "])";?>