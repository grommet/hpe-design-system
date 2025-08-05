/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "lezx2z6vfw4xo76",
    "created": "2025-06-10 18:25:41.944Z",
    "updated": "2025-06-10 18:25:41.944Z",
    "name": "feature_adoptions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "u6eihjmn",
        "name": "team",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "9haejkj8lqkwi2b",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "0ilcatx7",
        "name": "feature",
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("lezx2z6vfw4xo76");

  return dao.deleteCollection(collection);
})
