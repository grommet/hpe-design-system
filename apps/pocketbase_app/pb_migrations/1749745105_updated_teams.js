/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9haejkj8lqkwi2b")

  // remove
  collection.schema.removeField("acev0kir")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9haejkj8lqkwi2b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "acev0kir",
    "name": "role",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "design",
        "code"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
