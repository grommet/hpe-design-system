/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpikqfynzk2dkea")

  collection.options = {
    "query": "SELECT \n  feature_adoptions.id, \n  feature_adoptions.team,\n  teams.team AS team_name,\n  teams.role AS team_role\nFROM\n  feature_adoptions\nLEFT JOIN\n  teams ON teams.id=feature_adoptions.team\n;"
  }

  // remove
  collection.schema.removeField("yimh6voi")

  // remove
  collection.schema.removeField("xehowbok")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lu4tm7rt",
    "name": "team",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "9haejkj8lqkwi2b",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8xctbvsr",
    "name": "team_name",
    "type": "text",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0jak8403",
    "name": "team_role",
    "type": "select",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "design",
        "code"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpikqfynzk2dkea")

  collection.options = {
    "query": "SELECT \n  feature_adoptions.id, \n  feature_adoptions.team,\n  teams.team AS team_name\nFROM\n  feature_adoptions\nLEFT JOIN\n  teams ON teams.id=feature_adoptions.team\n;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yimh6voi",
    "name": "team",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "9haejkj8lqkwi2b",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xehowbok",
    "name": "team_name",
    "type": "text",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("lu4tm7rt")

  // remove
  collection.schema.removeField("8xctbvsr")

  // remove
  collection.schema.removeField("0jak8403")

  return dao.saveCollection(collection)
})
