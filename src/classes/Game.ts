export default class Game {
  id: string;
  title: string;
  desc: string;
  thumbnail: string;
  price: number;
  constructor(title: string, desc: string, thumbnail: string, price: number) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    this.thumbnail = thumbnail;
    this.price = price;
  }
}
