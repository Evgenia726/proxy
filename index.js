const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/api", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Proxy is working!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
