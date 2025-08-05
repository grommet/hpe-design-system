/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpikqfynzk2dkea")

  collection.options = {
    "query": "SELECT \n  feature_adoptions.id, \n  feature_adoptions.team,\n  teams.team AS team_name,\n  adoption_levels.level,\n  features.category,\n  features.feature,\n  feature_adoptions.adopted\nFROM\n  feature_adoptions\nLEFT JOIN\n  teams ON teams.id=feature_adoptions.team,\n  features ON features.id=feature_adoptions.feature,\n  adoption_levels ON adoption_levels.id=features.adoption_level\n;"
  }

  // remove
  collection.schema.removeField("reh6xk4e")

  // remove
  collection.schema.removeField("x9uvpzsw")

  // remove
  collection.schema.removeField("ayvicd6f")

  // remove
  collection.schema.removeField("umussq1p")

  // remove
  collection.schema.removeField("pppqeuqk")

  // remove
  collection.schema.removeField("7guavhfe")

  // remove
  collection.schema.removeField("eaugi4jm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fd2mlb8r",
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
    "id": "moojuzvm",
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
    "id": "ddbdds63",
    "name": "level",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pnapv7vd",
    "name": "category",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nkgx51qu",
    "name": "feature",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h11gmfln",
    "name": "adopted",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpikqfynzk2dkea")

  collection.options = {
    "query": "SELECT \n  feature_adoptions.id, \n  feature_adoptions.team,\n  teams.team AS team_name,\n  teams.role AS team_role,\n  adoption_levels.level,\n  features.category,\n  features.feature,\n  feature_adoptions.adopted\nFROM\n  feature_adoptions\nLEFT JOIN\n  teams ON teams.id=feature_adoptions.team,\n  features ON features.id=feature_adoptions.feature,\n  adoption_levels ON adoption_levels.id=features.adoption_level\n;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "reh6xk4e",
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
    "id": "x9uvpzsw",
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
    "id": "ayvicd6f",
    "name": "team_role",
    "type": "select",
    "required": false,
    "presentable": false,
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
    "id": "umussq1p",
    "name": "level",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pppqeuqk",
    "name": "category",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7guavhfe",
    "name": "feature",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eaugi4jm",
    "name": "adopted",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("fd2mlb8r")

  // remove
  collection.schema.removeField("moojuzvm")

  // remove
  collection.schema.removeField("ddbdds63")

  // remove
  collection.schema.removeField("pnapv7vd")

  // remove
  collection.schema.removeField("nkgx51qu")

  // remove
  collection.schema.removeField("h11gmfln")

  return dao.saveCollection(collection)
})
