/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpikqfynzk2dkea")

  collection.options = {
    "query": "SELECT \n  feature_adoptions.id, \n  feature_adoptions.team\nFROM\n  feature_adoptions\n;"
  }

  // remove
  collection.schema.removeField("gytjxsoq")

  // remove
  collection.schema.removeField("j990h2gx")

  // remove
  collection.schema.removeField("381nbsk5")

  // remove
  collection.schema.removeField("i2qyf88b")

  // remove
  collection.schema.removeField("fyo2tvi8")

  // remove
  collection.schema.removeField("eyambsai")

  // remove
  collection.schema.removeField("xqc7nyux")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h5u5khh7",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpikqfynzk2dkea")

  collection.options = {
    "query": "SELECT \n  feature_adoptions.id, \n  teams.team,\n  teams.role,\n  features.adoption_level, \n  adoption_levels.level,\n  features.category, \n  features.feature, \n  feature_adoptions.adopted\nFROM feature_adoptions\nLEFT JOIN \n  features ON feature_adoptions.feature=features.id\nLEFT JOIN teams ON feature_adoptions.team=teams.id\nLEFT JOIN adoption_levels ON features.adoption_level=adoption_levels.id\n;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gytjxsoq",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j990h2gx",
    "name": "role",
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
    "id": "381nbsk5",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i2qyf88b",
    "name": "level",
    "type": "text",
    "required": true,
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
    "id": "fyo2tvi8",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eyambsai",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xqc7nyux",
    "name": "adopted",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("h5u5khh7")

  return dao.saveCollection(collection)
})
