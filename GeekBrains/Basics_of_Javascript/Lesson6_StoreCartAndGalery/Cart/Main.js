const cartList = document.getElementById("CartList");
const cartSum = document.getElementById("CartSum");
const stockList = document.getElementById("StockList");

const createButton = (onClick, placeholder) => {
  const button = document.createElement("button");
  button.textContent = placeholder;
  button.addEventListener("click", onClick);
  return button;
};

const createPlaceholder = (text, className) => {
  const element = document.createElement("div");
  element.className = className;
  element.innerText = text;
  return element;
};

const ELEMENTS_FIELDS_CLASS_NAMES = {
  productName: "name",
  productPrice: "price",
  goodsCount: "count",
};

const STOCK = [
  { name: "Tshirt", price: 100 },
  { name: "Toy", price: 10 },
  { name: "Bred", price: 2 },
  { name: "Machine", price: 10000 },
];

class Goods {
  constructor(product) {
    this.name = product.name;
    this.price = product.price;
    this.count = 1;
    this.onAddedSubscribers = [];
  }

  onAdded() {
    for (const subscriber of this.onAddedSubscribers) {
      subscriber(this);
    }
  }

  isProductSame(product) {
    return this.name === product.name;
  }

  appendProduct() {
    this.count += 1;
    this.onAdded(this.count);
  }
}

class StockItemPresenter {
  constructor(product) {
    const element = document.createElement("li");

    element.appendChild(createButton(this.onBuy.bind(this), "BUY"));
    element.appendChild(createPlaceholder(product.name, ELEMENTS_FIELDS_CLASS_NAMES.productName));
    element.appendChild(createPlaceholder(product.price, ELEMENTS_FIELDS_CLASS_NAMES.productPrice));

    this.currentProduct = product;

    this.onBuySubscribers = [];
    this.presenter = element;
  }

  onBuy() {
    for (const subscriber of this.onBuySubscribers) {
      subscriber(this.currentProduct);
    }
  }
}

class CartItemPresenter {
  constructor(goods) {
    const element = document.createElement("li");
    element.appendChild(createPlaceholder(goods.name, ELEMENTS_FIELDS_CLASS_NAMES.productName));
    element.appendChild(createPlaceholder(goods.price, ELEMENTS_FIELDS_CLASS_NAMES.productPrice));
    this.countPlaceholder = createPlaceholder(goods.count, ELEMENTS_FIELDS_CLASS_NAMES.goodsCount);
    element.appendChild(this.countPlaceholder);
    this.currentGoods = goods;

    goods.onAddedSubscribers.push(this.updateState.bind(this));

    this.presenter = element;
  }

  updateState(goods) {
    this.countPlaceholder.innerText = goods.count;
  }
}

const CART = {
  list: [],
  fullPrice: 0,
  onAddedSubscribers: [],
  onFullPriceChangedSubscribers: [],

  onAdded: function (goods) {
    if (goods === undefined) return;
    for (const subscriber of this.onAddedSubscribers) {
      subscriber(goods);
    }
    this.fullPrice += goods.price;
    this.onFullPriceChanged();
  },
  onFullPriceChanged: function () {
    for (const subscriber of this.onFullPriceChangedSubscribers) {
      subscriber(this.fullPrice);
    }
  },

  push: function (product) {
    const existedProduct = this.list.find(function (element) {
      if (element.isProductSame(product)) return element;
      return undefined;
    });
    if (existedProduct != undefined) {
      existedProduct.appendProduct();
      this.fullPrice += product.price;
      this.onFullPriceChanged();
    } else {
      const newGoods = new Goods(product);
      this.list.push(newGoods);
      this.onAdded(newGoods);
    }
  },

  subscribeToOnAdded: function (subscriber) {
    this.onAddedSubscribers.push(subscriber);
  },

  subscribeToOnFullPriceChanged: function (subscriber) {
    this.onFullPriceChangedSubscribers.push(subscriber);
  },
};

const buy = (product) => {
  if (product === undefined) return;
  CART.push(product);
};

const fillStock = (stock, toList) => {
  for (const product of stock) {
    const component = new StockItemPresenter(product);
    component.onBuySubscribers.push(buy);
    toList.appendChild(component.presenter);
  }
};

const addGoodsComponentToCartView = (goods) => {
  if (goods === undefined) return;

  const component = new CartItemPresenter(goods);
  cartList.appendChild(component.presenter);
};

const updateTotalOnCartFullPriceChanged = (fullPrice) => {
  cartSum.innerText = fullPrice;
};

fillStock(STOCK, stockList);
cartSum.innerText = CART.fullPrice;
CART.subscribeToOnAdded(addGoodsComponentToCartView);
CART.subscribeToOnFullPriceChanged(updateTotalOnCartFullPriceChanged);
