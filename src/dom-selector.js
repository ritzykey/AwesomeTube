var _20p = _20p || {};
(function($){
var domSelector = {
  ignoreClasses: function(className){
    var ignores = ["ui-sortable", "ui-droppable","has-error"];
    return (ignores.indexOf(className)>=0);
  },
  escapeJquerySpecials: function(str){
    str = str.replace(/([\!\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~])/g, "\\$1");
    return str;
  },
  getSelector: function(el) {

    return el;
  },
  getUniqueSelector: function(el) {
    el = $(el);
    var selector = this.getSelector(el);
    // //console.log("selector", selector);
    selector = selector[0].currentSrc;
    selector = selector.split("?")[0];
    selector2 = selector.replace('hq','maxres');
    selector = [selector, selector2];
    return selector;
  },
  getLastZindex: function(){
    var maxZ = Math.max.apply(null,$.map($('body > *'), function(e,n){
               if($(e).css('position')=='absolute')
                    return parseInt($(e).css('z-index'))||1 ;
               })
        );
    return maxZ;
  }
};
//export highlighter to root namespace
_20p.domSelector = domSelector;

})(_20p_$);