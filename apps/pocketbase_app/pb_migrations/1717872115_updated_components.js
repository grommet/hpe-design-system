/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f7phrvgb2ylrzp4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bbrdt8gn",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "control",
        "data",
        "input",
        "layout",
        "visualization"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f7phrvgb2ylrzp4")

  // remove
  collection.schema.removeField("bbrdt8gn")

  return dao.saveCollection(collection)
})
