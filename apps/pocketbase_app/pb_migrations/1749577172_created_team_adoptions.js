/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "eegm7nmnqorip2b",
    "created": "2025-06-10 17:39:32.633Z",
    "updated": "2025-06-10 17:39:32.633Z",
    "name": "team_adoptions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qzmwkyzy",
        "name": "team",
        "type": "relation",
        "required": true,
        "presentable": true,
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
        "id": "6jh9nhnt",
        "name": "feature",
        "type": "relation",
        "required": true,
        "presentable": true,
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
  const collection = dao.findCollectionByNameOrId("eegm7nmnqorip2b");

  return dao.deleteCollection(collection);
})
