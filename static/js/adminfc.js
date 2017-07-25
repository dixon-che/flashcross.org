$(document).ready(function() {
	$('a.titlecollapsed').click(function() {
		$('.collapsed').hide();
		$(this).next('.collapsed').toggle();
		return false;
	});
	$('.collapsed').hide();
	//Table
	$('#player_table').dataTable( {
						"oLanguage": {
							"sLengthMenu": "Показывать _MENU_ записей на странице",
							"sZeroRecords": "Ничего не найдено",
							"sInfo": "С _START_ по _END_ из _TOTAL_ записей",
							"sInfoEmpty": "с 0 по 0 из 0 записей",
							"sInfoFiltered": "(отфильтровано из _MAX_ записей)",
							"sSearch": "Поиск"
						},
						"iDisplayLength": 25,
                				"aLengthMenu": [25, 50, 100, 1000],
						"aoColumns": [
									null,
									null,
									null,
									null,
									null,
									null,
									{ "sType": "numeric-comma" },
									null
								],
						"aaSorting": [[ 0, "asc" ]]
					} );
	
	
	//validation
	//News
	$("#newsForm").validate({
		rules: {
			fTitle: "required",
			fText: "required"
		},
		messages: {
			fTitle: "Обязательное поле",
			fText: "Обязательное поле"
		}
	});
	//FAQ
	$("#faqForm").validate({
		rules: {
			fQuestion: "required",
			fAnswer: "required"
		},
		messages: {
			fQuestion: "Обязательное поле",
			fAnswer: "Обязательное поле"
		}
	});
});

jQuery.fn.dataTableExt.oSort['numeric-comma-asc']  = function(a,b) {
	var x = (a == "-") ? 0 : a.replace( /,/, "." );
	var y = (b == "-") ? 0 : b.replace( /,/, "." );
	x = parseFloat( x );
	y = parseFloat( y );
	return ((x < y) ? -1 : ((x > y) ?  1 : 0));
};
jQuery.fn.dataTableExt.oSort['numeric-comma-desc'] = function(a,b) {
	var x = (a == "-") ? 0 : a.replace( /,/, "." );
	var y = (b == "-") ? 0 : b.replace( /,/, "." );
	x = parseFloat( x );
	y = parseFloat( y );
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};