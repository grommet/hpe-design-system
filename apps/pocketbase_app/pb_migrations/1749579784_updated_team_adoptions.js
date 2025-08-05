/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eegm7nmnqorip2b")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ffmo0who",
    "name": "field",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "58ncbi9b0mjb0p8",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eegm7nmnqorip2b")

  // remove
  collection.schema.removeField("ffmo0who")

  return dao.saveCollection(collection)
})
