/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f7phrvgb2ylrzp4")

  collection.viewRule = ""
  collection.createRule = ""
  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f7phrvgb2ylrzp4")

  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
