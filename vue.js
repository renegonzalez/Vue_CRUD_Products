Vue.component('title-component',{
  template:[
    '<div>',
      '<h1 class="text-center">{{ childtitle }} <button class="btn btn-secondary " type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Edit</button></h1> ',
      '<div class="collapse" id="collapseExample">',
        '<div class="card card-body">',
            '<div class="col-center">',
                '<div class="form-group">',
                  '<p>You can change the title </p><input type="text" v-model="childtitle"/>',
                '</div>',
              '</div>',
        '</div>',
      '</div>',
    '</div>'
  ].join(''),
  props: ['maintitle'],
  data() {
    return {
      childtitle: ''
    }
  },
  created() {
    this.childtitle = this.maintitle
  },
  watch: {
    childtitle() {
      this.$emit('titleUpdated', this.childtitle);
    }
  }
})

Vue.component('newItem-component',{
  template:[
    '<div class="jumbotron">',
      '<h4 class="text-center">New Item</h4>',
      '<div class="form-group">',
        '<label for="product">Product</label>',
        '<input type="text" v-model="description" name="product" id="product" class="float-right"/>',
      '</div>',
      '<div class="form-group">',
        '<label for="price">Price</label>',
        '<input type="text" v-model="price" number name="price" id="price" class="float-right"/>',
      '</div>',
      '<div class="btn-group float-right" role="group">',
        '<button type="button" v-on:click="emitNewItem" class="btn btn-secondary">Add Item <i class="fas fa-plus"></i></button>',
        '<button type="button" v-on:click="clearNewItem" class="btn btn-secondary">Clear Item <i class="fas fa-undo-alt"></i></button>',
      '</div>',
    '</div>'
  ].join(''),
  data: function () {
    return {
        description: null,
        price: null
    }
  },
  methods: {
    emitNewItem: function () {
        this.$emit('new', { description: this.description, price: this.price, checked: false });
        this.description = null;
        this.price = null;
    },
    clearNewItem: function(){
      this.description = "";
      this.price = "";
    }
  }
})

Vue.component('listItems-component',{
  template:[
    '<div>',
    '<h4 class="text-center">Items Saved</h4>',
      '<ul>',
        '<li v-for="item in mainitems" v-if="item" v-on:click="toggleSelected(item)" v-bind:class="{ \'selected\' : item.checked}">',
          '<p>{{ item.description }} - {{ item.price }} <button v-on:click.stop="deleteItem(item)" class="btn btn-secondary float-right"> <i class="fas fa-trash"></i></button></p>',
        '</li>',
      '</ul>',
      '<button v-if="mainitems && mainitems.length" v-on:click="deleteAll" class="btn btn-secondary float-right pad-left">Delete All <i class="fas fa-trash"></i></button>',
      '<button v-if="mainitems && mainitems.length" v-on:click="deleteSelected" class="btn btn-secondary float-right pad-left">Delete Selected <i class="fas fa-trash"></i></button>',
      '<div v-if="mainitems && !mainitems.length"><p class="text-center">Empty Cart</p></div>',
    '</div>'
  ].join(''),
  props: ['mainitems'],
  methods: {
    deleteItem: function (item) {
      this.$emit('deleteItem',item);
    },
    deleteAll: function(){
      this.$emit('deleteAll');
    },
    deleteSelected: function(){
      this.$emit('deleteSelected');
    },
    toggleSelected(item){
      this.$emit('toggleSelected',item);
    }
  }
})

var vm = new Vue({
 el:'#root',
 template: [
   '<div>',
    '<title-component v-bind:maintitle="title" @titleUpdated="updateTitle"></title-component>',
    '<div>',
      '<div class="row row-pad-top">',
        '<div class="offset-md-2 col-md-4">',
          '<newItem-component @new="addNewItem"></newItem-component>',
        '</div>',
        '<div class="offset-md-1 col-md-4">',
          '<listItems-component v-bind:mainitems="items" @deleteItem="deleteItem" @deleteAll="deleteAllItems" @deleteSelected="deleteSelectedItems" @toggleSelected="toggleSelected"></listItems-component>',
        '</div>',
      '</div>',
    '</div>',
  '</div>'
 ].join(''),
 data: {
     title: 'Some Operations',
     items: [
     { description: 'Design Patterns',price:'41',checked:false },
     { description: 'Clean Code',price:'29',checked:false },
     { description: 'Learning Vue.JS 2',price:'41',checked:false }
     ]
 },
 methods: {
    addNewItem: function (item) {
      this.items.push(item);
    },
    deleteItem: function(item){
      var i = this.items.indexOf(item);
      if(i != -1) {
        this.items.splice(i, 1);
      }
    },
    deleteAllItems: function(){
      this.items.splice(0,this.items.length);
    },
    deleteSelectedItems: function(){
      var length=this.items.length;
      for(var i=0;i<this.items.length;i++){
        if(this.items[i].checked){
          this.items.splice(i--,1);
        }
      }
    },
    toggleSelected(item){
      var i = this.items.indexOf(item);
      this.items[i].checked=this.items[i].checked?false:true;
    },
    updateTitle(newTitle){
      this.title = newTitle;
    }
 }
});

