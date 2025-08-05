/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpikqfynzk2dkea")

  collection.options = {
    "query": "SELECT \n  feature_adoptions.id, \n  feature_adoptions.team,\n  teams.team AS team_name,\n  adoption_levels.level,\n  features.category,\n  features.feature,\n  feature_adoptions.adopted,\n  feature_adoptions.design_figma,\n  feature_adoptions.code_design_tokens,\n  feature_adoptions.code_grommet\nFROM\n  feature_adoptions\nLEFT JOIN\n  teams ON teams.id=feature_adoptions.team,\n  features ON features.id=feature_adoptions.feature,\n  adoption_levels ON adoption_levels.id=features.adoption_level\n;"
  }

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sl6sthat",
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
    "id": "v5pq5yn7",
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
    "id": "irmfn6ij",
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
    "id": "lmuabbys",
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
    "id": "liokdrw0",
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
    "id": "bdb96mbv",
    "name": "adopted",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sellri8l",
    "name": "design_figma",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2pfofznq",
    "name": "code_design_tokens",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dwsletgo",
    "name": "code_grommet",
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
    "query": "SELECT \n  feature_adoptions.id, \n  feature_adoptions.team,\n  teams.team AS team_name,\n  adoption_levels.level,\n  features.category,\n  features.feature,\n  feature_adoptions.adopted\nFROM\n  feature_adoptions\nLEFT JOIN\n  teams ON teams.id=feature_adoptions.team,\n  features ON features.id=feature_adoptions.feature,\n  adoption_levels ON adoption_levels.id=features.adoption_level\n;"
  }

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

  // remove
  collection.schema.removeField("sl6sthat")

  // remove
  collection.schema.removeField("v5pq5yn7")

  // remove
  collection.schema.removeField("irmfn6ij")

  // remove
  collection.schema.removeField("lmuabbys")

  // remove
  collection.schema.removeField("liokdrw0")

  // remove
  collection.schema.removeField("bdb96mbv")

  // remove
  collection.schema.removeField("sellri8l")

  // remove
  collection.schema.removeField("2pfofznq")

  // remove
  collection.schema.removeField("dwsletgo")

  return dao.saveCollection(collection)
})
