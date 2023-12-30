import express from 'express'
const router = express.Router();

import answerDB from "../models/Answer.js";

router.post("/", async (req, res) => {
  try {
    await answerDB

    .create({
        answer: req.body.answer,
        questionId: req.body.questionId,
        user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Answer added successfully",

        });
      })
      .catch((e) => {
        res.status(400).send({
          status: false,
          message: "Bad request",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding answer",
    });
  }
});


router.get("/answer/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await answerDB.find({ 'questionId': id });

    // Check if 'doc' is not null or undefined before sending the response
    if (doc) {
      res.status(200).send(doc);
    } else {
      res.status(404).send({
        status: false,
        message: "No answers found for the given question ID",
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging

    res.status(500).send({
      status: false,
      message: "Unable to get the answers details",
    });
  }
});


export default router;
