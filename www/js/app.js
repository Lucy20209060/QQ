// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);


      $ionicConfigProvider.platform.ios.tabs.style('standard');
      $ionicConfigProvider.platform.ios.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('standard');

      $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      $ionicConfigProvider.platform.android.navBar.alignTitle('center');

      $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
      $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

      $ionicConfigProvider.platform.ios.views.transition('ios');
      $ionicConfigProvider.platform.android.views.transition('android');

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  $stateProvider
  .state('tabs',{
    url:'/tab',
    views:{
      'tab':{
        templateUrl:'templates/tabs.html'
      }
    }
    
  })
  .state('tabs.message',{
    url:'/message',
    views:{
      'tab-message':{
        templateUrl:'templates/message.html'
      }
    }
  })
  .state('details',{
    url:'/details/:mesId',
    views:{
      'tab':{
        templateUrl:'templates/details.html'
      }
    }
  })
  .state('tabs.phone',{
    url:'/phone',
    views:{
      'tab-phone':{
        templateUrl:'templates/phone.html'
      }
      
    }
    
  })
  .state('tabs.linkman',{
    url:'/linkman',
    views:{
      'tab-linkman':{
        templateUrl:'templates/linkman.html'
      }
      
    }
    
  })
  .state('tabs.trends',{
    url:'/trends',
    views:{
      'tab-trends':{
        templateUrl:'templates/trends.html'
      }
      
    } 
  })
  .state('friendTrends',{
    url:'/friendTrends',
    views:{
      'tab':{
        templateUrl:'templates/friendTrends.html'
      }
      
    }
  })
  $urlRouterProvider.otherwise('/tab/message')


}])

.controller('ctrl',function($scope,$timeout,$http,$state){
  $scope.refreshTime = "最近更新于：2016-11-20 21:53";
  $scope.doRefresh=function(){
    var time = new Date()
    var Miu = time.getMinutes();
    var Hou = time.getHours();
    console.log(Hou+":"+Miu)
    $scope.refreshTime = "最近更新于："+Hou+":"+Miu;

    $timeout(function(){
      $scope.$broadcast('scroll.refreshComplete');//取消刷新状态
    },1000)
  }

  $http({
    url:"../json/data.json",
    method:"get"
  }).then(function(response){
      $scope.messMessage= response.data;
  }).finally(function(){
    
  })

  $scope.messageDetils = function(mess) {
    console.log(mess.id)
      $state.go("details", {
          "mesId": mess.id
      });
  }

  $scope.goFriendtr = function(){
     $state.go("friendTrends");
  }


})