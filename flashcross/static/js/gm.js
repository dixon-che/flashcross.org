FCGame = function() {
	var map;
	var bounds;
	var markers = new Array();
	this.Points = new Array();
	
	this.Init = function(){
		var myOptions = {
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	}
	
	function fillGalleryWithPreview(points){
		var imagearray = new Array();
		var thumbs = document.getElementById('thumbs');
		
		var html = '';
		for(var j=0; j<points.length; j++){
			if(points[j].Number == 0){ continue;}
			var imageIds = points[j].ImageId.split(',');
			for(var i=0; i<imageIds.length; i++){
				var imthumb = parseInt(imageIds[i]) + 2;
				html= html + '<li value="'+imageIds[i]+'"><img src="http://flashcross.org/gal/main.php?g2_view=core.DownloadItem&g2_itemId='+imthumb+'&g2_serialNumber=2" width="150" height="100" alt="Фотозадание с контрольного пункта' + points[j].Number +'"/></li>';
			}
		}

		thumbs.innerHTML = html;
	}
	function fillGallery(points){
		var imagearray = new Array();
		var thumbs = document.getElementById('thumbs');
		
		var html = '';
		for(var j=0; j<points.length; j++){
			if(points[j].Number == 0){ continue;}
			var imageIds = points[j].ImageId.split(',');
			for(var i=0; i<imageIds.length; i++){
				var imthumb = parseInt(imageIds[i]) + 2;
				html= html + '<li value="'+imageIds[i]+'"></li>';
			}
		}

		thumbs.innerHTML = html;
	}
	this.FillAllMarkers = function(isFillGallery){
		bounds = new google.maps.LatLngBounds();  
		markers = new Array();
		for (var i = 0; i < this.Points.length; i++) {
				if(this.Points[i].Point!=null){
					markers.push(addMarker(this.Points[i]));
					bounds.extend(this.Points[i].Point);		
				}
		}
		map.fitBounds(bounds);
		if(markers.length==1){
			map.setZoom(12);
		}
		if(isFillGallery){
			fillGalleryWithPreview(this.Points);
		}
		else{
			fillGallery(this.Points);
		}
	}
	this.FillFilterMarkers = function(gameIds){
		for(var i=0; i<markers.length; i++){
				var vis = false;
				for(var j=0; j<gameIds.length; j++){
					if(markers[i].category == gameIds[j]){
						vis = true;
						break;
					}
				}
				
				markers[i].setVisible(vis);
				
    		}
		fillGallery(this.Points);
	}
	function addMarker(point) {	
			var posit = point.Number;
			if(point.GameId == 14){
				if(point.Number == 'skp1'){
					posit = 8;
				}
				else if(point.Number == 'skp2'){
					posit = 13;
				}
				else if(point.Number == 'skp3'){
					posit = 17;
				}
				else if(point.Number == 'skp4'){
					posit = 28;
				}
			}
			else if(point.GameId == 4){
				if(point.Number == 'skp1'){
					posit = 12;
				}
				else if(point.Number == 'skp2'){
					posit = 15;
				}
				else if(point.Number == 'skp3'){
					posit = 28;
				}
				else if(point.Number == 'skp4'){
					posit = 29;
				}
			}
			else if(point.GameId == 9){
				if(point.Number == 'B33'){
					posit = 30;
				}
				else if(point.Number == 'B34'){
					posit = 31;
				}
				else if(point.Number == 'B35'){
					posit = 32;
				}
				else if(point.Number == 'B41'){
					posit = 33;
				}
				else if(point.Number == 'B42'){
					posit = 34;
				}
				else if(point.Number == 'B43'){
					posit = 35;
				}
				else if(point.Number == 'skp1'){
					posit = 36;
				}
				else if(point.Number == 'skp2'){
					posit = 37;
				}
			}
			else if(point.GameId == 3){
				if(point.Number.indexOf('c') == 0){
					posit = parseInt(point.Number.replace('c',''), 10);
				}
				else if(point.Number.indexOf('k') == 0){
					posit = parseInt(point.Number.replace('k',''), 10)+13;
				}
				else if(point.Number == 'skp1'){
					posit = 27;
				}
				else if(point.Number == 'skp2'){
					posit = 28;
				}
				else if(point.Number == 'skp3'){
					posit = 29;
				}
				else if(point.Number == 'skp4'){
					posit = 30;
				}
			}
			else if(point.GameId == 8){
				if(point.Number == 'skp1'){
					posit = 31;
				}
				else if(point.Number == 'skp2'){
					posit = 32;
				}
				else if(point.Number == 'skp3'){
					posit = 33;
				}
				else if(point.Number == 'skp4'){
					posit = 34;
				}
			}
			else if(point.GameId == 5){
				if(point.Number == 'skp1'){
					posit = 25;
				}
				else if(point.Number == 'skp2'){
					posit = 26;
				}
				else if(point.Number == 'skp3'){
					posit = 27;
				}
				else if(point.Number == 'skp4'){
					posit = 28;
				}
			}
			else if(point.GameId == 18){
				switch(parseInt(point.Number, 10))
				 {
				 case 10:
				 	posit = 8;
		          		break;
				 case 11:
				 	posit = 9;
		          		break;
				 case 12:
				 	posit = 10;
		          		break;
				 case 14:
				 	posit = 11;
		          		break;
				 case 17:
				 	posit = 12;
		          		break;
				case 18:
				 	posit = 13;
		          		break;
				case 21:
				 	posit = 14;
		          		break;
				 case 23:
				 	posit = 15;
		          		break;
				 case 31:
				 	posit = 16;
		          		break;
				 case 34:
				 	posit = 17;
		          		break;
				 case 35:
				 	posit = 18;
		          		break;
				 case 37:
				 	posit = 19;
		          		break;
				case 47:
				 	posit = 20;
		          		break;
				case 49:
				 	posit = 21;
		          		break;
				case 56:
				 	posit = 22;
		          		break;
				case 80:
				 	posit = 23;
		          		break;
				case 81:
				 	posit = 24;
		          		break;
				case 82:
				 	posit = 25;
		          		break;
				case 83:
				 	posit = 26;
		          		break;
				case 86:
				 	posit = 27;
		          		break;
				case 88:
				 	posit = 28;
		          		break;
				case 89:
				 	posit = 29;
		          		break;
				case 90:
				 	posit = 30;
		          		break;
				case 91:
				 	posit = 31;
		          		break;
				case 92:
				 	posit = 32;
		          		break;
				case 93:
				 	posit = 33;
		          		break;
				case 94:
				 	posit = 34;
		          		break;
				case 95:
				 	posit = 34;
		          		break;
				case 96:
				 	posit = 35;
		          		break;
				case 97:
				 	posit = 36;
		          		break;
				case 98:
				 	posit = 37;
		          		break;
				default:
				
				}
			}
			else if(point.GameId == 20){
				switch(parseInt(point.Number, 10))
				 {
				 case 52:
				 	posit = 1;
		          		break;
				 case 53:
				 	posit = 2;
		          		break;
				 case 54:
				 	posit = 3;
		          		break;
				 case 55:
				 	posit = 4;
		          		break;
				 case 56:
				 	posit = 5;
		          		break;
				case 57:
				 	posit = 6;
		          		break;
				case 58:
				 	posit = 7;
		          		break;
				 case 60:
				 	posit = 8;
		          		break;
				 case 61:
				 	posit = 9;
		          		break;
				 case 62:
				 	posit = 10;
		          		break;
				 case 63:
				 	posit = 11;
		          		break;
				 case 64:
				 	posit = 12;
		          		break;
				case 65:
				 	posit = 13;
		          		break;
				case 67:
				 	posit = 14;
		          		break;
				case 68:
				 	posit = 15;
		          		break;
				case 70:
				 	posit = 16;
		          		break;
				case 71:
				 	posit = 17;
		          		break;
				case 72:
				 	posit = 18;
		          		break;
				case 73:
				 	posit = 19;
		          		break;
				case 75:
				 	posit = 20;
		          		break;
				case 76:
				 	posit = 21;
		          		break;
				case 77:
				 	posit = 22;
		          		break;
				case 78:
				 	posit = 23;
		          		break;
				case 79:
				 	posit = 24;
		          		break;
				case 80:
				 	posit = 25;
		          		break;
				case 81:
				 	posit = 26;
		          		break;
				case 82:
				 	posit = 27;
		          		break;
				case 83:
				 	posit = 28;
		          		break;
				case 84:
				 	posit = 29;
		          		break;
				case 85:
				 	posit = 30;
		          		break;
				default:
				
				}
			}
			else if(point.GameId == 24){
				if(point.Number == 'skp1'){
					posit = 13;
				}
				else if(point.Number == 'skp2'){
					posit = 18;
				}
				else if(point.Number == 'skp3'){
					posit = 32;
				}
			}
			else if(point.GameId == 50){
				if(point.Number == '43'){
					posit = 31;
				}
			}
			
			var pos = posit * 17;
			var origin = new google.maps.Point(pos, 0);
			var imageUrl = "/img/icons/"+point.GameId+".png";
			var image = new google.maps.MarkerImage(imageUrl,
				new google.maps.Size(17, 38),
				origin,
				new google.maps.Point(0, 38));
			var title = point.GameName;
			if(point.Number == 0){
				title = title + " Старт/Финиш";
			}
			else{
				title = title + ": кп - " + point.Number;
			}
			var marker = new google.maps.Marker({
				position: point.Point,
				title: title,
				icon: image,
				category: point.GameId.toString(),
				map: map});
			
			var imageIds = point.ImageId.split(',');
			if(point.Number != 0){
				attachMessage(marker, imageIds);
			}
			return marker;
	}
	function attachMessage(marker, imageIds) {

		google.maps.event.addListener(marker, 'click', function() {
			if(imageIds.length>0)
				slideShow.getimg(imageIds[0]);
		});
		
	}
	
};
FCPoint = function(number, point, imageId, gameId, gameName){
	this.ImageId = imageId;
	this.Number = number;
	this.Point = point;
	this.GameId = gameId;
	this.GameName = gameName;
};