/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "16eejb8ttbst7qt",
    "created": "2025-06-09 23:04:40.714Z",
    "updated": "2025-06-09 23:04:40.714Z",
    "name": "adoption_levels",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ofpfb6ul",
        "name": "level",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": "`^\\d+ - .+`"
        }
      },
      {
        "system": false,
        "id": "mikb4xul",
        "name": "description",
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
        "id": "aunfptc8",
        "name": "objective",
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
        "id": "rdu6ozfq",
        "name": "examples",
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
  const collection = dao.findCollectionByNameOrId("16eejb8ttbst7qt");

  return dao.deleteCollection(collection);
})
