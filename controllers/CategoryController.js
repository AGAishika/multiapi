const CategoryModel = require("../models/Category");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dkqug51rv",
  api_key: "298748942386567",
  api_secret: "1lloUDb9GHLE86xZCkAeOe6x2Ro",
});

class CategoryController {
  static testcategory = async (req, res) => {
    try {
      res.send("Hello I am getUser Api");
    } catch (error) {
      console.log(error);
    }
  };

  static categoryinsert = async (req, res) => {
    try {
      console.log(req.body);
      const { name } = req.body;
      const image = req.files.image;
      console.log(image);

      const image_upload = await cloudinary.uploader.upload(
        image.tempFilePath,
        {
          folder: "categoryimageAPI",
        }
      );
      const result = new CategoryModel({
        name: name,
        image: {
          public_id: image_upload.public_id,
          url: image_upload.secure_url,
        },
      });
      await result.save();
      res.status(201).json({
        status: "success",
        message: "Items inserted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };
  static categorydisplay = async (req, res) => {
    try {
      const category = await CategoryModel.find();
      // res.send(category);
      res.status(201).json({
        status: "success",
        message: "successful",
        category,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static categoryview = async (req, res) => {
    try {
      const category = await CategoryModel.findById(req.params.id);
      res.status(201).json({
        status: "success",
        message: "successful",
        category,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static categoryupdate = async (req, res) => {
    try {
      if (req.files) {
        const category = await CategoryModel.findById(req.params.id);
        const imageid = category.image.public_id;
        // old image id
        // console.log(imageid);

        // now destroy old photo
        await cloudinary.uploader.destroy(imageid);
        const file = req.files.image;
        // image upload on cloudinary

        const imageupload = await cloudinary.uploader.upload(
          file.tempFilePath,
          {
            folder: "categoryimageAPI",
          }
        );
        var data = {
            name: req.body.name,
            image: {
                public_id: imageupload.public_id,
                url: imageupload.secure_url,
            },
        };
      }else{
        var data = {
            name: req.body.Category
        }
      }
      const result = await CategoryModel.findByIdAndUpdate(req.params.id, data);
        res.status(201).json({
          status: "updated",
          message: "succesfully updated",
        })
    } catch (error) {
      console.log(error);
    }
  };

  static categorydelete = async(req, res)=> {
    try{
        await CategoryModel.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: "deleted",
            message: "deleted succesfullyl"
        })
    }catch(error){
        console.log(error);
    }
  }
}
module.exports = CategoryController;
