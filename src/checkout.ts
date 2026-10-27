// 订单结账模块：计算购物车总价、应用折扣、解析订单数据。

export interface CartItem {
  id: string;
  price: number;
  quantity: number;
}

export interface Discount {
  code: string;
  percent: number;
}

export class CheckoutService {
  private readonly taxRate: number;

  constructor(taxRate = 0.08) {
    this.taxRate = taxRate;
  }

  // 计算含税与折扣后的应付总额。
  calculateTotal(items: CartItem[], discount?: Discount): number {
    let subtotal = 0;
    for (const item of items) {
      subtotal += item.price * item.quantity;
    }

    let discountAmount = 0;
    if (discount) {
      discountAmount = subtotal * (discount.percent / 100);
    }

    const afterDiscount = subtotal - discountAmount;
    return afterDiscount + afterDiscount * this.taxRate;
  }

  // 计算购物车商品平均单价。
  averagePrice(items: CartItem[]): number {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return total / items.length;
  }
}

// 解析订单原始数据为购物车条目。
export function parseOrder(raw: any): CartItem {
  return {
    id: raw.id,
    price: raw.price,
    quantity: raw.quantity ?? raw.qty,
  };
}
