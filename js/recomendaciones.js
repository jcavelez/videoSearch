const RECOMMENDATIONS_URL = 'https://yts.mx/api/v2/movie_suggestions.json?'

//sessionStorage de prueba CAMBIAR POR LOCAL
//sessionStorage.idRecommendations = [18322, 18232, 18342]

if(recommendationBuffer > 0)
{
  setTimeout(() => {
      let recommendedMovies = []
      let $recommendationsCarousel = createRecommendatios()
      //enviar cada id en cache a getData
      //recibir 4 peliculas
      //enviarlas a render item
      getRecommendations().then(() => {
        emptyHTMLCollection($recommendationsCarousel)
        recommendedMovies.forEach( (movie) => {
          let movieTemplate = createCarouselItemTemplate(movie)
          insertHTML($recommendationsCarousel, movieTemplate)
        })

      })

      async function getRecommendations()
      {
        // let cacheList = localStorage.getItem('idRecommendations').split(',')

        for (let i = 1; i <= recommendationBuffer; i++)
        {
          const recommendedId = localStorage[`rec${i}`]
          debugger
          const movies = await getData(`${RECOMMENDATIONS_URL}movie_id=${recommendedId}`)
          recommendedMovies = recommendedMovies.concat(movies)
        }
        console.log(recommendedMovies);
        // return recommendedMovies
      }
      }
    ,500)

}

function createRecommendatios()
{
  let carouselTemplate  = createCarouselTemplate('recommendations')
  prependHTML($listsContainer, carouselTemplate)
  prependHTML($listsContainer, '<h2 class="categories__title">Recomendados</h2>')
  const $recommendationsCarousel = document.getElementById('recommendations-list')
  //emptyHTMLCollection($recommendationsCarousel)
  return $recommendationsCarousel
}
