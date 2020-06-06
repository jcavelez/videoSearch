const API_URL = 'https://yts.mx/api/v2/list_movies.json?with_images=true&'

const GENRES = {action: 'Acción',
              history: 'Historia',
              thriller: 'Suspenso',
              }

const $listsContainer = document.getElementById('lists')

for (let genre in GENRES)
{
  let templateTitles = `
    <h2 class="categories__title">Películas de ${GENRES[genre]}</h2>

    `
    let templateCarousel = `
    <section class="carousel">
      <div class="carousel__container" id="${genre}-list">
        <img src="assets/img/loader.gif" width="50" height="50" alt="">
      </div>
    </section>
    `
  //
  //crea una variable tipo documento html
  let html = document.implementation.createHTMLDocument()
  //agrega los template de lista de generos carrusel
  //console.log(templateTitles)
  html.body.innerHTML = templateTitles
  //agregar el temprate al final del elemento con id 'list'
  $listsContainer.append(html.body.children[0])
  //console.log(templateCarousel)
  html.body.innerHTML = templateCarousel
  $listsContainer.append(html.body.children[0])

}


for (let genre in GENRES)
{
  async function fillCarousel()
  {
    async function getMovies(genre)
    {

      async function askAPI()
      {
        const response = await fetch(`${API_URL}genre=${genre}`)
        const movies = await response.json()
        console.log(`Llegaron las pelis de ${genre} por async await`, movies.data)
        return movies.data.movies
      }

      const movies = await askAPI(API_URL)

      return movies

    }

    const MOVIES = await getMovies(genre)
    const $carousel = document.getElementById(genre+'-list')
    $carousel.children[0].remove()
    //console.log(MOVIES)
    MOVIES.forEach((movie) => {
      const templateItem = `
      <div class="carousel-item">
        <img class="carousel-item__img" src="${movie.medium_cover_image}" alt="${movie.title}" id="${movie.id}">
        <div class="carousel-item__details">
          <div>
            <img class="carousel-item__details--img" src="./assets/img/play-icon.png" alt="Reproducir">
            <img class="carousel-item__details--img" src="./assets/img/plus-icon.png" alt="Agregar">
          </div>
          <p class="carousel-item__details--title">${movie.title}</p>
          <p class="carousel-item__details--subtitle">${movie.year} ‧ ${movie.genres} ‧ Rating ${movie.rating}</p>
        </div>
      </div>
      `

      const html = document.implementation.createHTMLDocument()
      html.body.innerHTML = templateItem
      $carousel.append(html.body.children[0])

    })

  }


  fillCarousel()
}
