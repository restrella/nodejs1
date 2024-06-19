const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  //   console.log("shop.js", adminData.products);
  //   res.sendFile(path.join(rootDir, "views", "shop.html"));
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      activeShop: true,
      hasProducts: products.length > 0,
      productsCSS: true,
    });
  });
};

exports.getAddProduct = (req, res, next) => {
  //   console.log("productsget", products);
  //   res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    formsCSS: true,
    productsCSS: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const products = new Product(req.body.title);
  //   products.push({ title: req.body.title });
  products.save();
  console.log(products);
  res.redirect("/");
};
