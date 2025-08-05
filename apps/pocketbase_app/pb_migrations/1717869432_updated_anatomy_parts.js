/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x3lh0egzphm8ec2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pnciibyq",
    "name": "component",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "f7phrvgb2ylrzp4",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("x3lh0egzphm8ec2")

  // remove
  collection.schema.removeField("pnciibyq")

  return dao.saveCollection(collection)
})
