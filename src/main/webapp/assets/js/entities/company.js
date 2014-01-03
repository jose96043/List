CompanyInfo.module("Entities", function(Entities, CompanyInfo, Backbone, Marionette, $, _){
    Entities.Company = Backbone.Model.extend({});

    Entities.CompanyCollection = Backbone.Collection.extend({
        model: Entities.Company
//        comparator: "firstName"
    });

    var companies;

    var initializeCompanies = function(){
    	$.ajax({
			type : 'POST',
			url : 'getCompanies'
		}).done(function(data) {
			companies = new Entities.CompanyCollection(data.hits.hits);
			CompanyInfo.trigger("company:initData");
		});
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