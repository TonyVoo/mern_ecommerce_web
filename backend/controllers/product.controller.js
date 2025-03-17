import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { name, image, price, category, stock, description } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, image, price, category, stock, description },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const searchProduct = async (req, res) => {
    try {
        const query = req.query.q;
        const products = await Product.find({ name: { $regex: query, $options: "i" } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category; 
        const products = await Product.find({ category: category });

        if (!products.length) {
            return res.status(404).json({ message: "No products found in this category" });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching category products:", error);
        res.status(500).json({ error: "Server error" });
    }
};