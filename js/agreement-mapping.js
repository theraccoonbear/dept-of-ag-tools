$(function() {
	$make_records.on('click', function(e) {
		var row_data = $sheet_data.val().split(/\n/g);
		var data = [row_data[0]];
		var columns = row_data[0].split(/\t/);
		$.each(row_data.slice(1), function(idx, row) {
			var fields = row.split(/\t/g);
			var newRec = {};
			$.each(fields, function(fidx, f) {
				newRec[columns[fidx]] = f;
			});

			var pNums1 = newRec.ParcelList.split(/,\s*/g);
			var pNums2 = newRec.ParcelListMid.split(/,\s*/g);
			var pNums3 = newRec.ParcelListEnd.split(/,\s*/g);

			var pNums = pNums1.concat(pNums2.concat(pNums3));

			$.each(pNums, function(pidx, pn) {
				if (pn.trim().length > 0) {
					var genRec = $.extend({}, newRec, {ParcelList: pn});
					genRec.ParcelListMid = '';
					genRec.ParcelListEnd = '';
					var fields = [];
					$.each(columns, function(cidx, c) {
						fields.push(genRec[c]);
					});
					data.push(fields.join("\t"));
				}
			});
		});
		$output_records.val(data.join("\n"));
	});
});