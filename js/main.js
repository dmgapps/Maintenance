


$(document).bind('mobileinit pageinit', function(e){




});


$( document ).ready(function(){


	/*

		document is loaded

	*/ 


});



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
	                    destinationType : Camera.DestinationType.FILE_URI,
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


function onSuccess(fileURI) {

		
	    var image = document.getElementById('reportImage');
	    image.src = "data:image/jpeg;base64," + imageData;
	    
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





