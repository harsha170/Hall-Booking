var fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
halls = [];
app.get("/Halls", (req, res) => {
  if (halls.length) {
    res.json(halls);
  } else {
    res.status(404).json({
      message: "Halls not found",
    });
  }
});

app.post("/hall", (req, res) => {
  req.body.id = halls.length + 1;
  halls.push(req.body);

  res.json({
    message: "Hall Created",
  });
});

app.put("/hall/:id", (req, res) => {
  let hall = halls.findIndex((obj) => obj.id == req.params.id);
  if (hall != -1 && halls) {
    req.body.id = parseInt(req.params.id);
    halls[hall] = req.body;
    res.json({
      message: "User Updated",
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});
app.delete("/hall/:id", (req, res) => {
  let hall = halls.findIndex((obj) => obj.id == req.params.id);
  halls.splice(hall, 1);
});

var customers = [];

app.get("/Customers", (req, res) => {
  if (customers.length) {
    res.json(customers);
  } else {
    res.status(404).json({
      message: "Customer not found",
    });
  }
});

app.post("/customer", (req, res) => {
  req.body.id = customers.length + 1;
  customers.push(req.body);

  res.json({
    message: "Customer Created",
  });
});

app.put("/customer/:id", (req, res) => {
  let customer = customers.findIndex((obj) => obj.id == req.params.id);
  if (customer != -1 && customers) {
    req.body.id = parseInt(req.params.id);
    customers[customer] = req.body;
    res.json({
      message: "User Updated",
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});
app.delete("/customer/:id", (req, res) => {
  let customer = customers.findIndex((obj) => obj.id == req.params.id);
  customers.splice(customer, 1);
});

var orders = [];
app.get("/Orders", (req, res) => {
  if (orders.length) {
    res.json(orders);
  } else {
    res.status(404).json({
      message: "Orders not found",
    });
  }
});

app.post("/order", (req, res) => {
  req.body.id = orders.length + 1;

  let order = orders.findIndex((obj) => obj.hallId == req.body.hallId);
  console.log(order);
  if (order > -1) {
    var start = req.body.start;
    var end = req.body.end;
    var arr = getDates(start, end);
    var startPrev = orders[order].start;
    var endPrev = orders[order].end;
    var arrPrev = getDates(startPrev, endPrev);
    var status = true;
    arr.forEach((ele) => {
      if (arrPrev.includes(ele)) {
        status = false;
        res.json({ message: "Hall already Booked on selected Dates" });
      }
    });
    if (status) {
      orders.push(req.body);
      res.json({ message: "posted order" });
    }
    console.log(arr, arrPrev);
  } else {
    orders.push(req.body);
    res.json({ message: "posted order" });
  }
});




function getDates(start, end) {
  var Start = new Date(start);
  var End = new Date(end);

  var startDate = Start.getDate();
  var endDate = End.getDate();

  var arr = [];
  var x = new Date(Start.setMonth(Start.getMonth() + 1));

  for (var i = startDate; i <= endDate; i++) {
    var date = x.getDate();
    var month = x.getMonth();
    var year = x.getFullYear();
    arr.push(month + "/" + date + "/" + year);
    x = new Date(Start.setDate(Start.getDate() + 1));
  }
  return arr;
}

app.listen(port, () => console.log(port));