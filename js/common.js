$(function() {

	if (console && console.clear) {
		console.clear();
	}

	$('[id]').each(function(idx, e) {
		var $e = $(e);
		window['$' + $e.attr('id')] = $e;
	});
});