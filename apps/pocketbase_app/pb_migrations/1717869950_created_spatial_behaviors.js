/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "yhqz0uhwkbnpaqr",
    "created": "2024-06-08 18:05:50.190Z",
    "updated": "2024-06-08 18:05:50.190Z",
    "name": "spatial_behaviors",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wopvutur",
        "name": "behavior",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "responsive",
            "overflow",
            "truncation"
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
  const collection = dao.findCollectionByNameOrId("yhqz0uhwkbnpaqr");

  return dao.deleteCollection(collection);
})
