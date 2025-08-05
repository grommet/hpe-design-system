/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "al9xqu3olvhkiof",
    "created": "2024-06-08 18:01:52.066Z",
    "updated": "2024-06-08 18:01:52.066Z",
    "name": "data_states",
    "type": "base",
    "system": false,
    "schema": [
      {
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
  const collection = dao.findCollectionByNameOrId("al9xqu3olvhkiof");

  return dao.deleteCollection(collection);
})
