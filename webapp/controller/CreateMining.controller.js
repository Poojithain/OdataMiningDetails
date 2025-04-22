sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"

], (BaseController,MessageBox) => {
    "use strict";

    return BaseController.extend("app.miningdetails.controller.CreateMining", {
        onInit() {
           
        },
        onSubmit:function(){

            let oLocId = this.getView().byId("idLocCr")
            let oLocDes = this.getView().byId("idLocDesCr")
            let oMinRes = this.getView().byId("idMinResCr")
            let oTotCos = this.getView().byId("idTotCos")
            let oRepMin = this.getView().byId("idRepMin")
            let oNumDri = this.getView().byId("idNumDri")
            let oTypMin = this.getView().byId("idTypMin")
            let oCur    = this.getView().byId("idCur")


            let sLocId = oLocId.getValue()
                sLocId = sLocId.toUpperCase()
            let sLocDes = oLocDes.getValue()
            let sMinRes = oMinRes.getValue()
            let sTotCos = oTotCos.getValue()
            let sRepMin = oRepMin.getValue()
            let sNumDri = parseInt(oNumDri.getValue(), 10);  
            let sTypMin = oTypMin.getValue()
            let sCur    = oCur.getValue()


            let payload={
                "LocationId":sLocId,
                "LocationDesc":sLocDes,
                "MiningResource":sMinRes,
                "TotalCost":sTotCos,
                "ReportMineral":sRepMin,
                "NumDrills":sNumDri,
                "TypeMineral":sTypMin,
                "Currency":sCur
            }

            let that=this
            let oModel=this.getOwnerComponent().getModel()
            let entity="/MINING_DATASet"

            oModel.create(entity,payload,{
                success:function(){
                    MessageBox.success("Record Inserted",{
                        onClose:function(){
                            let oRouter=that.getRouter()
                            oRouter.navTo("RouteMiningView")

                        }.bind(that)
                    })
                },
                error:function(){
                    MessageBox.error("Record failed")
                }

            })

        }
        
    
    });
});