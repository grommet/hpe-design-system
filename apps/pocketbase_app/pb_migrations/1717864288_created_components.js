/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "f7phrvgb2ylrzp4",
    "created": "2024-06-08 16:31:28.901Z",
    "updated": "2024-06-08 16:31:28.901Z",
    "name": "components",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tckvrhkt",
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
        "id": "dcckipvt",
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
        "id": "ohtqklda",
        "name": "state",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Requested",
            "In review",
            "Published"
          ]
        }
      },
      {
        "system": false,
        "id": "hfnvd7fh",
        "name": "status",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Good",
            "Warning",
            "Critical"
          ]
        }
      },
      {
        "system": false,
        "id": "fyw3mwes",
        "name": "keywords",
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
  const collection = dao.findCollectionByNameOrId("f7phrvgb2ylrzp4");

  return dao.deleteCollection(collection);
})
