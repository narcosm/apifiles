const express = require('express')
const { OK } = require('http-status-codes')

const wrap = require('../wrap.js')
const { routers } = require('../constants')

const { tb_filesController } = require('../controllers')

const router = express.Router()

router.get(routers.FILES + "/contar", wrap(tb_filesController.contarTb_files))
router.get(routers.FILES, wrap(tb_filesController.listTb_files))
router.post(routers.FILES, wrap(tb_filesController.createTb_files))
router.post(routers.FILES + "/ups3", wrap(tb_filesController.createFilesS3))
router.post(routers.FILES + "/uplocal", wrap(tb_filesController.createFilesLocal))
router.put(routers.FILES, wrap(tb_filesController.updateTb_files))
router.delete(routers.FILES, wrap(tb_filesController.deleteTb_files))

router.get(routers.HEALTH, wrap(async (req, res) => {
  res.status(OK).json({ message: 'OK' })
}))


module.exports = router
