/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4vfqa7vc0qhicbd",
    "created": "2024-06-08 18:09:13.544Z",
    "updated": "2024-06-08 18:09:13.544Z",
    "name": "animations",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xoempkmu",
        "name": "type",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "duration",
            "easing",
            "direction"
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
  const collection = dao.findCollectionByNameOrId("4vfqa7vc0qhicbd");

  return dao.deleteCollection(collection);
})
