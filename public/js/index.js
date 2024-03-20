// window.onload = LoadPage();
// function LoadPage() {
//   switch (true) {
//     case window.location.pathname.startsWith("/api/views/products"):
//       LoadPageProducts();
//       break;
//     case window.location.pathname === "/api/views/cart":
//       LoadPageCart();
//       break;
//   }
// }
// function LoadPageCart() {
//   fetch("/api/cart/65db98aa1fe1ebdacd370877")
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.msg === "Carrito encontrado con éxito") {
//         const cart = data.data.products;
//         const cartCont = document.getElementById("cart_container");
//         cart.forEach((cart) => {
//           const cartEl = document.createElement("div");
//           cartEl.innerHTML = `<span>Nombre: ${cart.product.title}, Descripción: ${cart.product.price}, Código: ${cart.product.code}, Precio: ${cart.product.price}, Estado: ${cart.product.status}, Stock: ${cart.product.stock}, Categoria: ${cart.product.category}</span><button class="btnDelFromCart">DELETE</button>`;
//           cartCont.appendChild(cartEl);
//           const btnDelFromCart = cartEl.querySelector(".btnDelFromCart");
//           asignEventDelFromCart(btnDelFromCart, cart.product._id);
//         });
//       } else {
//         const errorMessage = document.createElement("p");
//         errorMessage.textContent = data.msg;
//         document.body.appendChild(errorMessage);
//       }
//     })
//     .then(() => {
//       const btnToProd = document.querySelector("#toProd");
//       btnToProd.addEventListener("click", () => {
//         window.location.href = "/api/views/products";
//         LoadPage();
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }

// function LoadPageProducts() {
//   fetch("/api/products")
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.msg === "Productos obtenidos con exito") {
//         const products = data.data.docs;
//         const prodCont = document.getElementById("prod_container");
//         let id_cont = 0;
//         products.forEach((product) => {
//           const productEl = document.createElement("div");
//           productEl.innerHTML = `<span>Nombre: ${product.title}, Descripción: ${product.price}, Código: ${product.code}, Precio: ${product.price}, Estado: ${product.status}, Stock: ${product.stock}, Categoria: ${product.category}</span> <button class="btnAddToCart">ADD TO CART</button><span id="msg${id_cont}"></span>`;
//           prodCont.appendChild(productEl);
//           const btnAddToCart = productEl.querySelector(".btnAddToCart");
//           asignEventAddToCart(btnAddToCart, product._id, id_cont);
//           id_cont++;
//         });
//       } else {
//         const errorMessage = document.createElement("p");
//         errorMessage.textContent = data.msg;
//         document.body.appendChild(errorMessage);
//       }
//     })
//     .then(() => {
//       const btnToCart = document.querySelector("#toCart");
//       btnToCart.addEventListener("click", () => {
//         window.location.href = "/api/views/cart";
//         LoadPage();
//       });
//       console.log(btnToCart);
//       const btnLogout = document.querySelector("#logout");
//       btnLogout.addEventListener("click", async () => {
//         await fetch("/api/auth/logout");
//         window.location.href = "/views/login";
//         console.log("first");
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }

// function asignEventAddToCart(btnDivGame, data, id_cont) {
//   btnDivGame.addEventListener("click", () => {
//     addToCart(data, id_cont);
//   });
// }

// function addToCart(data, id_cont) {
//   fetch(`/api/cart/addProdToCart/65db98aa1fe1ebdacd370877/${data}`, {
//     method: "PUT",
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       const msgSpan = document.getElementById(`msg${id_cont}`);
//       if (data.msg === "Producto agregado con éxito al carrito") {
//         msgSpan.textContent = "Producto agregado al carrito";
//       } else msgSpan.textContent = "Error al agregar producto al carrito";

//       setTimeout(() => {
//         msgSpan.textContent = "";
//       }, 3000);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }
// function delFromCart(data) {
//   fetch(`/api/cart/65db98aa1fe1ebdacd370877/products/${data}`, {
//     method: "DELETE",
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     });
// }
