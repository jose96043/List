CompanyInfo.module("CompaniesApp.List", function(List, CompanyInfo, Backbone, Marionette, $, _){
    List.Controller = {
        listCompanies: function(){
            var companies = CompanyInfo.request("company:entities");
            var companiesListView = new List.Companies({
               collection: companies
            });

            companiesListView.on("itemview:company:show", function(childView,model){
                console.log("company:show", model.get("id"));
                CompanyInfo.trigger("company:show", model.get("id"))
                // ContactManager.ContactsApp.Show.Controller.showContact(model);
            });

            companiesListView.on("itemview:company:delete", function(childView, model){
                companies.remove(model);
            });

            CompanyInfo.mainRegion.show(companiesListView);
        }
    };
});