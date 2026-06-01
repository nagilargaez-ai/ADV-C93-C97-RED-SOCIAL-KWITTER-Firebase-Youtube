const firebaseConfig = {
  apiKey: "AIzaSyBHRSUyUYGdDAFRBoUHU_QKidUqeOeqeMc",
  authDomain: "kwitter-66b73.firebaseapp.com",
  databaseURL: "https://kwitter-66b73-default-rtdb.firebaseio.com",
  projectId: "kwitter-66b73",
  storageBucket: "kwitter-66b73.firebasestorage.app",
  messagingSenderId: "1048817812773",
  appId: "1:1048817812773:web:ec5d433ab35e03e8b246cc"
};

firebase.initializeApp(firebaseConfig);

const API_KEY = "AIzaSyA-P3EVgCGz25BdhgkR0kJPebhPFpQ1_xk";


let user_name =
localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML =
"¡Hola " + user_name + "!";


function buscarVideos()
{
    let texto =
    document.getElementById("search").value;

    fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${texto}&maxResults=10&type=video&key=${API_KEY}`
    )

    .then(response=>response.json())

    .then(data=>{

        document.getElementById("videos").innerHTML="";

        data.items.forEach(video=>{

            let videoId =
            video.id.videoId;

            let titulo =
            video.snippet.title;

            document.getElementById("videos").innerHTML +=

            `
            <div class="video-card">

            <h3>${titulo}</h3>

            <iframe
            src="https://www.youtube.com/embed/${videoId}"
            allowfullscreen>
            </iframe>

            <br><br>

            <button
            class="btn btn-danger"
            onclick="guardarFavorito('${videoId}','${titulo}')">

            ❤️ Guardar

            </button>

            </div>
            `;

        });

    });
}

function guardarFavorito(videoId,title)
{
    firebase.database()
    .ref("favoritos/"+user_name)
    .push({

        videoId:videoId,
        title:title

    });

    alert("Video guardado");
}

function verFavoritos()
{
    firebase.database()
    .ref("favoritos/"+user_name)

    .once("value")

    .then(function(snapshot){

        document.getElementById("videos").innerHTML="";

        snapshot.forEach(function(child){

            let data =
            child.val();

            document.getElementById("videos").innerHTML +=

            `
            <div class="video-card">

            <h3>${data.title}</h3>

            <iframe
            src="https://www.youtube.com/embed/${data.videoId}"
            allowfullscreen>
            </iframe>

            </div>
            `;

        });

    });
}


