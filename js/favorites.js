window.onload = function(){

    var sectionFavorites = document.querySelector('.favorites')
    var h1favorites = document.querySelector('#h1favorites')

    arrayFavs = JSON.parse(localStorage.getItem('favoritos'))
    

    if (arrayFavs == null) {
        h1favorites.innerHTML = 'No favorites yet.'
    } else {
        h1favorites.innerHTML = 'Your Favorites'
    
    for (let i = 0; i < arrayFavs.length; i++) {
        const element = arrayFavs[i];
        if (element.type == 'track') {

            console.log('es una cancion')

            fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${element.id}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data)
               sectionFavorites.innerHTML += `
               <article><a href="detail.html?type=track&id=${data.id}">
               <img src="${data.album.cover}">
               <h1>${data.title}</h1>
               <h3>Song by ${data.artist.name}</h3>
               </a>
               </article>
               `
            })
            .catch(function (error) {
                console.log(`el error fue ${error}`)
            })
    
            
        } else if (element.type == 'album') {
            
            console.log('es un album')

            fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${element.id}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data)
               sectionFavorites.innerHTML += `
               <article><a href="detail.html?type=album&id=${data.id}">
               <img src="${data.cover}">
               <h1>${data.title}</h1>
               <h3>Album by ${data.artist.name}</h3>
               </a>
               </article>
               `
            })
            .catch(function (error) {
                console.log(`el error fue ${error}`)
            })

        }else if (element.type == 'artist') {

            console.log('es un artista')

            fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${element.id}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data)
                sectionFavorites.innerHTML += `
                <article><a href="detail.html?type=artist&id=${data.id}">
                <img src="${data.picture}">
                <h1>${data.name}</h1>
                </a>
                </article>
                `
            })
            .catch(function (error) {
                console.log(`el error fue ${error}`)
            })
            

        }
    }
}
}