/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "x3lh0egzphm8ec2",
    "created": "2024-06-08 16:39:09.670Z",
    "updated": "2024-06-08 16:39:09.670Z",
    "name": "anatomy_parts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yl8lemoh",
        "name": "name",
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
        "id": "bmsq1bvh",
        "name": "purpose",
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
        "id": "xteanzil",
        "name": "required",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("x3lh0egzphm8ec2");

  return dao.deleteCollection(collection);
})
