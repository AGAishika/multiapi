const ProductModel = require("../models/Product");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dkqug51rv",
  api_key: "298748942386567",
  api_secret: "1lloUDb9GHLE86xZCkAeOe6x2Ro",
});

class ProductController {
  static testproduct = async (req, res) => {
    try {
      res.send("hello product");
    } catch (error) {
      console.log(error);
    }
  };

  static productinsert = async (req, res) => {
    try {
      console.log(req.body);
      const { name, description, price, category, stock } = req.body;
      const { image } = req.files;

      const image_upload = await cloudinary.uploader.upload(
        image.tempFilePath,
        {
          folder: "productimage",
        }
      );
      const result = new ProductModel({
        name: name,
        description: description,
        price: price,
        category: category,
        stock: stock,
        image: {
          public_id: image_upload.public_id,
          url: image_upload.secure_url,
        },
      });
      await result.save();
      res.status(201).json({
        status: "inserted",
        message: "successfully inserted",
      });
    } catch (error) {
      console.log(error);
    }
  };

  static getallproduct = async(req, res)=> {
    try{
        const productalldata = await ProductModel.find();
        // res.send(productalldata);

        res.status(201).json({
          status: "success",
          message: "successful",
            productalldata,
        });
    }catch(error){
        console.log(error);
    }
  };

  static updateproductdata = async(req, res)=> {
    try{
        if(req.files){
            const product = await ProductModel.findById(req.params.id);
            const imageid = product.image.public_id;
            // console.log(imageid);

            // old file destroyed here
            await cloudinary.uploader.destroy(imageid);

            // now upload new file 
            const {image} = req.files.image;
            
            const imageupload = await cloudinary.uploader.upload(
                image.tempFilePath, 
                {
                    folder: "productimage",
                },
            );
            var data = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                stock: req.body.stock,
                image: {
                    public_id: image_upload.public_id,
                    url: imageupload.secure_url,
                },
            };
        }else{
            var data = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                stock: req.body.stock
            }
        }
        const result = await ProductModel.findByIdAndUpdate(req.params.id , data);
        // res.redirect('/');
        res.status(201).json({
            status: "updated", 
            message: "data updated successfully"
        });
    }
    catch(error){
        console.log(error)
    }
  };

  static getoneproduct = async(req, res) => {
    try{
        
        const Productdata = await ProductModel.findById(req.params.id);
        res.status(201).json({
            status: "found",
            message: "succesfully founded",
            Productdata,
        });
    }catch(error){
        console.log(error);
    }
  };

  static productdelete = async(req, res)=> {
    try{
        await ProductModel.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "deleted",
            message: "successfully deleted",
        })
    }catch(error){
        console.log(error);
    }
  };
}
module.exports = ProductController;
