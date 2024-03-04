import { uploads } from "../middlewares/filesUploads/localimage.js"

export default (router) => {
  router.route('/singleupload').post(uploads.single('image'), (req, res) =>{
    console.log(req.file)
    res.send("file uploaded")
  })

  router.route("/multipleupload").post(uploads.array('images', 4), (req, res) => {
    console.log(req.files)
    res.send("multiple files uploaded")
  })
}

