document.addEventListener("DOMContentLoaded", function(event) {
    loader_dom = document.getElementsByClassName("loader")[0];
    loader_dom.style.display="none";
    let submit_btn=document.getElementsByClassName("submit-btn")[0];
    submit_btn.addEventListener('click', e => {
        loader_dom.style.display="block";
        content = document.getElementsByClassName("text-field")[0].value;
        let json_data = {'data-uri': content }
    
        // this is ajax part when it send the json data of the image from the 
        // webcame to our flask back end at /predict using POST method 
        fetch('/predict/', {
          method: 'POST',
          processData: false,
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(json_data)
        }).then(res=>res.json())
          .then(data => {
            loader_dom.style.display="none";
            // this is when we successfully receive the data back from the flask backend
            console.log(data);
            MIDIjs.play(data.audio_filename);
            console.log(data.audio_filename)
          });
    });
});