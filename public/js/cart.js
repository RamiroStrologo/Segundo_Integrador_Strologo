window.onload = LoadPageCart;

async function LoadPageCart() {
  let cartId;
  let response;
  let data;
  try {
    response = await fetch("/api/session/current");
    data = await response.json();
    cartId = data.cart;
    response = await fetch(`/api/cart/${cartId}`);
    data = await response.json();
    if (data.msg === "Carrito encontrado con éxito") {
      const cart = data.data.products;
      const cartCont = document.getElementById("cart_container");
      cart.forEach((cart) => {
        const cartEl = document.createElement("div");
        cartEl.innerHTML = `<span>Nombre: ${cart.product.title}, Descripción: ${cart.product.price}, Código: ${cart.product.code}, Precio: ${cart.product.price}, Estado: ${cart.product.status}, Stock: ${cart.product.stock}, Categoria: ${cart.product.category}</span><button class="btnDelFromCart">DELETE</button>`;
        cartCont.appendChild(cartEl);
        const btnDelFromCart = cartEl.querySelector(".btnDelFromCart");
        asignEventDelFromCart(btnDelFromCart, cart.product._id, cartId);
      });
    } else {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = data.msg;
      document.body.appendChild(errorMessage);
    }
  } catch (err) {
    console.error(err);
  }
}
const btnToProd = document.querySelector("#toProd");
btnToProd.addEventListener("click", () => {
  window.location.href = "/views/products";
});

function asignEventDelFromCart(btnDivGame, data) {
  btnDivGame.addEventListener("click", () => {
    delFromCart(data, cartId);
  });
}
function delFromCart(data, cartId) {
  fetch(`/api/cart/${cartId}/products/${data}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
