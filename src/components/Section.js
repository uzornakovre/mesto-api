export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer,
    this._container = containerSelector;
  }

  renderItems(cards) {
    cards.forEach((card) => {
      this._card = this._renderer(card);
      this._addItemReversed(this._card);
    });
  }

  addItem(card) {
    this._container.prepend(card);
  }

  _addItemReversed(card) {
    this._container.append(card);
  }
}