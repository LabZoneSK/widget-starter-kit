var controller = (function($) {
  var self = this;
  var wwClient = qmatic.webwidget.client;
  var wwRest = qmatic.connector.client;

  return {
    onLoaded: function(configuration) {
      console.log('On loaded');
    },

    onLoadError: function(message) {
      console.error(message);
    }
  };
  
})(jQuery);
