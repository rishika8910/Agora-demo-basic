/**
 * @name handleFail
 * @param err - error thrown by any function
 * @description Helper function to handle errors
 */
let handleFail = function(err){
    console.log("Error : ", err);
};

// Queries the container in which the remote feeds belong
let remoteContainer= document.getElementById("remote-container");

/**
 * @name addVideoStream
 * @param streamId
 * @description Helper function to add the video stream to "remote-container"
 */
function addVideoStream(streamId){
    let streamDiv=document.createElement("div"); // Create a new div for every stream
    streamDiv.id=streamId;                       // Assigning id to div
    streamDiv.style.transform="rotateY(180deg)"; // Takes care of lateral inversion (mirror image)
    remoteContainer.appendChild(streamDiv);      // Add new div to container
}
/**
 * @name removeVideoStream
 * @param evt - Remove event
 * @description Helper function to remove the video stream from "remote-container"
 */
function removeVideoStream (evt) {
    let stream = evt.stream;
    stream.stop();
    let remDiv=document.getElementById(stream.getId());
    remDiv.parentNode.removeChild(remDiv);

    console.log("Remote stream is removed " + stream.getId());
}



document.getElementById("start").onclick = function () {

    Let client=AgoraRTC.create({
		mode:'rtc';
		codec:'h264'
	});
	
	let appid=document.getElementById('app-id').value;
	client.init(appid,function(){
		client.join(null,'any channel',null,function(uid){
			//Created a client and joined a channel
			let localStream =AgoraRTC.create({
				video:true,
				audio:false,
			});
		    localStream.init(function(){
                localStream.play('me');
				client.publish(localStream);
			});		 
		},handleFail);
		client.on('sream-added',function(evt){
			client.subscribe(evt.stream,handleFail);
		});
		client.on('stream-subscribed',function(evt){
			let strem=evt.stream;
			addVideoStream(stream.getId);
			stream.play(String(stream.getId));
		});
	},handleFail);
};