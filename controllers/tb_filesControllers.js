const { CREATED, BAD_REQUEST } = require('http-status-codes')

const { isValid } = require('../utils/validate')

const logger = require('../utils/logger')
const { tb_files } = require('../models')
const { uploadFile } = require('../utils/s3')
//const { localUp } = require('../utils/local')
const dbQueries = require('../utils/dbQueries')
const { TimestreamQuery } = require('aws-sdk')
const tb_filesController = module.exports
const log = logger.getLogger('tb_filesController')

tb_filesController.contarTb_files = async (req, res) => {

    let where = req.query
    if (Object.keys(where).length === 0) {
        where = {}
    }
    log.info(`contarTb_files ${JSON.stringify(where)} `)
    const tb_files = (await (dbQueries.select('tb_files', where))).length
    res.json(tb_files)
}

tb_filesController.listTb_files = async (req, res) => {

    let where = req.query
    if (Object.keys(where).length === 0) {
        where = {}
    }
    log.info(`listTb_files ${JSON.stringify(where)} `)
    const tb_files = await dbQueries.select('tb_files', where)
    res.json(tb_files)
}

tb_filesController.createTb_files = async (req, res) => {
    const { body } = req
    log.info(`createTb_files body=${JSON.stringify(body)} `)
    const errors = isValid(body, tb_files.tb_filesSchema)
    if (errors.length) {
        log.error(`createTb_files invalid body `)
        res.status(BAD_REQUEST).json({ error: errors })
    } else {
        const newItem = await dbQueries.insert('tb_files', body)
        log.info(`tb_files created with id=${newItem[0].id}`);
        res.status(201).json(newItem)
    }
}

tb_filesController.deleteTb_files = async (req, res) => {
    const { id } = req.query
    log.info(`deleteTb_files id=${id} `)
    const del = await dbQueries.delete('tb_files', id)
    res.json(del)
}

tb_filesController.updateTb_files = async (req, res) => {
    const { body } = req
    const { id } = req.query
    log.info(`updateTb_files id=${id} body=${JSON.stringify(body)}`)

    const errors = isValid(body, tb_files.tb_filesSchema)
    if (errors.length) {
        log.error(`updateTb_files invalid body `)
        res.status(400).json({ error: errors })
    }

    const upd = await dbQueries.update('tb_files', id, body)
    res.json(upd)
}

tb_filesController.createFiles = async (req, res) => {
    log.info('createFilesS3')

    if (req.files) {
        const file = req.files.file
        log.info(`upload file=${file.name}`)
        await file.mv(`./tmp/${file.name}`)
        const url = uploadFile(file.name)
        log.info(`upload file to s3=${url}`)
        res.json({ url: url })
    } else {
        log.error('file not found')
        res.status(400).json({ error: 'file_not_found' })
    }

}

tb_filesController.createFilesLocal = async (req, res) => {
    log.info('createFilesLocal')

    if (req.files) {

        const file = req.files.file
        log.info(`upload local file=${file.name}`)
        console.log("tamaño: " + file.size + " bytes");
        console.log("nombre: " + file.name);
        console.log("path: " + file.path);
        console.log("tipo mime: " + file.mimetype);
        console.log("destino: " + file.destination);
        console.log("buffer: " + file.buffer);
        console.log("stream: " + file.stream);
        console.log("originalname: " + file.originalname);
        console.log("fieldname: " + file.fieldname);

        await file.mv(`./tmp/${file.name}`)

        console.log("Entro para hash");
        const crypto = require("crypto");
        console.log("paso1");

        const fs = require("fs");
        console.log("paso2*");

        const fileBuffer = fs.readFileSync(`./tmp/${file.name}`);
        console.log("paso3");

        const hashSum = crypto.createHash('sha256');
        console.log("paso4");

        hashSum.update(fileBuffer);
        console.log("paso5");

        const hex = hashSum.digest('hex');
        console.log("paso6: ");

        console.log(hex);
        // const url = localUp(file.name)
        //  log.info(`upload file to s3=${url}`)
        res.json({
            fsize: file.size,
            fname: file.name,
            fpath: `./tmp/`,
            fmime: file.mimetype,
            foname: file.originalname,
            fsha: hex,
            url: `./tmp/${file.name}`
        })
    } else {
        log.error('file not found')
        res.status(400).json({ error: 'file_not_found' })
    }

}
