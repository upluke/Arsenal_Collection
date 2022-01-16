"use strict";

// js/stories.js contains code for UI about listing stories.


// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  $navSubmit.hide() 
  $navFavorites.hide()
  $navMyStories.hide()
  $storyForm.hide()
  $favoritesList.hide()
  $myStoriesList.hide()

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <span id="star_id" data-story-id="${story.storyId}" class="fa fa-star checked"></span> 
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
  const $storyTitle=$("#story-title").val()
  const $storyAuthor=$("#story-author").val()
  const $storyUrl=$("#story-url").val()
  const newStory= {'title': $storyTitle, 'author': $storyAuthor, 'url': $storyUrl}   

  await StoryList.addStory(currentUser, newStory)
   
}

/** add fovirte to a story when star icon is clicked  */
async function addFavoriteStoryOnPage(evt){

  const token=currentUser.loginToken
  const username=currentUser.username
  const storyId=evt.target.dataset.storyId
  
  
  
  if ($(this).hasClass('checked')){
    console.log("removed -->", await User.removeAFavorite(token, username, storyId))
    $(this).removeClass('checked')
  }else{
    console.log("add -->", await User.addAFavorite(token, username, storyId))
    $(this).addClass('checked')
  }

  
}

$(document).on('click', '#star_id', addFavoriteStoryOnPage)