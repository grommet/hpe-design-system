/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "jpikqfynzk2dkea",
    "created": "2025-06-10 18:47:32.729Z",
    "updated": "2025-06-10 18:47:32.729Z",
    "name": "feature_adoptions_view",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "h7s5iehv",
        "name": "team",
        "type": "text",
        "required": false,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "kiicamdn",
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
        "id": "a7nj7rtt",
        "name": "category",
        "type": "select",
        "required": false,
        "presentable": true,
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
        "id": "euyibmdc",
        "name": "feature",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "buoy1mot",
        "name": "adopted",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n  feature_adoptions.id, \n  teams.team,\n  features.adoption_level, \n  features.category, \n  features.feature, \n  feature_adoptions.adopted\nFROM feature_adoptions\nLEFT JOIN \n  features ON feature_adoptions.feature=features.id\nLEFT JOIN teams ON feature_adoptions.team=teams.id;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jpikqfynzk2dkea");

  return dao.deleteCollection(collection);
})
