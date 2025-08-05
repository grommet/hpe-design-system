/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpikqfynzk2dkea")

  collection.options = {
    "query": "SELECT \n  feature_adoptions.id, \n  feature_adoptions.team,\n  teams.team AS team_name,\n  teams.role AS team_role,\n  features.adoption_level\nFROM\n  feature_adoptions\nLEFT JOIN\n  teams ON teams.id=feature_adoptions.team,\n  features ON features.id=feature_adoptions.feature,\n  adoption_levels ON adoption_levels.id=features.adoption_level\n;"
  }

  // remove
  collection.schema.removeField("pbvvi3ko")

  // remove
  collection.schema.removeField("jz9vumbs")

  // remove
  collection.schema.removeField("jdx0n4cc")

  // remove
  collection.schema.removeField("r3ovh4ao")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j8bniyxf",
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
    "id": "qletqg8v",
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
    "id": "rbcrksbk",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c8ttu6vf",
    "name": "adoption_level",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpikqfynzk2dkea")

  collection.options = {
    "query": "SELECT \n  feature_adoptions.id, \n  feature_adoptions.team,\n  teams.team AS team_name,\n  teams.role AS team_role,\n  features.adoption_level\nFROM\n  feature_adoptions\nLEFT JOIN\n  teams ON teams.id=feature_adoptions.team,\n  features ON features.id=feature_adoptions.feature\n;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pbvvi3ko",
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
    "id": "jz9vumbs",
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
    "id": "jdx0n4cc",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r3ovh4ao",
    "name": "adoption_level",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("j8bniyxf")

  // remove
  collection.schema.removeField("qletqg8v")

  // remove
  collection.schema.removeField("rbcrksbk")

  // remove
  collection.schema.removeField("c8ttu6vf")

  return dao.saveCollection(collection)
})
