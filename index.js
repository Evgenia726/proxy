const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/:article", async (req, res) => {
  const article = req.params.article;
  try {
    const response = await fetch(`https://card.wb.ru/cards/detail?appType=1&curr=rub&nm=${article}`);
    const json = await response.json();
    const product = json.data.products?.[0];

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({
      article,
      title: product.name,
      price: product.salePriceU / 100,
      rating: product.reviewRating,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
