/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("58ncbi9b0mjb0p8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e4o9g0fn",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kqkptzrc",
    "name": "adoption_level",
    "type": "relation",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "collectionId": "16eejb8ttbst7qt",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dtshaq15",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("58ncbi9b0mjb0p8")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e4o9g0fn",
    "name": "feature",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kqkptzrc",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dtshaq15",
    "name": "category",
    "type": "select",
    "required": false,
    "presentable": false,
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

  return dao.saveCollection(collection)
})
