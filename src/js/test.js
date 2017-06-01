/**
 * iShare.js
 * @author singsong
 * @email	zhansingsong@gmail.com
 * @date 2016.3.6
 */
;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
    	console.log("amd");
        define([], factory(root));
    } else if (typeof exports === 'object') {
    	console.log("module.exports");
        module.exports = factory(root);
    } else {
		console.log("root.iShare");
        root.iShare = factory(root);
    }
})(typeof global !== 'undefined' ? global : this.window || this.global, function(root) {


    function Test(){
    	console.log(999);
    }

   
});
