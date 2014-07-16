var imageData;
var imageArray = [];

$(document).bind('mobileinit pageinit', function(e){




});


$( document ).ready(function(){


	/*

		document is loaded

	*/ 


});


function sendForm() {

	var fullName = $('#fullName').val();
	var storeLocation = $('#storeLocation').val();
	var incidentReport = $('#incidentReport').val();

	var url = 'http://dmgdemos.com/mallapp/_server-scripts/uploadForm.php';
	var params = {image: imageData, posted:true, array:imageArray};

	$.post(url, params, function(data) {
				
		console.log(data);

	});

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

function updateHtml() {

	var html = "";

	for(var i = 0; i < imageArray.length; i++) {

		//"data:image/jpeg;base64," + data;
		var src = "data:image/jpeg;base64," + imageArray[i];
		html += '<img src="' + src + '" />';
		html += '<br />';
	}

	$('#imageData').html(html);

}


function onSuccess(data) {


		//fileURI
			
	    //var image = document.getElementById('reportImage');
	    //image.src = "data:image/jpeg;base64," + data;
	    imageArray.push(data);  
	    updateHtml();
	    
	    /*
	    var tab_id = document.getElementById('event_tab_id').value;
	    var url = siteUrl + 'photoUpload.php';
	    

	    var win = function (r) {
	            clearCache();
	            retries = 0;
	            console.log(r);
	        }
	     
	        var fail = function (error) {
	        	console.log(error);
	            if (retries == 0) {
	                retries ++
	                setTimeout(function() {
	                    onSuccess(fileURI)
	                }, 1000)
	            } else {
	                retries = 0;
	                clearCache();
	                alert('failed.');
	            }
	        }
	     
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





