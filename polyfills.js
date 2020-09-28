//bind


let me = {
    name:'neeti',
    myName(...args){
     console.log(this.name);
      console.log(...args);
    }
  }
  
  function myBind(context,...args){
    console.log('this1', this, context);
    let originalFunc = this;
    return function(...args2){
      originalFunc.call(context, ...args2, ...args);
    }
  }
  
  Function.prototype.myBind = myBind;
  
  
  console.log(me.myName());
  let myBindedFunc = me.myName.myBind({name:'shivangi'},20,'vns');
  console.log('myBindedFunc', myBindedFunc('js dev'));
  
  //call
  
  Function.prototype.myCall = myCall;
  function myCall(context,...args){
    return this.apply(context,args);
  }
  
  //apply
  
  Function.prototype.myApply = myApply;
  function myApply(context,...args){
    return this.call(context,...args);
  }
  
  
  
  console.log(me.myName());
  console.log('myCallFunc', me.myName.myCall({name:'shivangi'},25,'gurgaon'));
  console.log('myApplyFunc', me.myName.myApply({name:'shivangi upadhyay'},22,'lpu'));