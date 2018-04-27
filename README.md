# 09 Vanilla REST API w/ Persistence
**Author**: David Stoll
**Version**: 1.0.0 
## Learning Objectives

- Will learn how to save resource data to the file system for a layer of data persistence
- Will learn how to refactor commonly used coding constructs into custom helper modules

## Documentation

`router.post(/api/v1/food)` : Creates a new Food object, which is then stored via the `storage.create` function as JSON into the data/Food folder.

`router.get(/api/v1/food?id=id)` : Retrieves a single Food object using the unique id which was assigned. Pulls from JSON file located in data/Food folder..

`router.get(/api/v1/food)` : In theory, this will pull all Food objects out of the data/Food folder. Is buggy

`router.put(/api/v1/food)` : Updates a single Food object by running the `storage.update` function.

`router.delete(/api/v1/food?id=id)` : Deletes a single Food object from storage