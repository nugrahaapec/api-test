const express = require("express");
const router = express.Router();
const validator = require("fastest-validator");
const { user } = require("../models");
const bcrypt = require("bcrypt");
const v = new validator();

router.post("/", async (req, res) => {
  const schema = {
    nama: "string",
    email: { type: "email" },
    nik: "string",
    username: "string|min:4",
    password: "string|min:6",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    res.status(400).json(validate);
  } else {
    res.status(200);
  }
  const checkEmail = await user.findOne({ where: { email: req.body.email } });
  if (checkEmail) {
    res.json({
      Messaga: "Email telah digunakan",
    });
  } else {
    res.status(200);
  }
  const username = await user.findOne({
    where: { username: req.body.username },
  });
  if (username) {
    res.status(400).json({
      Messaga: "Username telah digunakan",
    });
  } else {
    res.status(200);
  }
  const nik = await user.findOne({
    where: { nik: req.body.nik },
  });
  if (nik) {
    res.status(400).json({ Messaga: "NIK telah digunakan" });
  } else {
    res.status(200);
  }
  const hash = await bcrypt.hash(req.body.password, 10);
  const data = {
    nama: req.body.nama,
    email: req.body.email,
    nik: req.body.nik,
    username: req.body.username,
    password: hash,
  };
  const User = await user.create(data);
  res.json({
    Message: "Create User Success",
    data: User,
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let User = await user.findByPk(id);
  if (!User) {
    return res.status(404).json({
      Message: "User Not Found",
    });
  }
  const schema = {
    nama: "string|optional",
    email: "string|optional",
    nik: "string|optional",
    username: "string|optional",
    password: "string|min:6|optional",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json(validate);
  }
  User = await User.update(req.body);
  res.status(201).json({
    Message: "Update user success",
    data: User,
  });
});

router.get("/", async (req, res) => {
  try {
    const User = await user.findAll();
    res.status(200).json({
      Message: "Data All User",
      data: User,
    });
  } catch (error) {
    restart.json(500);
  }
});

router.get("/:nik", async (req, res) => {
  const nik = req.params.nik;
  const User = await user.findOne({ where: { nik: nik } });
  if (!User) {
    res.status(404).json({
      Message: "User Not Found",
    });
  }
  res.status(200).json({
    Message: "Detail User",
    data: User,
  });
});

module.exports = router;
