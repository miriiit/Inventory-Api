class Product {
    constructor(id, name, collection) {
        this.id         = id;
        this.name       = name;
        this.collection = collection;
    }
    
    get getId() {
        return this.id;
    }
    get getName(){
        return this.name;
    }
    get getColection(){
        return this.collection;
    }
  }

  module.exports = Product;