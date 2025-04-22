sap.ui.define([
    "./BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("app.miningdetails.controller.AdminDetailView", {
        onInit() {
            let oRouter=this.getRouter()
            oRouter.attachRoutePatternMatched(this._onRouteMatched,this)
            

        },

        _onRouteMatched(oEvent){
            this.index=oEvent.getParameter("arguments").index
            let sPath="MiningModel>/results/"+this.index
            let oView=this.getView()
            oView.bindElement(sPath)
        },
        onUpdate:function(){
            let oRouter=this.getRouter()
            oRouter.navTo("RouteUpdateView",{
                indexUpdate:this.index
            })
        }
    });
});