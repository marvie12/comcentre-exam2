<?php
// FOR COMMANDLINE
$ones = ['','one','two','three','four', 'five','six','seven','eight','nine','ten', 'eleven','twelve', 'thirteen',
		 'fourteen','fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
$tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
$sep = ['hundred','thousand','million','billion','trillion','quadrillion','quintillion','sextillion'];

function getTwoDigits($amount, $origAmount='') {
	global $ones, $tens, $sep;
    $x = $amount;
    $result = '';

    $origAmount = empty($origAmount) ? $amount:$origAmount;
	
    if ($x <= 19) {
        $result = !floor($origAmount) ? (is_numeric(substr($origAmount,0,1)) && $amount != 00 ? 'zero ':'') : $ones[floor($amount)] . ' ';
    } else if ($x > 99 && $x < 1000) {
        // hundreds
        $result .= $ones[substr($amount, 0, 1)] . ' hundred';
        $twg = (int) substr($amount, 1, 3);
        
        $result .=  $twg != 00 ? ' and ' . getTwoDigits($twg,$origAmount):' ';
    } else if (ceil(log10(floor($amount))) == 2) {  
        // 20 and up
        $amount = floor($amount);
        $first = $tens[substr($amount, 0, 1)];
        $second = isset($ones[substr($amount, 1, 2)])?$ones[substr($amount, 1, 2)]:'';
        
        $result = $first;
        $result .= $second != '' ? "-" . $second.' ':' ';
    }
    return $result;
}

function convertNumbers($argv)
{
	global $ones, $tens, $sep;

	$amount = $origAmount = isset($argv[1]) ? $argv[1]:'';

	if ($amount) {
	    $cents = explode(".", round(str_replace(",", "", $origAmount),2));	    
	    $cents = (isset($cents[1])) ? $cents[1]:'';

		$result = getTwoDigits($amount,$origAmount);

		$chunk = $arrSeps = explode(",", number_format(str_replace(",", "",$amount)));
		    
	    if (count($arrSeps) > 1) {
	        $ctr = 0;
	        $result = '';
	        for ($i = count($arrSeps) - 1; $i >= 0; $i--) {
	            if ($chunk[$ctr] > 99) {
	                $result .= $ones[substr($chunk[$ctr], 0, 1)];
	                $result .= $chunk[$ctr] > 100 ? ' hundred and ' : ' '.$sep[$i];
	                $result .= getTwoDigits(substr($chunk[$ctr], 1, 3));
	                $result .= $i != 0 ? ' '. $sep[$i] . ' ':' ';
	            } else if (strlen($chunk[$ctr]) == 2) {
	                $num = getTwoDigits($chunk[$ctr]);
	                $result .= $num.$sep[$i].' ';
	            } else {
	                $result .= substr($chunk[$ctr], 0, 1) ? $ones[substr($chunk[$ctr], 0, 1)] . ' ':'';
	                $result .= $chunk[$ctr] > 0 ? ($chunk[$ctr] > 99 ? ' hundred' : ($chunk[$ctr] <= 99 && $i == 0? getTwoDigits($chunk[$ctr]):$sep[$i] . ' ')):'';
	            }	
	            $ctr++;
	        }
	    }	    
	    if ($cents) {
	        $cents = $cents;
	    }

	    $result .= str_replace(",", "", $origAmount) > 1 ? 'dollars ' : (!is_numeric(substr($amount,0,1)) ? '':'dollar ');

	    if (is_numeric(substr($amount,0,1)) && $cents) {
	        $result .= $cents ? ($cents > 1 ? 'and '.getTwoDigits($cents).' cents' : 'and '.getTwoDigits($cents).' cent') : '';
	    } else {
	        $result .= $cents ? ($cents > 1 ? getTwoDigits($cents).' cents' : getTwoDigits($cents).' cent') : '';
	    }
		echo strtoupper(str_replace("  ", " ", $result));
	}
}

if (isset($argv[1])) {
	$n = str_replace([",","."], ["",""], $argv[1]);
	
	if (!is_numeric($n) && !is_float($n)) {
		exit('INVALID AMOUNT!');
	}	
	convertNumbers($argv);					
} else {
	exit('AMOUNT IS REQUIRED!');
}
?>