$(function() {

    var convert = function() {
        var pnums = [];
        var lines = $parcel_list.val().split(/\n/);
        
        $.each(lines, function(i, l) {
           var line_pnum = l.split(/,/);
            $.each(line_pnum, function(x, pn) {
                pnums.push("\"PAR_NO\" = '" + pn.trim() + "'");
            });
        });
        $generated_query.val(pnums.join(' OR '));
    };
    
    $do_conversion.click(function(e) {
       convert(); 
    });
});