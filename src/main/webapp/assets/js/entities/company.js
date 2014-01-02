CompanyInfo.module("Entities", function(Entities, CompanyInfo, Backbone, Marionette, $, _){
    Entities.Company = Backbone.Model.extend({});

    Entities.CompanyCollection = Backbone.Collection.extend({
        model: Entities.Company,
        comparator: "firstName"
    });

    var companies;

    var initializeCompanies = function(){
    	$.ajax({
			type : 'POST',
			url : 'getCompanies'
		}).done(function(data) {
			companies = new Entities.CompanyCollection(data);
			console.log('data', data);
		});
    	
//    	companies = new Entities.CompanyCollection([
//            {
//                id:1,
//                firstName: "Alice",
//                lastName: "Arten",
//                phoneNumber: "555-0184"
//            },
//            {
//                id: 2,
//                firstName: "Bob",
//                lastName: "Brigham",
//                phoneNumber: "555-0162"
//            },
//            {
//                id: 3,
//                firstName: "Charlie",
//                lastName: "Campbell",
//                phoneNumber: "555-0129"
//            }
//        ]);
    };

    var API = {
        getCompanyEntities: function(){
            if(companies === undefined){
            	initializeCompanies();
            }
            return companies;
        }
    };

    CompanyInfo.reqres.setHandler("company:entities", function(){
       return API.getCompanyEntities();
    });
});