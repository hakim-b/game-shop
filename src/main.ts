import "./style.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import van from "vanjs-core";
import "iconify-icon";
import { Game } from "./types";

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "CAD",
  style: "currency",
});

function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

const games: Game[] = [
  {
    id: crypto.randomUUID(),
    price: 35.99,
    title: "Super Smash Bros. Ultimate",
    desc: "The biggest Super Smash Bros. game ever!",
    thumbnail: "/src/images/ssbu.jpg",
  },
  {
    id: crypto.randomUUID(),
    price: 39.99,
    title: "Cyberpunk 2077",
    desc: "Step into the shoes of V, a cyberpunk mercenary for hire and do what it takes to make a name for yourself in Night City, a megalopolis obsessed with power, glamour, and body modification. Legends are made here. What will yours be?",
    thumbnail: "/src/images/cp2077.jpg",
  },
  {
    id: crypto.randomUUID(),
    price: 25.99,
    title: "The Witcher 3: Wild Hunt",
    desc: "One of the most acclaimed RPGs of all time",
    thumbnail: "/src/images/tw3_ww.jpg",
  },
  {
    id: crypto.randomUUID(),
    price: 7.99,
    title: "Fallout: New Vegas",
    desc: "Battle your way across the heat-blasted Mojave Wasteland to the neon drenched Vegas Strip. Along the way you'll be introduced to a colorful cast of characters, factions, mutated creatures and much more.",
    thumbnail: "/src/images/fallout_nv.jpg",
  },
  {
    id: crypto.randomUUID(),
    price: 28.99,
    title: "The Legend of Zelda: Breath of the Wild",
    desc: "Forget everything you know about The Legend of Zelda games.",
    thumbnail: "/src/images/tloz_botw.webp",
  },
  {
    id: crypto.randomUUID(),
    price: 45.99,
    title: "Red Dead Redemption 2",
    desc: "America, 1899. The end of the Wild West era has begun.",
    thumbnail: "/src/images/rdr.jpg",
  },
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
      td(game.price),
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
          div({ class: "badge badge-secondary" }, game.price)
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
