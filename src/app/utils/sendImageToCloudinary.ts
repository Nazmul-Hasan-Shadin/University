import { rejects } from 'assert'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import config from '../config'

import fs from 'fs'
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret, // Click 'View API Keys' above to copy your API secret
})

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
):Promise<Record<string,unknown>> => {
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch((error) => {
      console.log(error)
    })

  fs.unlink(path, (err) => {
    if (err) {
        console.log(err);
        
    } else {
      console.log('file is deleted')
    }
  })

  console.log(uploadResult)

  return uploadResult
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

export const upload = multer({ storage: storage })
