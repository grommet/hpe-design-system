/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "bt7x24bugw81qbt",
    "created": "2025-06-12 16:31:45.514Z",
    "updated": "2025-06-12 16:31:45.514Z",
    "name": "themes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "z1e6al1c",
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
  const collection = dao.findCollectionByNameOrId("bt7x24bugw81qbt");

  return dao.deleteCollection(collection);
})
