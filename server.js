const express = require("express");
const nodemailer = require("nodemailer");

const server = express();

server.use(express.static(__dirname));
server.use(express.json());

server.get("*", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.post("/api/feedback", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "chilumy@mail.ru",
        pass: "TZWVZyNefZztsj0sKFz0",
      },
    });

    const { message, age, star } = req.body;

    await transporter.sendMail({
      from: "chilumy@mail.ru",
      to: "nik.zagibalov.00@mail.ru",
      subject: "Тема письма",
      text: `${message}, ${age}, ${star}`,
      html: 
      `
      <p>${message}</p>
      <p>${age}</p>
      <p>${star}</p>
      `
    });

    return res.status(200).send({ status: 200, message: "Success" });
  } catch (e) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal server error" });
  }
});

server.listen(3000, () => {
  console.log(`App listening on port 3000:`);
});
