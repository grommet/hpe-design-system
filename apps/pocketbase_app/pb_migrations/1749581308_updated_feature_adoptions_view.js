/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpikqfynzk2dkea")

  collection.options = {
    "query": "SELECT \n  feature_adoptions.id, \n  teams.team,\n  teams.role,\n  features.adoption_level, \n  features.category, \n  features.feature, \n  feature_adoptions.adopted\nFROM feature_adoptions\nLEFT JOIN \n  features ON feature_adoptions.feature=features.id\nLEFT JOIN teams ON feature_adoptions.team=teams.id;"
  }

  // remove
  collection.schema.removeField("h7s5iehv")

  // remove
  collection.schema.removeField("kiicamdn")

  // remove
  collection.schema.removeField("a7nj7rtt")

  // remove
  collection.schema.removeField("euyibmdc")

  // remove
  collection.schema.removeField("buoy1mot")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v6cark9r",
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
    "id": "jddnfiub",
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
    "id": "fqrx6ti5",
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
    "id": "nmmlzbvz",
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
    "id": "kdwmqmef",
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
    "id": "b3eiopez",
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
    "query": "SELECT \n  feature_adoptions.id, \n  teams.team,\n  features.adoption_level, \n  features.category, \n  features.feature, \n  feature_adoptions.adopted\nFROM feature_adoptions\nLEFT JOIN \n  features ON feature_adoptions.feature=features.id\nLEFT JOIN teams ON feature_adoptions.team=teams.id;"
  }

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "buoy1mot",
    "name": "adopted",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("v6cark9r")

  // remove
  collection.schema.removeField("jddnfiub")

  // remove
  collection.schema.removeField("fqrx6ti5")

  // remove
  collection.schema.removeField("nmmlzbvz")

  // remove
  collection.schema.removeField("kdwmqmef")

  // remove
  collection.schema.removeField("b3eiopez")

  return dao.saveCollection(collection)
})
