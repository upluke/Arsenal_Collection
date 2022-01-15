"use strict";

// js/nav.js contains code to show/hide things in the navigation bar, 
// and well as code for when a user clicks in that bar.

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();

  $navSubmit.show()
  $navFavorites.show()
  $navMyStories.show()
}


/** When a user click on submit a form displaces on the top of the list */
function navSubmitClick(evt){
    console.debug("navSubmitClick");
    $storyForm.show()
    console.log("test click")
  }
 
  $('#nav-submit').on('click', navSubmitClick)
  

  
   /** When a user clicks sumbit button, a story will be added */
  function formSubmitClick(){
   console.debug("formSubmitClick"); 
   addNewStoryOnPage()
    
  }
  $('#story-form').on('submit', formSubmitClick)