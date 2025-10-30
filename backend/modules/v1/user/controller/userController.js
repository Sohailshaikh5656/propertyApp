const Validator = require("Validator")
const middleware = require("../../../../middleware/validators")
const validationRules = require("../../../../utilites/rules")
const userModel = require("../model/userModel");
const common = require("../../../../utilites/common");
const message = require('../../../../language/en');
const { required } = require('../../../../language/ar');

class userController{
    constructor(){}

    async addProperties(req,res){
        let requestData = req.body
        console.log("Data : ",req.body)
        let rules = validationRules.property;
        // FIX: Check if req.language exists and has required property
        let message = {
            required: req.language?.required
        }
        let keywords = {}
        // FIX: Add proper error handling for validation
        try {
            if(middleware.checkValidationRules(req,res,requestData,rules,message,keywords)){
                let result = await userModel.addProperties(requestData)
                return middleware.sendResponse(req,res,result)
            }
        } catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({
                code: 0,
                message: "Internal server error"
            });
        }
    }
    async getProperties(req,res){
        let requestData = req.body
        let result = await userModel.getProperties(requestData)
        return middleware.sendResponse(req,res,result)
    }
}
module.exports = new userController()