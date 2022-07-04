var express = require("express");
var router = express.Router();
var reminder = require("../Schema/reminder");
var bodyparser = require("body-parser");
router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

router.post("/users", async (req, res) => {
    try {
      console.log("req.body", req.body);
  
      var newreminder = new reminder({
        Username: req.body.Username,
        
      });
    } catch (err) {
      console.log("error", err);
    }
    await reminder.create(newreminder);
    console.log("success");
    res.send("Details Added");
  });

  router.put("/update/:id", async (req, res) => {
    const idQuery = req.params.id;
    const query = req.body;
    console.log(query);
    reminder.findByIdAndUpdate(idQuery, {
      $push:{
        "Reminder":query
      },
    }, async (err, response) => {
      if (err) res.send(err);
      else res.send(response);
    });
  })

  router.put("/change-stat/:user_id/:reminder_id", async (req, res)=>{
    const {user_id,reminder_id} =req.params;
    console.log(req.params);
    await reminder.findByIdAndUpdate(user_id,{
      "Reminder.id":reminder_id,
      $set:{"Reminder.Noted": true},
      new:true
    })
    async (err, response) => {
      if (err) res.send(err);
      else res.send(response);
    }
  } )
  
  module.exports = router;