CompanyInfo.module("CompaniesApp.List", function(List, CompanyInfo, Backbone, Marionette, $, _){
    List.Company = Marionette.ItemView.extend({
       tagName: "tr",
       template: "#company-list-item",
       events:{
        "click": "highlightName",
        "click td a.js-show" : "showClicked" ,
        "click button.js-delete" : "deleteClicked"
       },

        highlightName: function(e){
            this.$el.toggleClass("warning");
            this.trigger("company:highlightName", this.model);
        },

        showClicked: function(e){
            e.preventDefault();
            e.stopPropagation();
            console.log("showClicked");
            this.trigger("company:show", this.model);
        },

        deleteClicked:function(e){
            e.stopPropagation();
            this.trigger("company:delete", this.model);
        },

        remove: function(){
            var self = this;
            this.$el.fadeOut(function(){
                Marionette.ItemView.prototype.remove.call(self);
            });
        }
    });

    List.Companies = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hover",
        template:"#company-list",
        itemView: List.Company,
        itemViewContainer: "tbody",

        onItemviewCompanyDelete: function(){
            this.$el.fadeOut(1000, function(){
                $(this).fadeIn(1000);
            });
        }
    });

});