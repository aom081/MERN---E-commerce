const stripe = require("stripe");
const stripe = new stripe(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
    const cartItems = req.body.cart;
    const products = cartItems.map((item) => {
        return {
            ProductId: item.ProductId,
            quantity: item.quantity,
        }
    });

    const customer = await stripe.customers.create({
        metadata: {
            email: req.body.email.toString(),
            cart: JSON.stringify(products),
        }
    });

  const line_items = cartItems.map((item) => {
    return {
        "price_data": {
            "currency": "thb",
            "product_data": {
                "name": item.name,
            },
            "unit_amount": item.price * 100,
        },
        "quantity": item.quantity,
        };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "promptpay"],
    shipping_address_collection: {
      allowed_countries: ["TH"],
    },
    shipping_options: [
      {
        type: "fixed_amount",
        fixed_amount: {
          currency: "thb",
          amount: 0,
        },
        display_name: "Free Shipping",
        delivery_estimate: {
          minimum: {
            unit: "business_day",
            value: 5,
          },
          maximum: {
            unit: "business_day",
            value: 7,
          },
        },
      },
    ],
    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.BASE_URL}/checkout-success`,
    cancel_url: `${process.env.BASE_URL}/cart`,
  });
};
