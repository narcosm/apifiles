const tb_filesSchema = {
    'id': '/tb_filesSchema',
    'type': 'object',
    'properties': {
        'name': { 'type': 'string' },
        'tp_mime': { 'type': 'string' },
        'sha': { 'type': 'string' },
        'size': { 'type': 'string' },
        'location': { 'type': 'string' },
        'mails': { 'type': 'string' },
        'mail_user': { 'type': 'string' },
    },
    'required': []
};


module.exports = {
    tb_filesSchema
}
