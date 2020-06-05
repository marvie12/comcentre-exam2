
var ones = ['','one','two','three','four', 'five','six','seven','eight','nine','ten', 'eleven', 
            'twelve', 'thirteen', 'fourteen','fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
var sep = ['hundred','thousand','million','billion','trillion','quadrillion','quintillion','sextillion'];

function getTwoDigits(amount,origAmount='') {
    var x = Number(amount);
    var result = '';
    
    origAmount = origAmount.length ? amount:origAmount;

    if (x <= 19) {
        result = !x ? (origAmount && parseInt(origAmount) == 0 ? 'zero':'') : ones[Number(amount)];
    } else if (x > 99 && x < 1000) {
        // hundreds
        result += ones[String(x).substring(0, 1)] + ' hundred ';
        twg = getTwoDigits(String(x).substring(1, 3));

        result +=  twg ? 'and ' + twg:' ';
    } else if(String(amount).length == 2) {
        // 20 and up
        var first = tens[String(Number(x)).substring(0, 1)];
        var second = ones[String(Number(x)).substring(1, 2)];
        result = first;
        result += second ? "-" + second:' ';
    }
    return result;
}


$(document).ready( function(){
    $('#amount').focus();
}).on('keypress', '#amount', function(evt){
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    if (key.length == 0) return;
    var regex = /^[0-9.,\b]+$/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
    if (event.keyCode == 13) {
        $(this).change();
        $('form').submit();
        return false;
    }
}).on('change', '#amount', function(){

    var cents = $(this).val().split(".");
    cents = (cents[1] !== undefined) ? "." + cents[1]:'';

    var amount = $(this).val();
    if (amount != "") {
        amount = amount.replace(" ", "");

        if ($(this).val().indexOf(",") != -1) {
            amount = amount.split(",").join("");
        }

        amount = parseInt(amount);
        amount = amount.toLocaleString();
        amount = amount != 'NaN' ? amount:'';
        $(this).val(amount + cents).removeClass('border border-danger');
    }            

}).on('submit', 'form', function(){
    var origAmount = $('#amount').val();            
    var amount = origAmount.split(".")[0];            
    var cents = parseFloat(origAmount.split(",").join("")).toFixed(2).split(".");

    cents = (cents[1] !== undefined) ? cents[1]:'';

    if (origAmount == '') {
        alert('Input Amount is required!');
        $('#amount').addClass('border border-danger');
    } else {
        var result = getTwoDigits(amount,origAmount);            
        var arrSeps = amount.split(",");
        
        if (arrSeps.length > 1) {
            var chunk = amount.split(",");

            var ctr = 0;
            result = '';
            // result = sep[arrSeps.length-1];
            for (var i = arrSeps.length - 1; i >= 0; i--) {
                var x = Number(chunk[ctr]);
                num = getTwoDigits(Number(chunk[ctr]));
                numSep = sep[i];
                if (chunk[ctr] > 99) {
                    result += ones[chunk[ctr].substring(0, 1)] + ' ';
                    result += chunk[ctr] > 100 ? ' hundred and ' : numSep + ' ';
                    result +=  getTwoDigits(chunk[ctr].substring(1, 3)) + ' ';

                    result += i != 0 ? ' '+ numSep + ' ':' ';
                } else if (chunk[ctr].length == 2) {
                    result += num +' '+ numSep +' ';
                } else {
                    result += ones[chunk[ctr].substring(0, 1)] + ' ';
                    result += chunk[ctr] > 0 ? (x > 99 ? ' hundred ' : (x <= 99 && i == 0 ? num:numSep + ' ')):'';
                }
                ctr++;
            }
        }

        if (cents) {
            cents = parseInt(cents);
        }

        result += origAmount.split(",").join("") > 1 ? ' dollars' : (parseInt(origAmount) >= 0 ? ' dollar':'');
    
        if (parseInt(origAmount) > 0 && cents) {
            result += cents ? (cents > 1 ? ' and '+getTwoDigits(cents)+' cents' : ' and '+getTwoDigits(cents)+' cent') : '';
        } else {
            result += cents ? (cents > 1 ? ' '+getTwoDigits(cents)+' cents' : ' '+getTwoDigits(cents)+' cent') : '';
        }

        var html = '<h4>Answer:</h4><div class="p-3 bg-light"><b>'+result.toUpperCase()+'</b></div>';
        $('.result').html(html).removeClass('d-none');
    }
    return false;
});