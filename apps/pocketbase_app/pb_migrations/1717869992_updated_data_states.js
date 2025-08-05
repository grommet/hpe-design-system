/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("al9xqu3olvhkiof")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nwu76jp0",
    "name": "state",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "loading",
        "missing",
        "empty",
        "error",
        "has value"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("al9xqu3olvhkiof")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nwu76jp0",
    "name": "field",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "loading",
        "missing",
        "empty",
        "error",
        "has value"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
