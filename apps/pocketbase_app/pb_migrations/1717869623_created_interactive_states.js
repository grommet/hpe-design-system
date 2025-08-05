/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "b6egrasxpr8ebdn",
    "created": "2024-06-08 18:00:23.544Z",
    "updated": "2024-06-08 18:00:23.544Z",
    "name": "interactive_states",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nxnhc6cb",
        "name": "field",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "active",
            "focus",
            "hover",
            "selected",
            "down",
            "drag",
            "disabled"
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
  const collection = dao.findCollectionByNameOrId("b6egrasxpr8ebdn");

  return dao.deleteCollection(collection);
})
