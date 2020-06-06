const API_URL = 'https://yts.mx/api/v2/list_movies.json?with_images=true&'

const GENRES = {action: 'Acción',
              history: 'Historia',
              thriller: 'Suspenso',
              fantasy: 'Fantasía'
              }

const $listsContainer = document.getElementById('lists')

for (let genre in GENRES)
{
  let templateTitles = `
    <h2 class="categories__title">Películas de ${GENRES[genre]}</h2>

    `
    let templateCarousel = `
    <section class="carousel">
      <div class="carousel__container id="${genre}-list">
        <img src="assets/img/loader.gif" width="50" height="50" alt="">
      </div>
    </section>
    `
  //crea una variable tipo documento html
  let html = document.implementation.createHTMLDocument()
  //agrega los template de lista de generos carrusel
  console.log(templateTitles)
  html.body.innerHTML = templateTitles
  //agregar el temprate al final del elemento con id 'list'
  $listsContainer.append(html.body.children[0])
  console.log(templateCarousel)
  html.body.innerHTML = templateCarousel
  $listsContainer.append(html.body.children[0])

}


for (let variable in object) {
  if (object.hasOwnProperty(variable)) {

  }
}

async function traerPelis(genre) {

  async function promesaDeTraerPelis()
  {
    const response = await fetch(`${API_URL}genre=${genre}`)
    const movies = await response.json()
    console.log(`Llegaron las pelis de ${genre} por async await`, movies.data)
  }

  const movies = await promesaDeTraerPelis(API_URL)

}

//traerPelis('Drama')
