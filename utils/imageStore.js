const path = require("path");
const handleImage = async (photo) => {
    try{
        const {image} = photo;
        const imageName = `${image.name.split(`${'.png' || '.jpg' || '.jpeg'}`)[0]}_${Date.now()}.${image.mimetype.split("/")[1]}`;
        image.mv(`uploads/${imageName}`, (err) => {
            if(err) console.log(err);
        });
        return imageName
    }catch(err){
        console.log(err);
        return false
    }
}
module.exports = handleImage