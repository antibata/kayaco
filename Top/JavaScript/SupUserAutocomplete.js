//contains which elements of the html document will be editables. 

$(document).ready(function() {

    var data = "Core Selectors Attributes Traversing Manipulation CSS Events Effects Ajax Utilities".split(" ");
    $('#searchuser').autocomplete({source: '/extensions/SupUserAutocompleteGetResults.php', minLength: 3, delay: 300});
        
});