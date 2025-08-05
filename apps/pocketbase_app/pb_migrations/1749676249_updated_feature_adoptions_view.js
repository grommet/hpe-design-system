/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpikqfynzk2dkea")

  collection.options = {
    "query": "SELECT \n  feature_adoptions.id, \n  teams.team,\n  teams.role,\n  features.adoption_level, \n  adoption_levels.level,\n  features.category, \n  features.feature, \n  feature_adoptions.adopted\nFROM feature_adoptions\nLEFT JOIN \n  features ON feature_adoptions.feature=features.id\nLEFT JOIN teams ON feature_adoptions.team=teams.id\nLEFT JOIN adoption_levels ON features.adoption_level=adoption_levels.id\n;"
  }

  // remove
  collection.schema.removeField("ltojdh56")

  // remove
  collection.schema.removeField("kv5xg5jl")

  // remove
  collection.schema.removeField("c2k33nl6")

  // remove
  collection.schema.removeField("uqfeggwz")

  // remove
  collection.schema.removeField("zpnah1vb")

  // remove
  collection.schema.removeField("oci6cgmr")

  // remove
  collection.schema.removeField("so1vdkcm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k1mq7kvm",
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
    "id": "qvvxrb9z",
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
    "id": "n8hnbrty",
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
    "id": "3qeklhhu",
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
    "id": "m6upqm8e",
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
    "id": "t1zc3svi",
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
    "id": "aivigpsk",
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
    "query": "SELECT \n  feature_adoptions.id, \n  teams.team,\n  teams.role,\n  features.adoption_level, \n  adoption_levels.level,\n  features.category, \n  features.feature, \n  feature_adoptions.adopted\nFROM feature_adoptions\nLEFT JOIN \n  features ON feature_adoptions.feature=features.id\nLEFT JOIN teams ON feature_adoptions.team=teams.id\nLEFT JOIN adoption_levels ON features.adoption_level\n;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ltojdh56",
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
    "id": "kv5xg5jl",
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
    "id": "c2k33nl6",
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
    "id": "uqfeggwz",
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
    "id": "zpnah1vb",
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
    "id": "oci6cgmr",
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
    "id": "so1vdkcm",
    "name": "adopted",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("k1mq7kvm")

  // remove
  collection.schema.removeField("qvvxrb9z")

  // remove
  collection.schema.removeField("n8hnbrty")

  // remove
  collection.schema.removeField("3qeklhhu")

  // remove
  collection.schema.removeField("m6upqm8e")

  // remove
  collection.schema.removeField("t1zc3svi")

  // remove
  collection.schema.removeField("aivigpsk")

  return dao.saveCollection(collection)
})
