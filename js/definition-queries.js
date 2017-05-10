$(function() {

    var convert = function() {
        var pnums = [];
        var lines = $parcel_list.val().split(/\n/);
        var colName = $parcel_column_name.val() || 'PAR_NO'
        
        $.each(lines, function(i, l) {
           var line_pnum = l.split(/,/);
            $.each(line_pnum, function(x, pn) {
                pnums.push('"' + colName + '" = \'' + pn.trim() + "'");
            });
        });
        $generated_query.val(pnums.join(' OR '));
    };
    
    $do_conversion.click(function(e) {
       convert(); 
    });
});