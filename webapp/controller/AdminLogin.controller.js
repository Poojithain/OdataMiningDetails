sap.ui.define([
    "./BaseController"
  ], (BaseController) => {
    "use strict";
  
    return BaseController.extend("app.miningdetails.controller.AdminLogin", {
        onInit() {
        },
        onAdminLogin:function(){
            var sAdminId = this.getView().byId('idAdID').getValue()
                 sAdminId=sAdminId.toUpperCase()
            var sUserName = this.getView().byId('idAdUserName').getValue()
            var sEmail    =  this.getView().byId('idAdEma').getValue()
            var sPassword = this.getView().byId('idAdPass').getValue()

            var validAdminId='AD837'
            var validUserName = "Poojitha"
            var validEmail = 'mule.poojitha@gmail.com'
            var validPassword = 'pooji@123'

            if(sAdminId===validAdminId && sUserName===validUserName && sEmail===validEmail && sPassword===validPassword){
                var oRouter=this.getRouter()
                oRouter.navTo('RouteMiningView')
            }else{
                sap.m.MessageToast.show('Inavalid credentials!Kindly try again')
            }
            // var oRouter=this.getRouter()
            // oRouter.navTo("RouteMiningView")
        }


    });
  });