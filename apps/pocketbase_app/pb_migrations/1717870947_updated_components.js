/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f7phrvgb2ylrzp4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rpsujcg7",
    "name": "use_cases",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "8oatau62xivvxsf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f7phrvgb2ylrzp4")

  // remove
  collection.schema.removeField("rpsujcg7")

  return dao.saveCollection(collection)
})
