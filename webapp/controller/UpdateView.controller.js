sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
], (BaseController,MessageBox) => {
    "use strict";

    return BaseController.extend("app.miningdetails.controller.UpdateView", {
        onInit() {
            let oRouter=this.getRouter()
            oRouter.attachRoutePatternMatched(this._onRouteMatched,this)
            

        },

        _onRouteMatched(oEvent){
            this.index=oEvent.getParameter("arguments").indexUpdate
            let sPath="MiningModel>/results/"+this.index
            let oView=this.getView()
            oView.bindElement(sPath)
        },
        onSubmit:function(){
            let oLocationId=this.getView().byId('idLocUp')
            let oLocationDesc=this.getView().byId('idLocDesUp')
            let oMiningResource=this.getView().byId('idMinResUp')
            let oTotalCost=this.getView().byId('idTotCosUp')
            let oReportMineral=this.getView().byId('idRepMinUp')
            let oNumDrills=this.getView().byId('idNumDriUp')
            let oTypeMineral=this.getView().byId('idTypMinUp')
            let oCurrency=this.getView().byId('idCurUp')

            let sLocationId=oLocationId.getValue()
            let sLocationDesc=oLocationDesc.getValue()
            let sMiningResource=oMiningResource.getValue()
            let sTotalCost=oTotalCost.getValue()
            let sReportMineral=oReportMineral.getValue()
            let sNumDrills = parseInt(oNumDrills.getValue(), 10);  
            let sTypeMineral  = oTypeMineral.getValue()
            let sCurrency=oCurrency.getValue()


            let payload={
                "LocationDesc":sLocationDesc,
                "MiningResource":sMiningResource,
                "TotalCost":sTotalCost,
                "ReportMineral":sReportMineral,
                "NumDrills":sNumDrills,
                "TypeMineral":sTypeMineral,
                "Currency":sCurrency

            }

            let that=this
            let oModel=this.getOwnerComponent().getModel()

            let entity=`/MINING_DATASet('${sLocationId}')`;

            oModel.update(entity,payload,{
                success:function(){
                    MessageBox.success("Record Inserted ",{
                        onClose:(resp)=>{
                            let oRouter=that.getRouter()
                            oRouter.navTo('RouteMiningView')
                        }
                    })
                },
                error:function(error){
                    MessageBox.error("Record update failed")
                }
            })



        }
    });
});