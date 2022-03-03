const key = 'c0b2e256491361d28c75bbe8f9e59a85';
const baseUrl = 'https://api.themoviedb.org/3/';
const select = document.querySelector('.js-select');
const main = document.querySelector('.main');
const urlGeneres = 'https://api.themoviedb.org/3/genre/movie/list?api_key=c0b2e256491361d28c75bbe8f9e59a85&language=en-US';
const cont = document.createElement('div');


fetch(urlGeneres)
.then(res => res.json())
.then(data => {
    data.genres.forEach(element => {
        let option = document.createElement('option');
        option.setAttribute("value", element.id);
        option.innerHTML = element.name;
        select.appendChild(option);
    })

})
.catch(err => console.log(err));

document.addEventListener('DOMContentLoaded', function(color, fruta) {})


select.addEventListener('click', function(event) {
    cont.innerHTML= '';
    let allMoviesOneGenre = event.target.value;
    const urlMoviesOneGenre = `https://api.themoviedb.org/3/genre/${allMoviesOneGenre}/movies?api_key=${key}&language=en-US&include_adult=false&sort_by=created_at.asc`;

    fetch(urlMoviesOneGenre)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.results.forEach(element => {
            
            let containerMovie = document.createElement('div');
            let img = document.createElement('img');
            let title = document.createElement('h3');
            let year = document.createElement('h5');

            containerMovie.classList.add("container-movie");
            img.classList.add("container-movie__img");
            title.classList.add("container-movie__title");
            year.classList.add("container-movie__year");

            img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${element.poster_path}`)
            img.setAttribute('name', allMoviesOneGenre)
            img.setAttribute('data-id', element.id)
            title.innerHTML = element.title;
            year.innerHTML = element.release_date;

            containerMovie.appendChild(img)
            containerMovie.appendChild(title)
            containerMovie.appendChild(year)
            cont.appendChild(containerMovie)
            main.appendChild(cont)

            img.addEventListener('click', function(e) {
                let idMovie = e.target.dataset.id;
                console.log(idMovie)

                let url = `l-https://api.themoviedb.org/3/movie/${idMovie}?api_key=${key}&append_to_response=videos`;
                fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
            })
        })

    })
    .catch(err => console.log(err));
})




