
const responseCode = require("../../../../utilites/responseCode");
const common = require("../../../../utilites/common");
const { request } = require("express");
const propertyJsonData = require("../../../../config/property")

class userModel {
    constructor() {
        this.properties = Array.isArray(propertyJsonData) ? [...propertyJsonData] : [];
     }
    //Add Property

    async addProperties(requestData) {
        try {
            let propertyData = {
                id:Math.floor(Date.now() / 1000),
                title: requestData.title,
                type: requestData.type,
                location: requestData.location,
                price: requestData.price,
                short: requestData.short,
                image: requestData.image,
                description: requestData.description,
                created_At: new Date().toISOString(),
                updated_At: new Date().toISOString()
            }
            this.properties.unshift(propertyData)
            return {
                code: responseCode.SUCCESS,
                keyword: "Property Added Successfully",
                data: propertyData
            }

        } catch (error) {
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error
            };
        }
    }

    async getProperties(requestData){
        try{
            return {
                 code: responseCode.SUCCESS,
                keyword: "success",
                data: this.properties
            }
        }catch(error){
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error
            };
        }
    }

}

module.exports = new userModel()
