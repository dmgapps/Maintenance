var imageData;
var imageArray = [];
var DESTINATION_TYPE = "Camera.DestinationType.DATA_URL";

$(document).bind('mobileinit pageinit', function(e)	{




});


$( document ).ready(function(){

	/*
		document is loaded
	*/ 

	$(document).on("change", "#radio-choice-t-6a", function (event, ui) {
	    //console.log('take new');
	    DESTINATION_TYPE = "Camera.DestinationType.DATA_URL";
	});

	$(document).on("change", "#radio-choice-t-6b", function (event, ui) {
	    //console.log('from album');
	    DESTINATION_TYPE = "Camera.DestinationType.FILE_URI";
	});


});


function sendForm() {

	var fullName = $('#fullName').val();
	var storeLocation = $('#storeLocation').val();
	var incidentReport = $('#incidentReport').val();

	var url = 'http://dmgdemos.com/mallapp/_server-scripts/uploadForm.php';
	var params = {'images[]': imageArray, posted:true};

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
	                    destinationType : DESTINATION_TYPE,
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

	console.log(imageArray);

}


function onSuccess(data) {


		//fileURI
			
	    //var image = document.getElementById('reportImage');
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





