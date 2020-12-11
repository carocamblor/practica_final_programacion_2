window.onload = function () {

    var queryStringObjeto = new URLSearchParams(location.search)
    var type = queryStringObjeto.get('type')
    var id = queryStringObjeto.get('id')

    var main = document.querySelector('.main')

    if (type == 'track') {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
           main.innerHTML += `
           <h1>${data.title}</h1>
           <h2><a href="detail.html?type=artist&id=${data.artist.id}">Artist: ${data.artist.name}</a></h2>
           <audio controls>
            <source src="${data.preview}">
            Your browser does not support the audio element.
            </audio>
            <br>
            <a href="detail.html?type=album&id=${data.album.id}"><img src="${data.album.cover}" alt=""></a>
           `
        })
        .catch(function (error) {
            console.log(`el error fue ${error}`)
        })
    } else if (type == 'album') {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
           main.innerHTML += `
           <h1>${data.title}</h1>
           <h2><a href="detail.html?type=artist&id=${data.artist.id}">Artist: ${data.artist.name}</a></h2>
            <br>
            <img src="${data.cover}" alt="">
            <h3>In the album:</h3>
            <ol id="tracks">
            </ol>
           `
           fetch(`https://cors-anywhere.herokuapp.com/${data.tracklist}`)
           .then(function(response) {
               return response.json();
           })
           .then(function(data) {
               console.log(data)
               var tracks = document.querySelector('#tracks')
               for (let i = 0; i < data.data.length; i++) {
                   const element = data.data[i];
                   tracks.innerHTML += `
                   <li><a href="detail.html?type=${element.type}&id=${element.id}">${element.title}</a></li>
                   `
                   
               }
           })
           .catch(function (error) {
               console.log(`el error fue ${error}`)
           })

        })
        .catch(function (error) {
            console.log(`el error fue ${error}`)
        })
    } else if (type == 'artist') {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            console.log(data)
           main.innerHTML += `
           <h1>${data.name}</h1>
           <img src="${data.picture}" alt="">
           <h3>By the artist:</h3>
           <div id="tracks">
            </div>
           `
           fetch(`https://cors-anywhere.herokuapp.com/${data.tracklist}`)
           .then(function(response) {
               return response.json();
           })
           .then(function(data) {
               console.log(data)
               var tracks = document.querySelector('#tracks')
               for (let i = 0; i < data.data.length; i++) {
                   const element = data.data[i];
                   tracks.innerHTML += `
                   <article><a href="detail.html?type=${element.type}&id=${element.id}">
                   <img src="${element.album.cover_xl}" alt=""><div></h5>${element.title}</h5><h6>${element.artist.name}</h6>
                   </div></a></article>
                   `
                   
               }
           })
           .catch(function (error) {
               console.log(`el error fue ${error}`)
           })

        })
        .catch(function (error) {
            console.log(`el error fue ${error}`)
        })
    }

    var fav = document.querySelector('.fav')
    var notFav = document.querySelector('.notFav')

    var favs = JSON.parse(localStorage.getItem('favoritos'))

    if (favs == null) {
        notFav.style.display = 'none';
        fav.style.display = 'block'; 
    }
    else if (favs.some(FAV => (FAV.type==type)&&(FAV.id==id))) {
        notFav.style.display = 'block';
        fav.style.display = 'none';
        } else{
        notFav.style.display = 'none';
        fav.style.display = 'block';

        }

    fav.addEventListener('click',function(){
        fav.style.display = 'none'
        notFav.style.display = 'block'
        
        if (favs == null){
            predilectos = [];
        }else{
            predilectos = JSON.parse(localStorage.getItem('favoritos'))
        }

        predilectos.push({type: type, id: id})
        console.log(predilectos)
        localStorage.setItem('favoritos', JSON.stringify(predilectos))
    })

    

    notFav.addEventListener('click',function(){
        fav.style.display = 'block'
        notFav.style.display = 'none'
        predilectos = JSON.parse(localStorage.getItem('favoritos'))
        console.log(predilectos)
        console.log(predilectos.filter(function(gusta) {
            return (gusta.id == id) && (gusta.type == type)
        }))
        localStorage.setItem('favoritos', JSON.stringify(predilectos.filter(
            function(gusta) {
                return gusta.id != id && gusta.type != type
            }
        )))
    })    

}

