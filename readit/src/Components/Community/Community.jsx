import React from "react";

function Community() {
  return <>
    <h2>Community</h2>
 <div class="search-box" onclick="focusSearch()">
        <input type="text" class="search-input" placeholder="Search by username or email" />
        <i class="fa-solid fa-magnifying-glass"></i>
    </div>
	<div class="round-box">
      <p style="color:#808080; margin-left:630px; font-size:16px; margin-top:-5px;">less than a minute ago</p>
	  <div class="profile-circle">
        <img src="C:\Users\2004b\OneDrive\Pictures\1000_F_259289055_tmfqa60bcv50aBkPA7UPPB1UzfB5OwL8.jpg" alt="Profile photo" class="profile-photo" />
    </div>
	   <p style="margin-top:-36px; margin-left:90px;"><span><strong><a href="abridger_profile.html" class="abridger">Abridger</a></strong> <p style="font-size:18px; margin-top:-35px; margin-left:175px;">started reading:</span></p></p>
	    <i class="fa-regular fa-heart  heart" id="heart1" onclick="handleHeartClick('heart1')"></i><span id="heartCount1"></span>
	    <div class="book-cover-frame">
        <img src="C:\Users\2004b\OneDrive\Pictures\41flnoALm7L.jpg" alt="Book cover" class="book-cover" />
		  <p class="book-title">Henry and Evalin</p>
		  <p class="author">Peny Zeller</p>
		  <p class="auth">emotional   funny   lighthearted   medium-paced</p>
		  
		  
    
    </div>
    
    {/* </div> */}
	<div class="round-box">
	 
	 <p style="color:#808080; margin-left:630px; font-size:16px; margin-top:-5px;">less than a minute ago</p>
	  <div class="profile-circle">
        <img src="C:\Users\2004b\Downloads\855909df65727e5c7ba5e11a8c45849a.jpg" alt="Profile photo" class="profile-photo" />
    </div>
	   <p style="margin-top:-36px; margin-left:90px;"><span><strong><a href="abridger_profile.html" class="abridger">morgon</a></strong> <p style="font-size:18px; margin-top:-36px; margin-left:165px;">reviewed:</span></p></p>
	   
		
	   <span style="margin-left: 35px; margin-top:95px;">1.5 </span><span style="color: #FFD700;">&#9733;</span>
	    <i class="fa-regular fa-heart  hrt" id="heart2" onclick="handleHeartClick('heart2')"></i><span id="heartCount2"></span>
		  <a href="full_review.html" class="full-review">see full review</a>
		
    
       <div class="book-cover-frame">
        <img src="C:\Users\2004b\OneDrive\Pictures\51mAM3gz2uL.jpg" alt="Book cover" class="book-cover" />
		<p class="book-t">Meet Cute</p>
		  <p class="aut">Helena Hunting</p>
		  <p class="au">romance   adult   fiction  fast-paced</p>
		   
		  
		  
    </div>
    
    {/* </div> */}
	<div class="round-box">
	 <p style="color:#808080; margin-left:630px; font-size:16px; margin-top:-5px;">less than a minute ago</p>
	 <div class="profile-circle">
        <img src="C:\Users\2004b\OneDrive\Pictures\round_profil_picture_after_.jpg" alt="Profile photo" class="profile-photo" />
    </div>
	   <p style="margin-top:-36px; margin-left:90px;"><span><strong><a href="abridger_profile.html" class="abridger">mrstroyalist</a></strong>
       <p style="font-size:18px; margin-top:-37px; margin-left:200px;">finished reading:</span></p></p>
	    <i class="fa-regular fa-heart  hr" id="heart3" onclick="handleHeartClick('heart3')"></i><span id="heartCount3"></span>
     <div class="book-cover-frame">
        <img src="C:\Users\2004b\OneDrive\Pictures\51QDAu1CpXL.jpg" alt="Book cover" class="book-cover" />
		<p class="book-">Apples never fall</p>
		  <p class="at">Liane Moriarty</p>
		  <p class="a">mystery  adult   <p style="color:#1a98a6; margin-left:450px;
		margin-top:623px; font-size:18px;
		word-spacing:6px;  position: absolute; 
        top: 50%; 
        transform: translateY(-50%); 
        left: 60px; ">fiction  thriller adult fast-paced</p></p>
    </div>
    
      
    </div>
	<div class="round">
      You're not following anybody yet!<br><br><p style="margin-top:-7px;">

      Search for your friends or explore<br> the Community feed to find new </p><p style ="margin-left:50px; margin-top: -18px;">readers to follow.</p>
    </div>
	<div class="ro">
      If you record more of your reading<br><p style="margin-top:5px;"> activity, we can find users similar  </p><br><p style=" margin-left:80px; margin-top:-30px;">to you!</p>
    </div>
	<div class="r">
      <a href="buddy_reads_page.html" class="buddy-reads-link">
	  <i class="fa-solid fa-book-open  style-icon"></i>
            
            <span class="buddy-reads-text"><p style="margin-left:75px; margin-top:-23px;">Buddy Reads</p></span>
        </a>
    </div>
	<div class="rou">
	<a href="readalongs.html" class="read">
	<i class="fa-solid fa-message style-ic"></i>
	<span class="buddy-reads-text"><p style="margin-left:75px; margin-top:-23px;">Readalongs</p></span>
	
	</a>
      
    </div>
  </div>;
}

export default Community;
