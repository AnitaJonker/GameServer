const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const bodyParser = require("body-parser")
const monk = require("monk")

const { notFound, errorHandler } = require("./middleware")

require("dotenv").config()

const schema = require("./db/schema")
const db = require("./db/connection")
const employees = db.get("employees")

const app = express()

app.use(helmet())
app.use(morgan("dev"))
app.use(bodyParser.json())

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
  console.log(`http://localhost:${port}/`)
})

/* ONLINE USER CODE */

app.get("/users", async (req, res, next) => res.send("Hello World!"))

app.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const employee = await employees.findOne({
      _id: id,
    })

    if (!employee) {
      const error = new Error("Employee does not exist")
      return next(error)
    }

    res.json(employee)
  } catch (error) {
    next(error)
  }
})

/* Create a new employee */
app.post("/", async (req, res, next) => {
  try {
    const { name, job } = req.body
    const result = await schema.validateAsync({ name, job })

    const employee = await employees.findOne({
      name,
    })

    // Employee already exists
    if (employee) {
      res.status(409) // conflict error
      const error = new Error("Employee already exists")
      return next(error)
    }

    const newuser = await employees.insert({
      name,
      job,
    })

    console.log("New employee has been created")
    res.status(201).json(newuser)
  } catch (error) {
    next(error)
  }
})

/* Update a specific employee */
app.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, job } = req.body
    const result = await schema.validateAsync({ name, job })
    const employee = await employees.findOne({
      _id: id,
    })

    // Employee does not exist
    if (!employee) {
      return next()
    }

    const updatedEmployee = await employees.update(
      {
        _id: id,
      },
      {
        $set: result,
      },
      { upsert: true }
    )

    res.json(updatedEmployee)
  } catch (error) {
    next(error)
  }
})

/* Delete a specific employee */
app.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const employee = await employees.findOne({
      _id: id,
    })

    // Employee does not exist
    if (!employee) {
      return next()
    }
    await employees.remove({
      _id: id,
    })

    res.json({
      message: "Success",
    })
  } catch (error) {
    next(error)
  }
})
