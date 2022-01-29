"use strict";

// js/stories.js contains code for UI about listing stories.


// This is the global list of the stories, an instance of StoryList
let storyList;
 
/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  
  storyList = await StoryList.getStories();
  
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story,type ) {
  // console.debug("generateStoryMarkup", story);
 

  const hostName = story.getHostName();  
  const favoritesIdCollection=localStorage.getItem("favoritesIds")===null?[]:localStorage.getItem("favoritesIds") 
 
  // update trash icon and star icon depending on tab types
  let trashIconClass=''
  let starIconClass=''  
  const markedStar=favoritesIdCollection.indexOf(story.storyId)!==-1?'checked':''
  //|||||||||||||||||
  if(type==='favorites'){
    trashIconClass="fa fa-trash hidden"
    starIconClass=`fa fa-star ${markedStar}`
    
  }else if(type==='myStories'){
    trashIconClass="fa fa-trash"
    starIconClass=`fa fa-star ${markedStar}`
  }else{
    if(currentUser){
      trashIconClass="fa fa-trash hidden"
      starIconClass=`fa fa-star ${markedStar}`
    }else{
      trashIconClass="fa fa-trash hidden"
      starIconClass=`fa fa-star hidden`
    }
  }
 
  return $(`
      <li id="${story.storyId}">
        <span id="trash_id" data-story-id="${story.storyId}" class="${trashIconClass}"></span>
        <span id="star_id" data-story-id="${story.storyId}" class="${starIconClass}"></span> 
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
  
}

/** It's called when users submit the form */

async function addNewStoryOnPage(){
  console.log("(((((((((((((")
  const $storyTitle=$("#story-title").val()
  const $storyAuthor=$("#story-author").val()
  const $storyUrl=$("#story-url").val()
  const newStory= {'title': $storyTitle, 'author': $storyAuthor, 'url': $storyUrl}   
  
  const aUserData=await User.getAUserData(currentUser.username, currentUser.loginToken)
  const userStories=aUserData.data.user.stories 
  console.log("current user stories: ", userStories)

  await StoryList.addStory(currentUser, newStory)

  // get updated user's stories and save it to localStorage
  const aUserData2=await User.getAUserData(currentUser.username, currentUser.loginToken)
  const userStories2=aUserData2.data.user.stories 
  console.log("after user stories: ", userStories2)
  // saveUserStoriesIntoLocalStorage(userStories2)
  getAndShowStoriesOnStart()
  return userStories2
}

/** add/remove fovirte to a story when star icon is clicked  */
async function addFavoriteStoryOnPage(evt){

  const token=currentUser.loginToken
  const username=currentUser.username
  const storyId=evt.target.dataset.storyId
  
  if ($(this).hasClass('checked')){
    await User.removeAFavorite(token, username, storyId)
    $(this).removeClass('checked')
    
  }else{
    await User.addAFavorite(token, username, storyId)
    $(this).addClass('checked')
    
  }
  addFavoritesOnPage()
   
}

$(document).on('click', '#star_id', addFavoriteStoryOnPage)

/** generate user's favorites on page */
async function addFavoritesOnPage(){

  $favoritesList.empty()
  const aUserData= await User.getAUserData(currentUser.username, currentUser.loginToken)
  const favorites = aUserData.data.user.favorites
  
  for(let favorite of favorites){
    const storifiedFavObject=new Story(favorite)
    const $favorite= generateStoryMarkup(storifiedFavObject, "favorites")
    
    $favoritesList.append($favorite)
  }

}

function displayFavorites(){
  hidePageComponents()
  $favoritesList.show()
}


$navFavorites.on('click', displayFavorites)



/** create user favrite list for look up*/

async function generateUserFavoriteList(){
  const aUserData=await User.getAUserData(currentUser.username, currentUser.loginToken)
  return aUserData.data.user.favorites.reduce((accu, curr)=>{
      accu.push(curr.storyId)
      return accu
   }, []) 
  
}

/** generate my stories */
async function addMyStoriesOnPage( ){
  $myStoriesList.empty()
  
  const aUserData=await User.getAUserData(currentUser.username, currentUser.loginToken)
  const userStories=aUserData.data.user.stories 

  // const userStories=JSON.parse(localStorage.getItem('userStories'))


  // console.log("current user stories: ", userStories)
  // console.log("type::::", typeof(updatedUserStories),updatedUserStories)

 
  for(let userStory of userStories){
    const storifiedStoryObject=new Story(userStory)
    const $myStories=generateStoryMarkup(storifiedStoryObject, "myStories")

    $myStoriesList.append($myStories)
  }
 
}

function displayMyStories(){
  hidePageComponents()
  $myStoriesList.show()
}

$navMyStories.on('click', displayMyStories )


/** delete a story */
async function removeAStory(evt){
 
  const storyId=evt.target.dataset.storyId
  const token=currentUser.loginToken
  
  await User.removeAStory(storyId, token)
  // const userStories= await addNewStoryOnPage()
  // saveUserStoriesIntoLocalStorage(userStories)
  addMyStoriesOnPage()
}

$(document).on('click','#trash_id', removeAStory)