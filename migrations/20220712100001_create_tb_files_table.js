exports.up = function(knex, Promise) {
    return knex.schema.createTable('tb_files', function(table) {
      table.increments();
      table.string('name')
      table.string('tp_mime')
      table.string('sha')
      table.string('size')
      table.string('location')
      table.string('mails')
      table.string('mail_user')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tb_files');
  }