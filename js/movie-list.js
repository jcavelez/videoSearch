const API_URL = 'https://yts.mx/api/v2/list_movies.json?with_images=true&'
const MOVIE_DETAILS_URL = 'https://yts.mx/api/v2/movie_details.json?'

const GENRES = {
              comedy: 'Comedia',
              action: 'Acción',
              history: 'Historia',
              thriller: 'Suspenso',
              }

const $listsContainer = document.getElementById('lists')
const $overlay = document.getElementById('overlay')
const $modal = document.getElementById('modal')


//Render de carrouseles
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

//Render de item de cada carrusel
for (let genre in GENRES)
{
  async function fillCarousel()
  {
    async function getMovies(genre)
    {
      let movies
      try {
        const response = await fetch(`${API_URL}genre=${genre}`)
        movies = await response.json()
        console.log(`Llegaron las pelis de ${genre} por async await`, movies.data)
        return movies.data.movies
      } catch (e) {
        console.log(e)
        movies = [{id: 'undefined', title: 'Not found', medium_cover_image: './assets/img/404-error-page-not-found-miss-paper-with-white-vector.jpg'}]
        return movies
      } finally {

      }
    }

    const MOVIES = await getMovies(genre)
    const $carousel = document.getElementById(genre+'-list')
    $carousel.children[0].remove()
    //console.log(MOVIES)
    MOVIES.forEach((movie) => {
      let movieElement
      const templateItem = `
      <div class="carousel-item" data-id="${movie.id}">
        <img class="carousel-item__img" src="${movie.medium_cover_image}" alt="${movie.title}">
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
      movieElement = html.body.children[0]
      $carousel.append(movieElement)
      const imageMovieElement = movieElement.querySelector('.carousel-item__img')
      imageMovieElement.addEventListener('load', () => { imageMovieElement.classList.add('fadeIn')} )
      movieElement.addEventListener('click', () => { showModal(parseInt(movieElement.dataset.id, 10)) })
    })
  }

  fillCarousel()
}

async function showModal(movieId)
{
  $overlay.classList.add('active');

  console.log(`Vamos a mostrar la pelicula ID ${movieId}`)
  const $modalContent = document.querySelector('.modal-content')
  let movieData
  let movieElement


  movieData = await getMovieDetails(`${MOVIE_DETAILS_URL}movie_id=${movieId}`)

  const movieModalTemplate = createModalTemplate(movieData)
  const movieHTMLCollection = document.implementation.createHTMLDocument()
  movieHTMLCollection.body.innerHTML = movieModalTemplate
  movieElement = movieHTMLCollection.body.children[0]

  let sizeModalContent = $modalContent.children.length
  for (let i = 0; i < sizeModalContent; i++)
  {
    $modalContent.children[0].remove()
  }

  $modalContent.append(movieElement)

  $modal.style.animation = 'modalIn .8s forwards';

  const $closeModal = document.getElementById('closeModal')
  $closeModal.addEventListener('click', hideModal)
  $overlay.addEventListener('click', hideModal)
}

function hideModal() {
  $overlay.classList.remove('active');
  $modal.style.animation = 'modalOut .5s forwards';
}

function setAttributes($element, attributes)
{
  for(let attr in attrbutes)
  {
    $element.setAttributes(attr, attributes[key])
  }
}

function createModalTemplate(movie)
{
  let movieGenres = ''

  for(genre in movie.genres)
  {
    movieGenres = `${movie.genres[genre]}, ${movieGenres}`
  }

  console.log(movieGenres)

  return `
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeModal">
        <span aria-hidden="true">&times;</span>
      </button>
      <h4 class="modal-title" id="myModalLabel">${movie.title}</h4>
    </div>
    <div class="modal-main">
      <img class="modal-img" src="${movie.medium_cover_image}" alt="">
      <p class="modal-desc">${movie.description_full}
      </p>
    </div>
    <div class="modal-details info">
        <span class="sub">Géneros: </span> <span>${movieGenres}</span>
        <span class="sub">Idioma: </span> <span>${movie.language}</span>
        <span class="sub">Año: </span> <span>${movie.year}</span>
        <span class="sub">Rating IMBd: </span> <span>${movie.rating}</span>
    </div>
  </div>
  `
}
