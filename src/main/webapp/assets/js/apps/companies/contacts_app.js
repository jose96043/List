CompanyInfo.module("CompaniesApp", function(CompaniesApp,CompanyInfo,Backbone,Marionette,$,_){
	CompaniesApp.Router = Marionette.AppRouter.extend({
		appRoutes:{
			"companies": "listCompanies",
			"companies/:id": "showCompany"
		}
	});

	var API = {
			listCompanies: function(){
    		CompaniesApp.List.Controller.listCompanies()
		},

		showCompany: function(id){
			CompaniesApp.Show.Controller.showCompany(id)
		}
	};

	CompanyInfo.on("companies:list", function(){
		CompanyInfo.navigate("companies");
		API.listCompanies();
	});

	CompanyInfo.on("companies:show", function(id){
		CompanyInfo.navigate("companies/"+id);
		API.showCompany(id);
	});

	CompanyInfo.addInitializer(function(){
		new CompaniesApp.Router({
			controller: API
		});
	});
});