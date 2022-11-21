const axios = require("axios")

// get languages
const options = {
  method: "GET",
  url: "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
  headers: {
    "Accept-Encoding": "application/gzip",
    "X-RapidAPI-Key": "AtkA5OCjtKmshJd4r9sjaYLcPQ0Up18imRajsnh8cbctgYfWr1",
    "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
  },
}

axios
  .request(options)
  .then(function (response) {
    console.log(response.data)
  })
  .catch(function (error) {
    console.error(error)
  })
