$(document).ready(function() {
	$('a[rel="external"]').click(function() {
        window.open($(this).attr('href'));
        return false;
    });
	
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
									{ "sType": "numeric-comma" },
									{ "sType": "numeric-comma" }
								],
						"aaSorting": [[ 3, "desc" ]]
					} );
	$('#player_rate').dataTable( {
		"oLanguage": {	"sLengthMenu": "Показывать _MENU_ записей на странице",
							"sZeroRecords": "Ничего не найдено",
							"sInfo": "С _START_ по _END_ из _TOTAL_ записей",
							"sInfoEmpty": "с 0 по 0 из 0 записей",
							"sInfoFiltered": "(отфильтровано из _MAX_ записей)",
							"sSearch": "Поиск"	},
		"iDisplayLength": 25,
		"aLengthMenu": [25, 50, 100, 1000],
		"bFilter": true,
		"bSort": false
	} );
	
	$('#player_table_winners').dataTable( {
						"oLanguage": {
							"sLengthMenu": "Показывать _MENU_ записей на странице",
							"sZeroRecords": "Ничего не найдено",
							"sInfo": "С _START_ по _END_ из _TOTAL_ записей",
							"sInfoEmpty": "с 0 по 0 из 0 записей",
							"sInfoFiltered": "(отфильтровано из _MAX_ записей)",
							"sSearch": "Поиск"
						},
						"iDisplayLength": 300,
						"bLengthChange": false,
						"aoColumns": [
									null,
									null,
									{ "sSortDataType": "dom-images", "sType": "numeric", "bSearchable": false },
									{ "sSortDataType": "dom-images", "sType": "numeric", "bSearchable": false },
									{ "sSortDataType": "dom-images", "sType": "numeric", "bSearchable": false },
								],
						"aaSorting": [[ 2, 'desc' ], [3,'desc'], [4,'desc']]
					} );
	$('#player_table_authors').dataTable( {
						"oLanguage": {
							"sLengthMenu": "Показывать _MENU_ записей на странице",
							"sZeroRecords": "Ничего не найдено",
							"sInfo": "С _START_ по _END_ из _TOTAL_ записей",
							"sInfoEmpty": "с 0 по 0 из 0 записей",
							"sInfoFiltered": "(отфильтровано из _MAX_ записей)",
							"sSearch": "Поиск"
						},
						"iDisplayLength": 300,
						"bLengthChange": false,
						"aoColumns": [
									null,
									null,
									{ "sSortDataType": "dom-images", "sType": "numeric", "bSearchable": false }	
								],
						"aaSorting": [[ 2, 'desc' ]]
					} );
	$("#player_form_add").validate({
		rules: {
			login: "required",
			password: {
				required: true,
				minlength: 5
			},
			confirm_password: {
				required: true,
				minlength: 5,
				equalTo: "#password"
			},
			name: "required",
			team_password: "required",
			mobile: "required",
			email: {
				required: true,
				email: true
			},
			sex: "required"
		},
		messages: {
			login: "Обязательное поле",
			password: {
				required: "Обязательное поле",
				minlength: "Пароль должен содержать больше 5 символов"
			},
			confirm_password: {
				required: "Обязательное поле",
				minlength: "Пароль должен содержать больше 5 символов",
				equalTo: "Пароли не совпадают"
			},
			name: "Обязательное поле",
			team_password: "Обязательное поле",
			mobile: "Обязательное поле",
			email: "Пожалуйста введите правильный email",
			sex: "Обязательное поле"
		}
	});
});

jQuery.fn.dataTableExt.afnSortData['dom-images'] = function  ( oSettings, iColumn )
	{
		var aData = [];
		$( 'td:eq('+iColumn+')', oSettings.oApi._fnGetTrNodes(oSettings) ).each( function () {
			aData.push( $(this).find('img').length);
		} );
		return aData;
	}				

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