/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpikqfynzk2dkea")

  collection.listRule = ""

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vbj3tm1o",
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
    "id": "nohosvn9",
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
    "id": "bqbnpezb",
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
    "id": "qgax2plq",
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
    "id": "xlgipz9i",
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
    "id": "egtry7dh",
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

  collection.listRule = null

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

  // remove
  collection.schema.removeField("vbj3tm1o")

  // remove
  collection.schema.removeField("nohosvn9")

  // remove
  collection.schema.removeField("bqbnpezb")

  // remove
  collection.schema.removeField("qgax2plq")

  // remove
  collection.schema.removeField("xlgipz9i")

  // remove
  collection.schema.removeField("egtry7dh")

  return dao.saveCollection(collection)
})
