sap.ui.define([
    "./BaseController"
], (BaseController) => {
    "use strict";

    return BaseController.extend("app.miningdetails.controller.UserLogin", {
        onInit() {

        },
        onUserLogin: function() {
            
// Retrieve the username from the input field
        let username = this.getView().byId('idUser').getValue();

      // Create a JSON model with the username
      var oUserModel = new sap.ui.model.json.JSONModel({
       username: username
      });
         sap.ui.getCore().setModel(oUserModel, "userModel");


            // Navigate to the UserMiningView
            var oRouter = this.getRouter();
            oRouter.navTo("RouteUserMiningView");
        }
    });
});
