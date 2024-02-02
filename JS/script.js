const toggleTheme = document.querySelector('#light-dark');
const input = document.querySelector('input');
const inputSearch = document.querySelector('#search');
const form = document.querySelector('form');
const searchBar = document.querySelector('.searchbar');
const cardResult = document.querySelector('.card-result');
const errorMsg = document.querySelector('#error-msg');
const pic = document.querySelector('.profile-pic-box img');
const picDefaultURL = 'ASSETS/Images/user.png';
const nameUser = document.querySelector('#name');
const username = document.querySelector('#username a');
const iscription = document.querySelector('#iscription');
const bio = document.querySelector('#bio');
const repos = document.querySelector('#repos');
const followers = document.querySelector('#followers');
const following = document.querySelector('#following');
const local = document.querySelector('#location');
const website = document.querySelector('#website a');
const twitterProfile = document.querySelector('#twitter-profile');
const company = document.querySelector('#company');
console.log(toggleTheme)

//to switch light/dark mode and detected user's preference
function toggleDarkMode() {
  if (document.documentElement.classList.contains("light")) {
    document.documentElement.classList.remove("light")
    document.documentElement.classList.add("dark")
    cardResult.classList.remove('box-shadow-active')
    searchBar.classList.remove('box-shadow-active')
    toggleTheme.firstElementChild.style.display = 'inline'
    toggleTheme.lastElementChild.style.display = 'none'
    toggleTheme.childNodes[0].textContent = 'LIGHT'
  } else if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light")
    cardResult.classList.add('box-shadow-active')
    searchBar.classList.add('box-shadow-active')
    toggleTheme.firstElementChild.style.display = 'none'
    toggleTheme.lastElementChild.style.display = 'inline'
    toggleTheme.childNodes[0].textContent = 'DARK'
  }
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add("dark")
  cardResult.classList.remove('box-shadow-active')
  searchBar.classList.remove('box-shadow-active')
  toggleTheme.firstElementChild.style.display = 'inline'
  toggleTheme.lastElementChild.style.display = 'none'
  toggleTheme.childNodes[0].textContent = 'LIGHT'
} else {
  document.documentElement.classList.add("light")
  cardResult.classList.add('box-shadow-active')
  searchBar.classList.add('box-shadow-active')
  toggleTheme.firstElementChild.style.display = 'none'
  toggleTheme.lastElementChild.style.display = 'inline'
  toggleTheme.childNodes[0].textContent = 'DARK'
}

toggleTheme.addEventListener('click', toggleDarkMode)


function startSearch(currentInput){
  const newData = async () => {
    try{
      const apiAddress = await fetch(`https://api.github.com/users/${currentInput}`)
  
      if(!apiAddress.ok){
        if(apiAddress.status === 404){
          errorMsg.style.opacity = 1
          throw new Error ('Data not found');
        } else if(apiAddress.status === 500){
          throw new Error ('problem of server');
        } else {
          throw new Error ('Network response was not ok')
        }
      } else {
        errorMsg.style.opacity = 0
      }
      
      const response = await apiAddress.json()
      const currentName = response.name;
      const currentUserName = response.login;
      const createdAt = response.created_at;
      let convertDate = new Date(`${createdAt}`)
      let currentMonth = convertDate.getMonth();
      let currentDay = convertDate.getDate();
      let currentYear = convertDate.getFullYear();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const toMonth = months[currentMonth]
      const avatarUrl = response.avatar_url;
      const currentBio = response.bio;
      const currentRepos = response.public_repos;
      const currentFollowers = response.followers;
      const currentFollowing = response.following;
      const currentLocation = response.location;
      const currentTwitter = response.twitter_username;
      const currentWebsite = response.blog;
      const currentCompany = response.company;
      const urlProfile = response.html_url;
  
      if(avatarUrl != ''){
        pic.setAttribute('src', `${avatarUrl}`)
      }
  
      nameUser.innerHTML = currentName;
  
      username.innerHTML = `@${currentUserName}`
      username.setAttribute('href', `${urlProfile}`)
      iscription.innerHTML = `Joined ${currentDay} ${toMonth} ${currentYear}`
  
      if(currentBio != null){
        bio.innerHTML = currentBio;
      } else {
        bio.innerHTML = 'This profile has no bio';
        bio.style.opacity = 0.75;
      }
      
      if(currentRepos != null){
        repos.innerHTML = currentRepos;
      }
      
      if(currentFollowers != null){
        followers.innerHTML = currentFollowers
      }
      
      if(currentFollowing != null){
        following.innerHTML = currentFollowing
      }
  
      if(currentLocation == null){
        local.innerHTML = 'Not Available'
        local.classList.add('opacity')
      } else{
        local.innerHTML = currentLocation;
      }
  
      if(currentTwitter == null){
        twitterProfile.innerHTML = 'Not Available'
        twitterProfile.classList.add('opacity')
      }else {
        twitterProfile.innerHTML = currentTwitter
      }
  
      if(currentWebsite == ''){
        website.innerHTML = 'Not Available'
        website.classList.add('opacity')
      } else {
        website.innerHTML = currentWebsite
        website.setAttribute('target', '_blank')
        website.setAttribute('href', `https://www.${currentWebsite}`)
      }
  
      if(currentCompany == null){
        company.innerHTML = 'Not Available'
        company.classList.add('opacity')
      } else {
        company.innerHTML = currentCompany
      }
  
      console.log(response)
    } catch(e){
      console.error(e)
    }
    
  }
  newData()
}

form.addEventListener('submit', () => {
  let currentInput = input.value;
  startSearch(currentInput)
  input.value = ''
})