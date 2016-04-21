var TagBindingModel = (function(){
    function TagBindingModel(name, posts){
        this.setTagName(name);
        this.posts = posts || [];
    }
    function isBlankNullOrUndefined(str) {
        return (!str || /^\s*$/.test(str));
    }

    TagBindingModel.prototype.getTagName = function(){
        return this.name;
    };
    TagBindingModel.prototype.setTagName = function(value){
        if(isBlankNullOrUndefined(value)){
            throw new Error("Tag cannot be empty");
        }
        this.name = value;
    };

    return TagBindingModel;
}());