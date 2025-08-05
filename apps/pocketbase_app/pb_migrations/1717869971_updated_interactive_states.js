/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6egrasxpr8ebdn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nxnhc6cb",
    "name": "state",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "active",
        "focus",
        "hover",
        "selected",
        "down",
        "drag",
        "disabled"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b6egrasxpr8ebdn")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nxnhc6cb",
    "name": "field",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "active",
        "focus",
        "hover",
        "selected",
        "down",
        "drag",
        "disabled"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
