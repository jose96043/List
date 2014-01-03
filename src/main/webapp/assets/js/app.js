var CompanyInfo = new Marionette.Application();

CompanyInfo.addRegions({
    mainRegion: "#main-region"
});

CompanyInfo.navigate = function(route, options){
	options || (options={});
	Backbone.history.navigate(route,options);
};

CompanyInfo.getCurrentRoute = function(){
	return Backbone.history.fragment;
};

CompanyInfo.on("initialize:before", function(){
	CompanyInfo.request("company:entities");
});

CompanyInfo.on("initialize:after", function(){
	var self = this;
	if(Backbone.history){
		Backbone.history.start();
		if(self.getCurrentRoute() === ""){
			CompanyInfo.trigger("companies:list");
		}
	}
});