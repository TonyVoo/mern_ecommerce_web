import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
    try {
        const { items, total, shippingAddress, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "No items in order" });
        }
        
        const userId = req.user._id; 
        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const newOrder = new Order({
            userId, 
            items: items.map(item => ({
                productId: item.productId, 
                name: item.name, 
                price: item.price, 
                quantity: item.quantity,
            })),
            totalAmount: total, 
            shippingAddress, 
            paymentMethod, 
            orderStatus: "Pending",
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });

    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ error: "Error placing order" });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).populate("items.productId", "name price image");
        res.status(200).json(orders);
    } catch (error) {
        console.error("Get Orders Error:", error);
        res.status(500).json({ error: "Error fetching orders" });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("userId", "name email");
        res.status(200).json(orders);
    } catch (error) {
        console.error("Get All Orders Error:", error);
        res.status(500).json({ error: "Error fetching orders" });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.orderId, { orderStatus }, { new: true });

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error("Update Order Error:", error);
        res.status(500).json({ error: "Error updating order status" });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.orderId);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted" });
    } catch (error) {
        console.error("Delete Order Error:", error);
        res.status(500).json({ error: "Error deleting order" });
    }
};
