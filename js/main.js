//listen for submit from form
document.getElementById('form').addEventListener('submit',saveBookmark);


function saveBookmark(e){
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validation(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    //if localStorage is empty(this is to add a new bookmark)
    if(localStorage.getItem('bookmarks') === null){
        var bookmarkArray = [];
        bookmarkArray.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkArray));
    }
    //if there is a bookmark already in existence then add to the existing one
    else{
        var bookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarkArray.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarkArray));

    }

    document.getElementById('form').reset();

    fetchBookmarks();


    e.preventDefault();
}
//fetch bookmarks
function fetchBookmarks(){
    //get items from local storage
    var bookmarkArray = JSON.parse(localStorage.getItem('bookmarks'));
    
    //get output id
    var bookmarksResults = document.getElementById('bookmarkResults');
    bookmarksResults.innerHTML = '';

    
    for(var i = 0; i < bookmarkArray.length; i++){
        var name = bookmarkArray[i].name;
        var url = bookmarkArray[i].url;
        bookmarksResults.innerHTML += '<div class="well">'+
        '<h4>'+name+'&nbsp'+
        '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
        '<a onclick="deleteBookmarks(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
        '</h4>'+
        '</div>';
    }

}
function deleteBookmarks(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //remove from array
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url === url){
            bookmarks.splice(i, 1);
        }
        
    }

    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    fetchBookmarks();

}

function validation(siteName, siteUrl){
   if(!siteName || !siteUrl){
        alert('You didnt input anything! Please fill the form');
        return false;
        
    }

    // use regular expression to check email validity
    // var expression = '[a-zA-z]';
    // var regex = new RegExp(expression)

    // if(!siteUrl.match(regex)){
    //     alert('Your email doesnt follow the normal format');
    //     return false;
    // }
    return true;
}