var an = new Array();
$(document).ready(function() {
	var xmlFiles = $('#xmlFiles').val().split(',');
	var html;
	
	if(xmlFiles.length > 1){
		var categoryNames = $('#categories').val().split('|')
		html = '<div id="tabs"><ul>';
		for(var i = 0; i<xmlFiles.length; i++){
			html+='<li><a href="#tabs-'+i+'">'+categoryNames[i]+'</a></li>';
		}
		
		html+='</ul>';
		
		for(var i =0; i<xmlFiles.length; i++){
			html+='<div id="tabs-'+i+'"><div id="bgImage'+i+'"><canvas id="myCanvas'+i+'"></canvas></div></div>'
		}
		html+='</div>';
	}
	else{
		html = '<div id="bgImage0"><canvas id="myCanvas0"></canvas></div>';
	}
	
	$("#content").html(html);
	$("#tabs").tabs({
		select: function(e, ui) {
            activateTab(ui.index);
			}	
	});
	activateTab(0);
});

function activateTab(index){
	var id = "myCanvas" + index;
	var imageId = "#bgImage" + index;
	var canvas = document.getElementById(id);
	var file = "http://kharkov.flashcross.org/" + $('#xmlFiles').val().split(',')[index];
	if(an[id]){
	}
	else{
		an[id] = new Animation(canvas, file, imageId);	
	}
}

Animation = function(canvas, file, image) {
    var m_startTime;
    var m_endTime;
    var m_points;
    var m_teams;
	var m_xml;
	var m_canvas;
	var m_currentTime;
	var m_imageHeight;
	var m_imageWidth;
	var m_xmlFile = file;
	var m_imageFile;
	var m_imageArea = image;
	var m_koef = 1;
	var m_interval=null;
    init(canvas);

    function init(canvas) {
	m_imageFile = $('#mapFile').val();
	$.ajax({
            type: "GET",
            url: m_xmlFile,
            dataType: "xml",
            success: function(xml) {
				m_xml = xml;
                initFunctions(canvas);
            }
        });
    }
	function initFunctions(canvas) {
	        m_points = new Number();
			setImageSizes();
			canvas.height = m_imageHeight;
			canvas.width = m_imageWidth;
			m_canvas = canvas.getContext("2d");
			m_canvas.font = "14pt Arial";
	        initPoints();
	        m_teams = new Array();
	        initTeams(m_points);
			initTime();
			drawTeams();	
			m_interval = setInterval(drawTeams, 50);
	    }
	function setImageSizes() {
        m_imageHeight = parseInt($(m_xml).find('map > image > height').text(), 10);
		m_imageWidth = parseInt($(m_xml).find('map > image > width').text(), 10);
		var img = "url('" + m_imageFile + "')"
		$(m_imageArea).css('height', m_imageHeight).css('width', m_imageWidth).css('background-image', img);
		var k =$(m_xml).find('map > koef').text();
		if(k!=''){
			m_koef = parseFloat(k ,10);
		}
    }
	function initPoints() {
        $(m_xml).find('map > points > point').each(function() {
            var curItem = $(this);
            m_points[curItem.attr('id')] = new Point(parseInt(curItem.find('x').text(), 10), parseInt(curItem.find('y').text(), 10));
        });
    }
	function initTime(){
		m_startTime = getMSFromDate($(m_xml).find('time > start').text());
        m_endTime = getMSFromDate($(m_xml).find('time > end').text())+3000000;
		m_currentTime = m_startTime;
	}
	function initTeams(points) {
        $(m_xml).find('teams > team').each(function() {
            var curItem = $(this);
            var teamId = parseInt(curItem.attr('id'), 10);
            var team = new Team(teamId);
            team.Name = curItem.attr('name');
			var curentPointId = null;
			var leaveTime = null;
            curItem.find('point').each(function() {
                var pointItem = $(this);              
				
				//StartPoint
				if(curentPointId == null && leaveTime == null){
					curentPointId = pointItem.attr('id');
					leaveTime = getMSFromDate(pointItem.find('leave').text());
				}
				else{
					 var intervalLine = new Interval(points[curentPointId], points[pointItem.attr('id')], getMSFromDate(pointItem.find('come').text()), leaveTime);
					 				 
					 curentPointId = pointItem.attr('id');
					 leaveTime = getMSFromDate(pointItem.find('leave').text());
					 
					 team.IntervalArray.push(intervalLine);
				}
                

            });
            m_teams.push(team)
        });
    }
	function drawTeams(){
		m_currentTime += 10000;
		if(m_currentTime > m_endTime){
			clearInterval(m_interval);
		}
		m_canvas.clearRect(0,0,m_imageWidth,m_imageHeight);
		m_canvas.fillText(rectime(m_currentTime),10,20);
		for (var i = 0; i < m_teams.length; i++) {
            drawTeam(m_teams[i]);
        }
	}
	function drawTeam(team) {
		for (var j = 0; j < team.IntervalArray.length; j++) {
                if(m_currentTime > team.IntervalArray[j].TimeLeave && m_currentTime < team.IntervalArray[j].TimeCome) {
                    var newPoint = team.IntervalArray[j].GetPointByCurrentTime(m_currentTime);
					var x = parseInt(newPoint.X/m_koef,10);
					var y = parseInt(newPoint.Y/m_koef,10);
					m_canvas.fillText(team.Id,x,y);
                    break;
                }
				else if(m_currentTime < team.IntervalArray[j].TimeCome){
					var x = parseInt(team.IntervalArray[j].PointLeave.X/m_koef,10);
					var y = parseInt(team.IntervalArray[j].PointLeave.Y/m_koef,10);
					m_canvas.fillText(team.Id,x,y);
                    break;
				}
            }
	}
	function getMSFromDate(str) {
        if ($.trim(str) == '')
            return '';
        var timesplit = str.split(':');
        return timesplit[2] * 1000 + timesplit[1] * 60000 + timesplit[0] * 3600000;
    }
	function rectime(secs) {
		var hr = Math.floor(secs / 3600000);
		var min = Math.floor((secs - (hr * 3600000))/60000);
		var sec = secs - (hr * 3600000) - (min * 60000);
		
		if (hr < 10) {hr = "0" + hr; }
		if (min < 10) {min = "0" + min;}
		if (sec < 10) {sec = "0" + sec;}
		return hr + ':' + min;
	}
};

//Point
Point = function(x, y) {
    this.X = x;
    this.Y = y;
}
//Team
Team = function(teamId) {
    this.Id = teamId;
    this.Name;
	this.IntervalArray = new Array();
};
//Interval
Interval = function(pointLeave, pointCome, timeCome, timeLeave) {
    this.PointLeave = pointLeave;
	this.PointCome = pointCome;
    this.TimeCome = timeCome;
    this.TimeLeave = timeLeave;
	this.FullLength;
	var that = this;
	init();
	function init(){
		that.FullLength = Math.sqrt(Math.pow(that.PointLeave.X-that.PointCome.X,2) + Math.pow(that.PointLeave.Y-that.PointCome.Y,2));
	}
	this.GetPointByCurrentTime = function(currentTime){		
		var m1 = currentTime - that.TimeLeave;
		var m2 = that.TimeCome - currentTime;
		var m1m2 = that.TimeCome - that.TimeLeave;
		var x = (m2*that.PointLeave.X + m1*that.PointCome.X)/m1m2;
		var y = (m2*that.PointLeave.Y + m1*that.PointCome.Y)/m1m2;
		return new Point(x, y);
	}
};