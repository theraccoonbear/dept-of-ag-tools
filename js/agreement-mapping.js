$(function() {
	var logMsg = function(m) {
		if (false && console) {
			console.log(m);
		} else {
			if (typeof m !== 'string' && typeof m !== 'number') {
				if (JSON && JSON.stringify) {
					alert(JSON.stringify(m, null, 2));
				} else {
					alert(m);
				}
			} else {
				alert(m);
			}
		}
	}

	$make_records.on('click', function(e) {
		var cancelling = false;
		var row_data = $sheet_data
			.val()
			.trim()
			.split(/\n/g);
		var data = [row_data[0]];

		var columns = row_data[0].split(/\t/);
		if (columns.ParcelList === 'undefined') {
			alert("You must include the column label row in the data you paste.");
			return;
		}

		$.each(row_data.slice(1), function(idx, row) {
			if (cancelling) { return; }
			var fields = row.split(/\t/g);
			var newRec = {};
			$.each(fields, function(fidx, f) {
				newRec[columns[fidx]] = f;
			});

			if (typeof newRec.ParcelList === 'undefined') {
				logMsg("No parcel list in:\n\n" + row);
				cancelling = true;
				return;
			}

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
		if (cancelling) {
			$output_records.val('');
		} else {
			$output_records.val(data.join("\n"));
		}
	});
});