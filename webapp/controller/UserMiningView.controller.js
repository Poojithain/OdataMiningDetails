sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
     "sap/m/MessageBox"

  ], (BaseController,Filter,FilterOperator,MessageBox) => {
    "use strict";
  
    return BaseController.extend("app.miningdetails.controller.UserMiningView", {
        
   onInit: function () {
    
   

  var oUserModel = sap.ui.getCore().getModel("userModel");
  this.getView().setModel(oUserModel, "userModel");

    
    let oModel=this.getModel();
    let entity="/MINING_DATASet";
    oModel.read(entity,{
        success:(odata,resp)=>{
            let oModelJson=this.getOwnerComponent().getModel("MiningModel");
            oModelJson.setData(odata)
        },
        error:(error)=>{
            console.log(error)
        }
        
        
    })
   },
   onItemSelect:function(oEvent){

    var oList=oEvent.getParameter("listItem")
    let sPath=oList.getBindingContextPath("");
    let aItems=sPath.split("")
    let id=aItems[aItems.length-1]
    let oRouter=this.getOwnerComponent().getRouter()
    oRouter.navTo("RouteDetailView",{
        index:id
    })
},

onSearch:function(){
    let aFilter=[];
    let sFilTypMin =this.getView().byId("FilTypMinid").getValue();
    let sFilLoc=this.getView().byId("FilLocid").getValue();


    if(sFilTypMin){
        let filterMineral = new Filter("TypeMineral", FilterOperator.Contains, sFilTypMin)
        aFilter.push(filterMineral)
    }

    if (sFilLoc){
        let filterLocation = new Filter("LocationId", FilterOperator.Contains, sFilLoc )
        aFilter.push(filterLocation)
    }

    let oTable=this.getView().byId("idTab");
    let bindingInfo = oTable.getBinding("items");
    if (bindingInfo) {
        bindingInfo.filter(aFilter);
    }
},
    
    
    });
  });









