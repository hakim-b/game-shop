import "./style.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import van from "vanjs-core";
import "iconify-icon";
import Game from "./classes/Game";
import { themeChange } from "theme-change";

themeChange();

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "CAD",
  style: "currency",
});

function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

const games = [
  new Game(
    "Cyberpunk 2077",
    "An open-world, futuristic RPG set in Night City, where players navigate the treacherous world of cyber-enhancements and corporate intrigue.",
    "/src/images/cp2077.jpg",
    49.99
  ),
  new Game(
    "Fallout: New Vegas",
    "A post-apocalyptic RPG that unfolds in the Mojave Wasteland, offering a rich, morally ambiguous narrative in the aftermath of nuclear devastation.",
    "/src/images/fallout_nv.jpg",
    9.99
  ),
  new Game(
    "The Legend of Zelda: Breath of the Wild",
    "A stunning, open-world adventure game that invites players to explore the magical land of Hyrule and defeat the evil Calamity Ganon.",
    "/src/images/tloz_botw.webp",
    45.99
  ),
  new Game(
    "Super Smash Bros. Ultimate",
    "A frenetic, crossover fighting game featuring an extensive roster of characters from various video game franchises.",
    "./src/images/ssbu.jpg",
    39.99
  ),
  new Game(
    "The Witcher 3: Wild Hunt",
    "An epic, dark fantasy RPG that follows Geralt of Rivia as he hunts monsters, navigates political intrigues, and searches for adopted daughter Ciri",
    "/src/images/tw3_ww.jpg",
    25.99
  ),
  new Game(
    "Red Dead Redemption II",
    "A breathtaking open-world Western adventure that immerses players in the waning days of the Wild West, following the outlaw Arthur Morgan and the Van der Linde gang.",
    "/src/images/rdr.jpg",
    40.99
  ),
];

const cart = new Set<Game>();

const total = () => {
  let sum = 0.0;

  cart.forEach((item) => {
    sum += item.price;
  });

  return sum;
};

const listRoot = document.getElementById("listRoot") as HTMLDivElement;
const tableRoot = document.createElement("div") as HTMLDivElement;
tableRoot.className = "overflow-x-auto";

const cartSize = document.getElementById("cartSize") as HTMLSpanElement;
const cartAmount = document.getElementById("cartAmount") as HTMLSpanElement;
const subTotal = document.getElementById("subTotal") as HTMLSpanElement;

const viewCart = document.getElementById("viewCart") as HTMLButtonElement;
const showList = document.getElementById("showList") as HTMLButtonElement;

const { button, div, figure, h2, img, p, tr, th, td, table, tbody, thead } =
  van.tags;

function renderCartTable() {
  tableRoot.innerHTML = "";

  const cartTableCells = Array.from(cart).map((game) => {
    return tr(
      th(game.id),
      td(game.title),
      td(game.desc),
      td(formatCurrency(game.price)),
      td(
        button(
          { class: "btn btn-error", onclick: () => removeFromCart(game) },
          "Remove"
        )
      )
    );
  });

  const cartTable = () =>
    table(
      { class: "table" },
      thead(
        tr(th("ID"), th("Name"), th("Description"), th("Price"), th("Actions"))
      ),
      tbody(cartTableCells)
    );

  van.add(tableRoot, cartTable);
}

function renderCards() {
  const cards = games.map((game) => {
    return div(
      { class: "card w-96 bg-base-100 shadow-xl" },
      figure(
        img({
          src: game.thumbnail,
          alt: game.title,
        })
      ),
      div(
        { class: "card-body" },
        h2(
          { class: "card-title" },
          game.title,
          div({ class: "badge badge-secondary" }, formatCurrency(game.price))
        ),
        p(game.desc),
        div(
          { class: "card-actions justify-end" },
          button(
            { class: "btn btn-primary", onclick: () => addToCart(game) },
            "Buy Now"
          )
        )
      )
    );
  });

  van.add(listRoot, cards);
}

function addToCart(game: Game) {
  if (games.includes(game)) {
    cart.add(game);
  }

  Toastify({
    text: `You have successfully added ${game.title} to cart!`,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "#36d399",
      borderRadius: "20px",
    },
  }).showToast();

  cartSize.innerText = cart.size.toString();
  cartAmount.innerText = `${cart.size} Item(s)`;
  subTotal.innerText = `Subtotal: ${formatCurrency(total())}`;
}

function removeFromCart(item: Game) {
  if (cart.has(item)) {
    cart.delete(item);
    cartSize.innerText = cart.size.toString();
    cartAmount.innerText = `${cart.size} Item(s)`;
    renderCartTable();
    subTotal.innerText = `Subtotal: ${formatCurrency(total())}`;
  }

  Toastify({
    text: `Removed ${item.title} from cart!`,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "#f87272",
      borderRadius: "20px",
    },
  }).showToast();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  cartSize.innerText = cart.size.toString();
  cartAmount.innerText = `${cart.size} Item(s)`;
  subTotal.innerText = `Subtotal: ${formatCurrency(total())}`;
});

viewCart.addEventListener("click", () => {
  listRoot.parentNode?.replaceChild(tableRoot, listRoot);
  renderCartTable();
});

showList.addEventListener("click", () => {
  tableRoot.parentNode?.replaceChild(listRoot, tableRoot);
});
