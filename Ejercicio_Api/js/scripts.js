'use strict';

if(window.File && window.FileReader && window.FileList){
    alert("API's Verificadas");
    function handleFileSelect(evt){
        let file= evt.target.files[0];
        if (!file.type.match('video.*')){
            return;
        }

        let reader= new FileReader();
        reader.onload = (function (File){
            return function (e) {
                let videoDiv = document.getElementsByClassName('video-container');
                if(videoDiv[0] != null){
                    videoDiv[0].parentNode.removeChild(videoDiv[0]);
                }
                /*Crear el container para el video */

                let div = document.createElement('div');
                div.id= "div-video";
                div.className= "video-container";
                div.innerHTML='<video controls id="video" class="thumbnail" src="'+ e.target.result + '"title="'+ (File.name)+'"/>';
                document
                    .getElementById('video-output')
                    .insertBefore(div, null);
                /*Crear mensage de carga */
                let loadingMessage = document.createElement('p');
                loadingMessage.id= "cargando";
                loadingMessage.className="mensaje-carga";
                alert("Cargando video....");
                loadingMessage.innerHTML= 'Cargando Video';
                document
                .getElementById('video-output')
                .insertBefore(loadingMessage, null);
                let playButton = document.getElementById('play');
                let pauseButton = document.getElementById('pause');
                let volumenUpButton =document.getElementById('volumen_mas');
                let volumeDownButton = document.getElementById('volumen_menos');
                /*Crear funcionalidad botones + dar visibilidad */
                playButton.addEventListener('click', () =>{
                    document.getElementById('video').play();  
                });
                pauseButton.addEventListener('click', () =>{
                    document.getElementById('video').pause();  
                })
                volumenUpButton.addEventListener('click', () =>{
                    document.getElementById('video').volume += 0.3;  
                })
                volumeDownButton.addEventListener('click', () =>{
                    document.getElementById('video').volume -= 0.3;  
                })
                document.getElementById('video').addEventListener('canplay', () => {
					let loadingMessage = document.getElementById('cargando');
					document
						.getElementById('video-output')
						.removeChild(loadingMessage);
					document
						.getElementById('video')
						.style.visibility = "visible";
					playButton
						.style.visibility = "visible";
					pauseButton
						.style.visibility = "visible";
                    volumenUpButton
						.style.visibility = "visible";
                    volumeDownButton
						.style.visibility = "visible";
				});
            }   
        })(file);
        reader
        .readAsDataURL(file);
    }
    document
    .getElementById('file')
    .addEventListener('change',handleFileSelect, false);


}else{
    alert('API no soportado por el navegador utilizado')
}