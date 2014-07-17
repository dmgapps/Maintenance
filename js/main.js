var imageData;
var imageArray = [];


$(document).bind('mobileinit pageinit', function(e)	{




});


$( document ).ready(function() {

	/*
		document is loaded
	*/ 



});


function sendForm() {

	var fullName = $('#fullName').val();
	var storeLocation = $('#storeLocation').val();
	var incidentReport = $('#incidentReport').val();

	var url = 'http://dmgdemos.com/mallapp/_server-scripts/uploadForm.php';
	var params = {'images[]': imageArray, posted:true, fullname: fullName, storelocation: storeLocation, incidentreport: incidentReport};

	$.post(url, params, function(data) {
				
		console.log(data);

	});

}

function encodeImageUri(imageUri) {
    
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function() {

        c.width=this.width;
        c.height=this.height;
        ctx.drawImage(img, 0,0);

    };

    img.src = imageUri;
    var dataUrl = c.toDataURL("image/jpeg");

    return dataUrl;
}


function getReportForm(reportName) {


	$.ajax({

		type: "GET",
		data: "reportName=" + reportName,
	  	url: "./app/getReportForm.php"
	}).done(function(data) {

		$.mobile.navigate('#ReportsForm', { transition : "flow"});


	});

}




function takePicture() {

	var options = {
	                    quality : 100,
	                    destinationType : Camera.DestinationType.DATA_URL,
	                    sourceType : Camera.PictureSourceType.CAMERA,
	                    allowEdit : true,
	                    encodingType: Camera.EncodingType.JPEG,
	                    targetWidth: 500,
	                    targetHeight: 500,
	                    popoverOptions: CameraPopoverOptions,
	                    saveToPhotoAlbum: false 
	            };

	navigator.camera.getPicture(onSuccess, onFail, options);


}


function takePictureAlbum() {

	var options = {
	                    quality : 100,
	                    destinationType : Camera.DestinationType.FILE_URI,
	                    sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
	                    allowEdit : true,
	                    encodingType: Camera.EncodingType.JPEG,
	                    targetWidth: 500,
	                    targetHeight: 500,
	                    popoverOptions: CameraPopoverOptions,
	                    saveToPhotoAlbum: false 
	            };

	navigator.camera.getPicture(onSuccessAlbum, onFail, options);


}

function updateHtml(header) {

	var html = "";

	for(var i = 0; i < imageArray.length; i++) {

		var src = "";
		if(header)
			src = imageArray[i];
		else
			src = "data:image/jpeg;base64," + imageArray[i];

		html += '<img src="' + src + '" />';
		html += '<br />';
	}

	$('#imageData').html(html);


}

function onSuccessAlbum(file_uri) {

		var data = encodeImageUri(file_uri);
	    imageArray.push(data);  
	    updateHtml(true);

}


function onSuccess(data) {


		//fileURI
			
	    //var image = document.getElementById('reportImage');
	    imageArray.push(data);  
	    updateHtml(false);

	     	
	     	/*
	        var options = new FileUploadOptions();
	        options.fileKey = "file";
	        options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
	        options.mimeType = "image/jpeg";
	        var params = new Object();
	        params.appID = appid;
	        params.eventTabID = document.getElementById('event_tab_id').value;
	        params.name = name;
	        options.params = params;
	        var ft = new FileTransfer();
	        ft.upload(fileURI, encodeURI(url), win, fail, options);
	        */
}

function onFail(message) {
	    document.getElementById('cameraError').innerHTML = message;
}

function clearCache() {
    navigator.camera.cleanup();
}





