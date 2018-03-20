
// register
Vue.component('mycomponent', {
  data(){ 
    return{
    title: "Some Operations",
    products:[],
    newProduct:{description:"",price: "",checked: false}
    }
  },
  methods:{
    addTask: function(){
      this.products.push({
        description: this.newProduct.description,
        price: this.newProduct.price,
        checked: this.newProduct.checked
      });
      this.clearNewProduct();
    },
    clearNewProduct: function(){
        this.newProduct.description = "";
        this.newProduct.price = "";
        this.newProduct.checked = false;
    },
    deleteProduct: function(item){
      var i = this.products.indexOf(item);
      if(i != -1) {
        this.products.splice(i, 1);
      }
    },
    deleteAllProducts: function(){
      this.products.splice(0,this.products.length);
    },
    deleteSelectedProducts: function(){
      var length=this.products.length;
      for(var i=0;i<this.products.length;i++){
        if(this.products[i].checked){
          this.products.splice(i--,1);
        }
      }
    },
    toggleSelected(item){
      var i = this.products.indexOf(item);
      this.products[i].checked=this.products[i].checked?false:true;
    }
  }
})

var vm = new Vue({
 el:'#root'
});

