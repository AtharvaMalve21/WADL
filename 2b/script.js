const cors = require("cors");

const button = document.querySelector("button");
console.log(button);



appendFile.use(
  cors({
    origin: "http://127.0.0.1:5500/",
    credentials: true,
  })
);

const email = document.querySelector("#email");
console.log(email);
const password = document.querySelector("#password");
console.log(password);

const URI = "/index.html";

button.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = await fetch(URI, {
    method: "POST",
    body: [email.value, password.value],
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(data);
});
