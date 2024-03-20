window.onload = LoadPageProducts();

function LoadPageProducts() {
  fetch("/api/products")
    .then((response) => response.json())
    .then((data) => {
      if (data.msg === "Productos obtenidos con exito") {
        const products = data.data.docs;
        const prodCont = document.getElementById("prod_container");
        let id_cont = 0;
        products.forEach((product) => {
          const productEl = document.createElement("div");
          productEl.innerHTML = `<span>Nombre: ${product.title}, Descripción: ${product.price}, Código: ${product.code}, Precio: ${product.price}, Estado: ${product.status}, Stock: ${product.stock}, Categoria: ${product.category}</span> <button class="btnAddToCart">ADD TO CART</button><span id="msg${id_cont}"></span>`;
          prodCont.appendChild(productEl);
          const btnAddToCart = productEl.querySelector(".btnAddToCart");
          asignEventAddToCart(btnAddToCart, product._id, id_cont);
          id_cont++;
        });
      } else {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = data.msg;
        document.body.appendChild(errorMessage);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
const btnToCart = document.querySelector("#toCart");
btnToCart.addEventListener("click", () => {
  window.location.href = "/views/cart";
});

const btnLogout = document.querySelector("#logout");
btnLogout.addEventListener("click", async () => {
  await fetch("/api/auth/logout");
  window.location.href = "/views/login";
  console.log("first");
});
function asignEventAddToCart(btnDivGame, data, id_cont) {
  btnDivGame.addEventListener("click", () => {
    addToCart(data, id_cont);
  });
}
function addToCart(data, id_cont) {
  fetch(`/api/cart/addProdToCart/65db98aa1fe1ebdacd370877/${data}`, {
    method: "PUT",
  })
    .then((response) => response.json())
    .then((data) => {
      const msgSpan = document.getElementById(`msg${id_cont}`);
      if (data.msg === "Producto agregado con éxito al carrito") {
        msgSpan.textContent = "Producto agregado al carrito";
      } else msgSpan.textContent = "Error al agregar producto al carrito";

      setTimeout(() => {
        msgSpan.textContent = "";
      }, 3000);
    })
    .catch((err) => {
      console.error(err);
    });
}
