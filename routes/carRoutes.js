const express = require('express')
const router = express.Router()
const carController = require('../controllers/carController')
const { requireAuth } = require('../middleware/authMiddleware')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/cars/')
  },
  filename: function (req, file, cb) {
      const extname = path.extname(file.originalname)
      const filename = `${Date.now()}${extname}`
      cb(null, filename)
  }
})

const upload = multer({ storage: storage });

router.get('/cars', requireAuth, carController.car_list)
router.put('/cars/:id', requireAuth, carController.updateCar)
router.delete('/cars/:id', requireAuth, carController.deleteCar)
router.get('/create', requireAuth, carController.create_car_get)
router.post('/cars', requireAuth, upload.single('photo'), carController.create_car_post)


module.exports = router
