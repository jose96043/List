CompanyInfo.module("CompaniesApp.List", function(List, CompanyInfo, Backbone, Marionette, $, _){
    List.Controller = {
        listCompanies: function(){
        	var companiesListView =window.companies= new List.Companies({});
        	
        	CompanyInfo.on("company:initData", function(){
              var companies = CompanyInfo.request("company:entities");
              companiesListView.collection = companies;
              CompanyInfo.mainRegion.show(companiesListView);
        	});


            companiesListView.on("itemview:company:show", function(childView,model){
                console.log("company:show", model.get("id"));
                CompanyInfo.trigger("company:show", model.get("id"));
            });

            companiesListView.on("itemview:company:delete", function(childView, model){
                companies.remove(model);
            });

            CompanyInfo.mainRegion.show(companiesListView);
        }
    };
});