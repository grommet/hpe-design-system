/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lezx2z6vfw4xo76")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zscrpjft",
    "name": "adopted_code",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3jbt6j0p",
    "name": "adopted_design",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lezx2z6vfw4xo76")

  // remove
  collection.schema.removeField("zscrpjft")

  // remove
  collection.schema.removeField("3jbt6j0p")

  return dao.saveCollection(collection)
})
