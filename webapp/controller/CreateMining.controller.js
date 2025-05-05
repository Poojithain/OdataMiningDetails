sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], (BaseController, MessageBox) => {
    "use strict";

    return BaseController.extend("app.miningdetails.controller.CreateMining", {
        onInit() {
          
        },
        onLiveChange: function(oEvent) {
            oEvent.getSource().setValueState("None");
        },
        onSubmit: function() {
            let oLocId = this.getView().byId("idLocCr");
            let oLocDes = this.getView().byId("idLocDesCr");
            let oMinRes = this.getView().byId("idMinResCr");
            let oTotCos = this.getView().byId("idTotCos");
            let oRepMin = this.getView().byId("idRepMin");
            let oNumDri = this.getView().byId("idNumDri");
            let oTypMin = this.getView().byId("idTypMin");
            let oSelect = this.getView().byId("idCur");

            let sLocId = oLocId.getValue().toUpperCase();
            let sLocDes = oLocDes.getValue();
            let sMinRes = oMinRes.getValue();
            let sTotCos = oTotCos.getValue();
            let sRepMin = oRepMin.getValue();
            let sNumDri = parseInt(oNumDri.getValue(), 10);
            let sTypMin = oTypMin.getValue();
            // let sCur = oCur.getValue();
            var sSelectedCurrency = oSelect.getSelectedKey();

            let data = [
                { input: oLocId, value: sLocId, message: "Enter Location Id" },
                { input: oLocDes, value: sLocDes, message: "Enter Location Description" },
                { input: oMinRes, value: sMinRes, message: "Enter Mineral Resources" },
                { input: oTotCos, value: sTotCos, message: "Enter Total Cost" },
                { input: oRepMin, value: sRepMin, message: "Enter Mineral Report" },
                { input: oNumDri, value: sNumDri, message: "Enter Number of Drills" },
                { input: oTypMin, value: sTypMin, message: "Enter Mineral Type" },
                { input: oSelect, value: sSelectedCurrency, message: "Enter Currency" }
            ];

            let isValid = true;

            data.forEach(item => {
                item.input.setValueState("None");
                if (!item.value) {
                    item.input.setValueState("Error");
                    item.input.setValueStateText(item.message);
                    isValid = false;
                }
            });

            if (!isValid) {
                MessageBox.error("Please fill all required fields.");
                return;
            }

            let payload = {
                "LocationId": sLocId,
                "LocationDesc": sLocDes,
                "MiningResource": sMinRes,
                "TotalCost": sTotCos,
                "ReportMineral": sRepMin,
                "NumDrills": sNumDri,
                "TypeMineral": sTypMin,
                "Currency": sSelectedCurrency
            };

            let that = this;
            let oModel = this.getOwnerComponent().getModel();
            let entity = "/MINING_DATASet";

            oModel.create(entity, payload, {
                success: function() {
                    MessageBox.success("Record Inserted", {
                        onClose: function() {
                            let oRouter = that.getRouter();
                            oRouter.navTo("RouteMiningView");

                            let oEventBus = sap.ui.getCore().getEventBus();
                           oEventBus.publish("MiningView", "updateData");

                            data.forEach(item => {
                                item.input.setValue("");
                            });
                        }.bind(that)
                    });
                },
                error: function() {
                    MessageBox.error("Record failed");
                }
            });
        }
    });
});
