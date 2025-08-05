/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "xv1kvkvqf1wz0i6",
    "created": "2024-06-08 18:18:58.577Z",
    "updated": "2024-06-08 18:18:58.577Z",
    "name": "options",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wpbd3knp",
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
        "id": "jiokauej",
        "name": "type",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "variant",
            "style",
            "size",
            "orientation",
            "state",
            "decoration"
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
  const collection = dao.findCollectionByNameOrId("xv1kvkvqf1wz0i6");

  return dao.deleteCollection(collection);
})
