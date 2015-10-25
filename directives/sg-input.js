(function () {
  angular.module('sgDirectives', [])
    .directive('sgInput', function () {
      return {
        restrict: 'C',
        controller: function($element) {
          this.setValid = function(isValid) {
            console.log('setValid', isValid);
            $element.toggleClass('sg-input--valid', isValid);
          };
          this.setInvalid = function(isInvalid) {
            console.log('setInvalid', isInvalid);
            $element.toggleClass('sg-input--invalid', isInvalid);
          };
          this.setSelected = function(isSelected) {
            $element.toggleClass('sg-input--selected', isSelected);
          };
        }
      };
    })
    .directive('sgInputElement', function () {
      return {
        restrict: 'C',
        require: ['^sgInput', '?ngModel'],
        link: function(scope, element, attrs, controllers) {
          var sgInputCtrl = controllers[0];
          var ngModelCtrl = controllers[1];

          // If no parent controller, there isn't anything to do
          if(!sgInputCtrl) {
            return;
          }


          element.on('focus', function() {
            sgInputCtrl.setSelected(true);
          });

          element.on('blur', function() {
            sgInputCtrl.setSelected(false);
          });

          if(ngModelCtrl) {
            scope.$watch(function() {
              return ngModelCtrl.$valid;
            }, function(isValid) {
              sgInputCtrl.setValid(isValid);
            });

            scope.$watch(function() {
              return ngModelCtrl.$invalid & ngModelCtrl.$dirty;
            }, function(isInvalid) {
              sgInputCtrl.setInvalid(isInvalid);
            });
          }
        }
      };
    });
})();
