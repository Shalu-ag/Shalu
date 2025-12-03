({
    createAccRecs: function(component, event, helper) {
       var accName = component.find("accName").get("v.value");
       var accPhone = component.find("accPhone").get("v.value");
       var accRating = component.find("accRating").get("v.value");
       console.log('accName'+accName);
       console.log('accPhone'+accPhone);
       console.log('accRating'+accRating)
       var action = component.get('c.createAccount');
       action.setParams({
        "accountName":accName,
        "accountPhone":accPhone,
        "accountRating":accRating
       });
       action.setCallback(this,function(accRec){
        var state = accRec.getState();
        if(state==='SUCCESS'){
            var accId = accRec.getReturnValue();
            alert("Account record created"+accId);
        }else{
            alert('error in getting data');
        }
       });
       $A.enqueueAction(action);

    }
})