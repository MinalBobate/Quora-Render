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

// router.post("/", async (req, res) => {
//   try {
//     const answer = await answerDB.create({
//       answer: req.body.answer,
//       question: req.body.questionId,
//       user: req.body.user,
//     });

    
//     // await Question.findByIdAndUpdate(req.body.questionId, {
//     //   $push: { answers: answer._id },
//     // });

//     res.status(201).send({
//       status: true,
//       message: "Answer added successfully",
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(500).send({
//       status: false,
//       message: "Error while adding answer",
//     });
//   }
// });


router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await answerDB.find({'questionId':id});
// console.log(doc.res)
    // Check if 'doc' is not null or undefined before sending the response
    if (doc && doc.length>0) {
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
// router.get("/answer/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const question = await Question.findById(id).populate('answers');

//     if (question) {
//       res.status(200).send(question.answers);
//     } else {
//       res.status(404).send({
//         status: false,
//         message: "No question found for the given ID",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       status: false,
//       message: "Unable to get the answers details",
//     });
//   }
// });

export default router;
