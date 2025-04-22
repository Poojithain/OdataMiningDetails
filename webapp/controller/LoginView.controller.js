sap.ui.define([
    "./BaseController",

  ], (BaseController,UIComponent) => {
    "use strict";
  
    return BaseController.extend("app.miningdetails.controller.LoginView", {
        

      onInit() {
         this._getLoginDialog().open();
       },
        
        _getLoginDialog: function() {
       if (!this._loginDialog) {
        this._loginDialog = this.byId("loginDialog");
       }
        return this._loginDialog;
         },
        
    
   onUserLogin: function () {
  var oRouter=this.getRouter()
  oRouter.navTo("RouteUserLogin")
  },
    
  onAdminLogin: function () {
    var oRouter=this.getRouter()
    oRouter.navTo("RouteAdminLogin")
   }
    
    });
  });