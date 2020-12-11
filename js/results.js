window.onload = function () {

    var loading = document.querySelector('#loading')

    var queryStringObjeto = new URLSearchParams(location.search)
    var q = queryStringObjeto.get('q')

    var results = document.querySelector('.results')
    var h2results = document.querySelector('#h2results')

    h2results.innerHTML += `Showing results for "${q}"`

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=${q}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data.data)
        loading.style.display = 'none'
        for (let i = 0; i < 24; i++) {
            const element = data.data[i];
            console.log('holaaa')
            results.innerHTML += `
            <article><a href="detail.html?type=${element.type}&id=${element.id}"><img src="${element.album.cover_xl}" alt=""><div></h5>${element.title}</h5><h6>${element.artist.name}</h6></div></a></article>
            `
            
        }
    })
    .catch(function (error) {
        console.log(`el error fue ${error}`)
    })
}