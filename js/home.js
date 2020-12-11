window.onload = function () {

    var top = document.querySelector('.top')

    fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/albums')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        data.data.forEach(element => {
            top.innerHTML += `
            <article><a href="detail.html?type=${element.type}&id=${element.id}"><img src="${element.cover_xl}" alt=""></a></article>
            `
        });
    })
    .catch(function (error) {
        console.log(`el error fue ${error}`)
    })
    
}