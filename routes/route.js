const express = require("express");
const router = express.Router();
const Data = require("../model/datamodel");

//add
router.post("/add", (req, res) => {
  //   console.log(req.body, "from body");
  Data.create(req.body, function (err, newlydata) {
    if (err) {
      console.log(err);
    } else {
      res.json(newlydata);
      console.log(newlydata);
    }
  });
});
//update
router.post("/update/:id", function (req, res) {
  Data.findByIdAndUpdate(req.params.id, req.body, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.json("updated");
    }
  });
});
//fetch
router.get("/get", (req, res) => {
  Data.find({}, function (err, datalist) {
    if (err) {
      console.log(err);
    } else {
      res.json(datalist);
    }
  });
});
router.delete("/delete/:id", (req, res) => {
  Data.findByIdAndDelete(req.params.id, (data) => {
    res.send("deleted");
  });
});
module.exports = router;
