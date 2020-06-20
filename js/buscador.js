const $buscador = document.getElementById('buscador')
const $results = document.getElementById('main__results')
const $resultsCarousel = document.getElementById('resultsCarousel')




//Cuando al formulario se le de enter se le quita el comportamiento por defecto
//que viene con el elemento que es recargar la página
//luego se activa el carrusel de resultlados
$buscador.addEventListener('submit', async (event) => {
  event.preventDefault()
  $results.classList.add('main__results--active')
  // Borramos lo que hay en el carrusel de resultados para poner el loader
  emptyHTMLCollection($resultsCarousel)
  //agregamos un elemento (just for fun (?))
  let $loader = document.createElement('img')
  setAttributes($loader, {
    src: 'assets/img/loader.gif',
    width: 50,
    height: 50,
  })

  $resultsCarousel.append($loader)
  let data = new FormData($buscador)
  let searchResults = await getData(`${API_URL}limit=10&query_term=${data.get('movie')}`)
  // Borramos el $loader
  emptyHTMLCollection($resultsCarousel)
  if (searchResults)
  {
    searchResults.forEach((movie) => {
      console.log(movie.title)
      let item = createCarouselItemTemplate(movie)
      insertHTML($resultsCarousel, item)
    })
  }
  else
  {
    insertHTML($resultsCarousel, '<div style="font-size: 20px">Título no encontrado</div>')
  }

})

//para que cuando se de clic en el buscador, desaparezca el carrusel de
//resultados
// $buscador.addEventListener('click', (event) => {
//   $results.classList.remove('main__results--active')
// })

function setAttributes($element, attributes)
{
  for (let attribute in attributes)
  {
    $element.setAttribute(attribute, attributes[attribute])
  }
}

async function getData(API)
{
  const response = await fetch(`${API}`)
  const movies = await response.json()
  //console.log(`Llegaron las pelis de la búsqueda`, movies.data.movies)
  return movies.data.movies
}

async function getMovieDetails(API)
{
  const response = await fetch(`${API}`)
  const movies = await response.json()
  console.log(`Llegaron las pelis de la búsqueda`, movies.data.movie)
  return movies.data.movie
}

function createCarouselTemplate(id)
{
  return `

    <section class="carousel">
      <div class="carousel__container" id="${id}-list">
        <img src="assets/img/loader.gif" width="50" height="50" alt="">
      </div>
    </section>
    `
  //
}

function createCarouselItemTemplate(movie)
{
  return `
  <div class="carousel-item" data-id="${movie.id}">
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
}

function insertHTML($selector, template)
{
  const html = document.implementation.createHTMLDocument()
  html.body.innerHTML = template
  const templateInHTML = html.body.children[0]
  $selector.append(templateInHTML)
  const $imageMovieElement = templateInHTML.querySelector('.carousel-item__img')
  $imageMovieElement.addEventListener('load', () => { $imageMovieElement.classList.add('fadeIn')} )
  templateInHTML.addEventListener('click', () => { showModal(parseInt(templateInHTML.dataset.id, 10)) })
}

function prependHTML($selector, template)
{
  const html = document.implementation.createHTMLDocument()
  html.body.innerHTML = template
  const templateInHTML = html.body.children[0]
  $selector.prepend(templateInHTML)
}

function appendHTML($selector, template)
{
  const html = document.implementation.createHTMLDocument()
  html.body.innerHTML = template
  const templateInHTML = html.body.children[0]
  $selector.append(templateInHTML)

}

function emptyHTMLCollection($HTMLCollection)
{
  let sizeHTMLCollection = $HTMLCollection.children.length
  for (let i = 0; i < sizeHTMLCollection; i++)
  {
    $HTMLCollection.children[0].remove()
  }
}

function addItemEvents($movieItem)
{
  const $imageMovieItemt = $movieItem.querySelector('.carousel-item__img')
  $imageMovieItem.addEventListener('load', () => { $imageMovieItem.classList.add('fadeIn')} )
  $movieItem.addEventListener('click', () => { showModal(parseInt($movieItem.dataset.id, 10)) })
}
