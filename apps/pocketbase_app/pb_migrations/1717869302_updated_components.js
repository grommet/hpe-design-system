/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f7phrvgb2ylrzp4")

  // remove
  collection.schema.removeField("rzdih8oq")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f7phrvgb2ylrzp4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rzdih8oq",
    "name": "anatomy",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "x3lh0egzphm8ec2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
