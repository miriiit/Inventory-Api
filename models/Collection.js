class Collection {
    constructor(id, name) {
        this.id     = id;
        this.name   = name;
    }
    
    get getId() {
        return this.id;
    }
    get getName(){
        return this.name;
    }
  }

  module.exports = Collection;