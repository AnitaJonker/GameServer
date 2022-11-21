const PORT = process.env.PORT || 5001
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
const fs = require("fs")
const jsonfile = require("jsonfile")
const file = "./db.json"

const baseUrl = `http://localhost:${PORT}`
const jsonFile = require("./db.json")

jsonfile.readFile(file, function (err, obj) {
  if (err) console.error(err)
  jsonObject = obj
})

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

//display all games in db
app.get("/games", (req, res) => {
  res.json(jsonObject)
})

//create a new game
app.post("/addgame", (req, res) => {
  //payload example
  const customer = {
    appid: 101,
    name: "Disney Dreamlight Valley",
    playtime_forever: 0,
    img_icon_url: null,
    img_logo_url: null,
    has_community_visible_stats: true,
  }

  jsonObject.response.games.push(req.body)
  console.log("Succesfully created.")

  //update game count
  jsonObject.response.game_count += 1

  update(jsonObject)
  res.json(`${req.body}`)
})

function updateUserInfo(id, body) {
  jsonObject.response.games.forEach((element) => {
    //found id
    try {
      if (id == element.appid) {
        if (body.name) element.name = body.name
        if (body.playtime_forever)
          element.playtime_forever = body.playtime_forever
        if (body.img_icon_url) element.name = body.img_icon_url
        if (body.img_icon_url) element.img_logo_url = body.img_logo_url
        if (body.has_community_visible_stats)
          element.has_community_visible_stats = body.has_community_visible_stats
        return
      }
    } catch (error) {
      console.log("line 97", error)
    }
  })
}

app.put("/userdet/:id", (req, res) => {
  let id = req.params.id
  let body = req.body
  updateUserInfo(id, body)
  update(jsonObject)
  res.json(jsonObject)
})

function update(currentJsonFile) {
  jsonfile
    .writeFile(file, currentJsonFile)
    .then((res) => {
      console.log("Write complete")
    })
    .catch((error) => console.error(error))
}

function deleteUserInfo(id) {
  let count = 0
  jsonObject.response.games.forEach((element) => {
    if (id == element.appid) {
      jsonObject.response.games.splice(count, 1)
      return
    }
    count++
  })
}

app.delete("/userdelete/:id", (req, res) => {
  console.log("req.params.id", req.params.id)
  let id = req.params.id
  deleteUserInfo(id)
  update(jsonObject)
  res.json(jsonObject)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}  gamer get good`)
  console.log(`http://localhost:${PORT}/`)
})
