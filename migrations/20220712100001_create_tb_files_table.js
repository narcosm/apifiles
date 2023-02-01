exports.up = function(knex, Promise) {
    return knex.schema.createTable('tb_files', function(table) {
      table.increments();
      table.string('name')
      table.string('tp_mime')
      table.string('sha')
      table.string('size')
      table.string('location')
      table.string('mail')
      table.string('mails_users')
      table.string('state')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tb_files');
  }