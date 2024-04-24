const FEEDBACK_FORM = document.querySelector("#feedback-form");

function sendFeedback(feedback) {
  fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedback),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Форма успешно отправлена!");
    })
    .catch((error) => {
      console.error("Ошибка:", error);
      alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    });
}

FEEDBACK_FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  const feedbackFormData = new FormData(e.target);
  const feedback = Object.fromEntries(feedbackFormData);

  sendFeedback(feedback);
});

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

    const { message, age } = req.body;

    await transporter.sendMail({
      from: "chilumy@mail.ru",
      to: "nik.zagibalov.00@mail.ru",
      subject: "Тема письма",
      text: `${message}, ${age}`,
      html: 
      `
      <p>${message}</p>
      <p>${age}</p>
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
