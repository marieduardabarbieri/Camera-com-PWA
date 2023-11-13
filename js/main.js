//registrando a service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        let reg;
        reg = await navigator.serviceWorker.register('./sw.js', { type: "module" });
  
        console.log('Service worker registrada! 😎', reg);
        postNews();
      } catch (err) {
        console.log('😥 Service worker registro falhou: ', err);
      }
    });
  }


let camMode = 'user';
//configurando as constraintes do video stream
var constraints = { video: { facingMode: camMode }, audio:false };

const cameraView = document.querySelector("#camera--view"),
 cameraOutput = document.querySelector("#camera--output"),
 cameraSensor = document.querySelector("#camera--sensor"),
 cameraTrigger = document.querySelector("#camera--trigger");
 frenteTraz = document.querySelector("#frente--Traz");

function cameraStart(){
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        let track = stream.getTracks[0];
        cameraView.srcObject = stream;
      })
      .catch(function (error) {
        console.error("Ocorreu um erro", error);
      })
}

//função p/ tirar foto
cameraTrigger.onclick = function (){
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

frenteTraz.onclick = function (){
  stopMediaTracks(cameraView.srcObject);
  camMode = camMode === "user" ? "environment" : "user";
  constraints = { video: {facingMode: camMode }, audio: false };
  console.log(constraints);
  cameraStart();
}

function stopMediaTracks(stream){
  stream.getTracks().forEach(track => {
    track.stop();
  })
}

//carrega a img quando a janeça carregar
window.addEventListener("load", cameraStart, false)