shappyWise.directive("chatbox", function() {
   return {
       restrict: 'E',
       templateUrl: 'templates/chatbox.html',
       replace: false
   } 
});

shappyWise.directive("chatboxHeader", function() {
   return {
       restrict: 'E',
       templateUrl: 'templates/chatbox-header.html',
       replace: true
   } 
});

shappyWise.directive("chatboxProfile", function() {
   return {
       restrict: 'E',
       templateUrl: 'templates/chatbox-profile.html',
       replace: true
   } 
});

shappyWise.directive("chatboxConversation", function() {
   return {
       restrict: 'E',
       templateUrl: 'templates/chatbox-conversation.html',
       replace: true
   } 
});


shappyWise.directive("chatboxMessagebox", function() {
   return {
       restrict: 'E',
       templateUrl: 'templates/chatbox-messagebox.html',
       replace: true
   } 
});

shappyWise.directive("chatboxSidebarTrigger", function() {
   return {
       restrict: 'E',
       templateUrl: 'templates/chatbox-sidebar-trigger.html',
       replace: true
   } 
});

shappyWise.directive("chatboxSidebarNavigation", function() {
   return {
       restrict: 'E',
       templateUrl: 'templates/chatbox-sidebar-navigation.html',
       replace: true
   } 
});