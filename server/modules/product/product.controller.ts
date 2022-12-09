import Product from './product.model';
import { Response, Request } from 'express';

export const createProduct = async (req: Request, res: Response) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllProduts = async (req: Request, res: Response) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
