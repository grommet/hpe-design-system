/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpikqfynzk2dkea")

  collection.options = {
    "query": "SELECT \n  feature_adoptions.id, \n  feature_adoptions.team,\n  teams.team AS team_name,\n  teams.role AS team_role,\n  adoption_levels.level,\n  features.category,\n  features.feature,\n  feature_adoptions.adopted\nFROM\n  feature_adoptions\nLEFT JOIN\n  teams ON teams.id=feature_adoptions.team,\n  features ON features.id=feature_adoptions.feature,\n  adoption_levels ON adoption_levels.id=features.adoption_level\n;"
  }

  // remove
  collection.schema.removeField("fh6llwda")

  // remove
  collection.schema.removeField("pyieuarf")

  // remove
  collection.schema.removeField("6jqjbnjc")

  // remove
  collection.schema.removeField("9a3ruprv")

  // remove
  collection.schema.removeField("n2eemhvu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "crffvadn",
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
    "id": "7qepbh1m",
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
    "id": "nebd32u1",
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
    "id": "pxogxpmt",
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
    "id": "6ylxl49w",
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
    "id": "sbcngxvs",
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
    "id": "skbtxhsb",
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
    "query": "SELECT \n  feature_adoptions.id, \n  feature_adoptions.team,\n  teams.team AS team_name,\n  teams.role AS team_role,\n  adoption_levels.level,\n  features.category\nFROM\n  feature_adoptions\nLEFT JOIN\n  teams ON teams.id=feature_adoptions.team,\n  features ON features.id=feature_adoptions.feature,\n  adoption_levels ON adoption_levels.id=features.adoption_level\n;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fh6llwda",
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
    "id": "pyieuarf",
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
    "id": "6jqjbnjc",
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
    "id": "9a3ruprv",
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
    "id": "n2eemhvu",
    "name": "category",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("crffvadn")

  // remove
  collection.schema.removeField("7qepbh1m")

  // remove
  collection.schema.removeField("nebd32u1")

  // remove
  collection.schema.removeField("pxogxpmt")

  // remove
  collection.schema.removeField("6ylxl49w")

  // remove
  collection.schema.removeField("sbcngxvs")

  // remove
  collection.schema.removeField("skbtxhsb")

  return dao.saveCollection(collection)
})
