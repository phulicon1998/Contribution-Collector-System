const {cloudinary} = require("../utils/uploader");
const db = require("../model");

exports.getUploadData = async(req, res, next) => {
    try{
        if(req.files){
            const {images, words} = req.files;
            let imgList = [], wordList = [];
            if(images){
                for(let img of images){
                    let image = await cloudinary.v2.uploader.upload(img.path);
                    let uploadImg = {
                        link: image.secure_url,
                        cloudId: image.public_id
                    }
                    let createdImg = await db.Image.create(uploadImg);
                    imgList.push(createdImg._id);
                }
            }
            if(words){
                for(let wrd of words){
                    let word = await cloudinary.v2.uploader.upload(wrd.path, {resource_type: 'raw'});
                    let uploadWord = {
                        link: word.secure_url,
                        cloudId: word.public_id
                    }
                    let createdWord = await db.Word.create(uploadWord);
                    wordList.push(createdWord._id);
                }
            }
            req.body.image_id = imgList;
            req.body.word_id = wordList;
        }
        next();
    } catch(err) {
        return next(err);
    }
}
