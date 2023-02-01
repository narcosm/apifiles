const tb_filesSchema = {
    'id': '/tb_filesSchema',
    'type': 'object',
    'properties': {
        'name': { 'type': 'string' },
        'tp_mime': { 'type': 'string' },
        'sha': { 'type': 'string' },
        'size': { 'type': 'string' },
        'location': { 'type': 'string' },
        'mail': { 'type': 'string' },
        'mails_users': { 'type': 'string' },
        'state': { 'type': 'string' },
    },
    'required': ['name','tp_mime','sha', 'size', 'location', 'mail']
};


module.exports = {
    tb_filesSchema
}
