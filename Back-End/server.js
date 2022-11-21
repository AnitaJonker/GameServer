const PORT = process.env.PORT || 5001
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
const fs = require("fs")

const baseUrl = `http://localhost:${PORT}`
const jsonFile = require("./db.json")

//my friend had to help me with this part
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

//display all games in db
app.get("/games", (req, res) => {
  fs.readFile("./db.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err)
      res.json(err)
      return
    }
    console.log("File data:", jsonString)
    res.json(JSON.parse(jsonString))
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}  gamer get good`)
  console.log(`http://localhost:${PORT}/`)
})

//add data to local
app.post("/userdet", (req, res) => {
  console.log("Test", JSON.stringify(req.body))
  let gameTitle = req.body["name"]
  console.log(gameTitle)
  res.json(gameTitle)
})

//edit data
app.put("/editGame/:id", (req, res) => {
  const company = req.id
  res.send("Got a PUT request at /editgame")
  console.log("Put", JSON.stringify(req.body))
  let playTime = req.body["playtime_forever"]
  console.log(playTime)
  res.json(playTime)
})

// app.put('/api/:company', function (req, res) {
//     var company = req.company;
//     company = _.extend(company, req.body);
//     company.save(function(err) {
//     if (err) {
//         return res.send('/company', {
//             errors: err.errors,
//             company: company
//         });
//     } else {
//         res.jsonp(company);
//     }
//   })
// });

//delete
//app.delete
//read

// app.get("/test", (req, res) => {
//   axios({
//     method: "get",
//   }).then(function (response) {
//     response.data.pipe(fs.createWriteStream("ada_lovelace.jpg"))
//   })

//   res.json(res.data)
// })

// axios
//   .post(`${baseUrl}/user`, {
//     firstName: "Fred",
//     lastName: "Flintstone",
//   })
//   .then(function (response) {
//     console.log(response)
//   })
//   .catch(function (error) {
//     console.log(error)
//   })

// app.get("/", (req, res) => {
//   const axios = require("axios")

//   // get languages
//   const options = {
//     method: "GET",
//     url: "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
//     headers: {
//       "Accept-Encoding": "application/gzip",
//       "X-RapidAPI-Key": "AtkA5OCjtKmshJd4r9sjaYLcPQ0Up18imRajsnh8cbctgYfWr1",
//       "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
//     },
//     "content-length": "20",
//   }
//   axios
//     .request(options)
//     .then(function (response) {
//       res.json(response.data)
//       console.log(response.data)
//     })
//     .catch(function (error) {
//       console.error(error)
//     })
// })

// translate sentence

// app.post("/myserver/orders", function (req, res) {
//   let body = req.body
//   axios
//     .post(baseUrl + "/orders", body)
//     .then(function (response) {
//       console.log(response.data)
//       res.send(response.data)
//     })
//     .catch(function (error) {
//       console.log(error)
//     })
// })

// app.post("/translate", (req, res) => {
//   const encodedParams = new URLSearchParams()
//   encodedParams.append("source", "en")
//   encodedParams.append("target", "es")
//   encodedParams.append("q", "Hello, world!")

//   const options = {
//     method: "POST",
//     url: `http://localhost:${PORT}/translate/v2`,
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//       "Accept-Encoding": "application/gzip",
//       "X-RapidAPI-Key": "AtkA5OCjtKmshJd4r9sjaYLcPQ0Up18imRajsnh8cbctgYfWr1",
//       "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
//     },
//     data: encodedParams,
//   }

//   axios
//     .request(options)
//     .then(function (response) {
//       res.json(res.data)
//       console.log(response.data)
//     })
//     .catch(function (error) {
//       res.json(res.data)
//       console.error(error)
//     })
// })

// app.post("/user", (req, res) => {
//   axios
//     .request({
//       method: "post",
//       url: `http://localhost:${PORT}/user`,
//       data: {
//         firstName: "Fred",
//         lastName: "Flintstone",
//       },
//     })
//     .then(function (response) {
//       console.log(response)
//       res.json(`200 success`)
//     })
//     .catch(function (error) {
//       console.log(error)
//       res.json(`404 not found`)
//     })
// })

// // app.post("/add_game", (req, res) => {
// //   axios({
// //     method: "post",
// //     url: `http://localhost:${PORT}/add_game`,
// //     data: {
// //       appid: 240,
// //       name: "Counter-Strike: Source",
// //       playtime_forever: 2845,
// //       img_icon_url: null,
// //       img_logo_url: null,
// //       has_community_visible_stats: true,
// //     },
// //   })
// //     .then(function (response) {
// //       console.log(response)
// //       res.json(`200 success`)
// //     })
// //     .catch(function (error) {
// //       console.log(error)
// //       res.json(`404 not found`)
// //     })
// // })

// // app.post("/user", (req, res) => {
// //   axios({
// //     method: "post",
// //     url: `http://localhost:${PORT}/user`,
// //     data: {
// //       firstName: "Fred",
// //       lastName: "Flintstone",
// //     },
// //   })
// //   res.json("200 Successful Response")
// // })

//potentially needed

//const bodyParser = require("body-parser")
//const axios = require("axios")
//require("dotenv").config()
