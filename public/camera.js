var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err){
        alert(err);
    });
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');

    // Trigger photo take
    document.getElementById("snap").addEventListener("click", function() {
        context.drawImage(video, 0, 0, 640, 480);
    });
}
var photo_path = document.getElementById('photo_path');
var photo_canvas = document.getElementById('photo');
photo_path.addEventListener('change', function(){
    var photo = document.createElement('img');
    photo.src = photo_path.nodeValue;
    photo_canvas.appendChild(photo);
})
