/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "58ncbi9b0mjb0p8",
    "created": "2025-06-09 23:21:03.546Z",
    "updated": "2025-06-09 23:21:03.546Z",
    "name": "features",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "e4o9g0fn",
        "name": "feature",
        "type": "text",
        "required": true,
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
        "id": "kqkptzrc",
        "name": "adoption_level",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "16eejb8ttbst7qt",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "dtshaq15",
        "name": "category",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "color",
            "typography",
            "iconography",
            "scale",
            "miscellaneous",
            "controls",
            "inputs",
            "layouts",
            "visualizations",
            "theme mode",
            "data collections",
            "data management",
            "data changed",
            "data states",
            "forms",
            "flows",
            "page templates",
            "page anatomy",
            "utility"
          ]
        }
      },
      {
        "system": false,
        "id": "ldxetru6",
        "name": "status",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "backlog",
            "feature requested",
            "in progress",
            "available"
          ]
        }
      },
      {
        "system": false,
        "id": "jahtqux6",
        "name": "design_token",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "lwfgiuoa",
        "name": "type",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "guidance",
            "specification",
            "pattern",
            "component"
          ]
        }
      },
      {
        "system": false,
        "id": "ow3r0eb9",
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
      },
      {
        "system": false,
        "id": "erhqioop",
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
  const collection = dao.findCollectionByNameOrId("58ncbi9b0mjb0p8");

  return dao.deleteCollection(collection);
})
