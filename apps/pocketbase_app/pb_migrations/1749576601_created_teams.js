/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "9haejkj8lqkwi2b",
    "created": "2025-06-10 17:30:01.451Z",
    "updated": "2025-06-10 17:30:01.451Z",
    "name": "teams",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "72tzimvt",
        "name": "team",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "acev0kir",
        "name": "role",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "design",
            "code"
          ]
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
  const collection = dao.findCollectionByNameOrId("9haejkj8lqkwi2b");

  return dao.deleteCollection(collection);
})
