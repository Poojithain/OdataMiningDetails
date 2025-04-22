sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
     "sap/m/MessageBox"
], (BaseController,Filter,FilterOperator,MessageBox) => {
    "use strict";

    return BaseController.extend("app.miningdetails.controller.MiningView", {
        onInit() {
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
        onCreate:function(){
            var oRouter=this.getRouter();
            oRouter.navTo("RouteCreateMiningView")
        },
        onItemSelect:function(oEvent){
             debugger
            var oList=oEvent.getParameter("listItem")
            let sPath=oList.getBindingContextPath("");
            let aItems=sPath.split("")
            let id=aItems[aItems.length-1]
            let oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteAdminDetailView",{
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

        onDelete:function(oEvent){
            let oContext = oEvent.getSource().getBindingContext("MiningModel").getObject();
            MessageBox.confirm("Are you sure?",{
                onClose:(choice)=>{
                    if(choice==='OK') {
                        this._onDeleteCall(oContext);
                    }
                }
            })

        },

        _onDeleteCall:function(parm){
            let key1=parm.LocationId;

            let oModel = this.getModel();
            let entity=`/MINING_DATASet(LocationId='${key1}')`;

            oModel.remove(entity,{
                success:(resp)=>{
                    MessageBox.success('Record Deleted',{
                        onClose:function(){
                            this.onInit()
                        }.bind(this)
                    });
                },
                error:(err)=>{
                    MessageBox.error("Deletion")
                }
            })
        }
    });
});