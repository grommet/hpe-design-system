/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "lbwzf9azfv24qjn",
    "created": "2024-06-08 18:27:25.268Z",
    "updated": "2024-06-08 18:27:25.268Z",
    "name": "resources",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hvfqjxmb",
        "name": "component",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "f7phrvgb2ylrzp4",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "oycm0lky",
        "name": "type",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "code",
            "design",
            "documentation"
          ]
        }
      },
      {
        "system": false,
        "id": "kmooxnk4",
        "name": "url",
        "type": "url",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
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
  const collection = dao.findCollectionByNameOrId("lbwzf9azfv24qjn");

  return dao.deleteCollection(collection);
})
