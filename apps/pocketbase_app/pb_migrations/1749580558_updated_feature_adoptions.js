/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lezx2z6vfw4xo76")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "parkamhv",
    "name": "adopted",
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
  collection.schema.removeField("parkamhv")

  return dao.saveCollection(collection)
})
