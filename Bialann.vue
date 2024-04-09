<template>
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
     <div class="w3-top" >
       <!-- <div @click="toggleSidebar(true)" class="w3-button w3-padding-16 w3-left" style="color: #800000;">☰ Toggle Menu</div> -->
       <div class="w3-white w3-xlarge" >
           <!-- <div @click="toggleSidebar(true)" class="w3-button w3-padding-16 w3-left" style="color: #800000;">☰ Open</div> -->
         <a class="w3-right w3-padding-16" href="AboutUs.html" >About Us</a>
         <div class="w3-center w3-padding-16" >Uni&#10031Radar</div>
       </div>
     </div>
     <div class="w3-main w3-content w3-padding" style="max-width:1200px;margin-top:100px">
        <h1 style="text-align: center;color: #800000;">An Bhialann</h1>
      <div class="club-description">
        <p>Satisfy your hunger at An Bhialann, the ultimate dining destination located beneath the James Hardiman Library. Enjoy a diverse menu of quality food at wallet-friendly prices, with something for everyone, from a hearty Irish breakfast to a healthy snack or a piping hot pizza, and much more in between</p>
        <img src="https://uploads-ssl.webflow.com/612f37c0cd36871f0c9d5824/612f403c6227ae36c5099087_UR%20logo-p-500.png" alt="Mountaineering" class="club-image">
      </div>
      
      <div class="rating-section">
      <div class="star-rating">
        <p>Your Rating</p>
        <span v-for="star in 5" :key="star" class="star" @click="rateClub(star)" :class="{ active: star <= rating }">&#9733;</span>
      </div>
    </div>
    <div class="comment-section">
      <h2>Comments</h2>
      <textarea v-model="newComment" placeholder="Add a (non) public comment..."></textarea>
      <button class="buttonPost" role="button" @click="postNewComment">Post</button>
      <div class="comments">
        <div class="comment" v-for="comment in comments" :key="comment.id">
  <img src="https://cdn-icons-png.flaticon.com/128/6522/6522516.png" alt="User profile" class="user-profile">
  <div class="comment-content">
    <p class="user-handle"> {{ getUsername(comment.handle) }}</p>
    <div class="star-rating">
      <span v-for="star in comment.rating" :key="star" class="star" style="color: gold;">&#9733;</span>
    </div>
    <textarea v-if="comment.editMode" v-model="editedComment.text" placeholder="Edit your comment..."></textarea>
    <p v-else class="comment-text">{{ comment.text }}</p>
  </div>
  <div class="comment-metadata">
    <p class="comment-time">{{ formatDate(comment.time) }}</p>
    <template v-if="comment.editMode">
      <button class="button-delete" role="button" @click="saveEditedComment(comment)">Save</button>
      <button class="button-delete" role="button" @click="disableEdit(comment)">Cancel</button>
    </template>
    <template v-else>
      <button class="button-delete" role="button" @click="editComment(comment.commentid)">Edit</button>
    </template>
    <button class="button-delete" role="button" @click="deleteComment(comment.commentid)">Delete</button>
  </div>
</div>
      </div>
    </div>
    </div>
  <!-- </div> -->
  </template>
  
  

  <script>
  
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  export default {
  name: 'AnBhialann',
  data() {
    return {
      rating: 0,
      averageRating: 'In progress',
      newComment: '',
      comments: [],
      time: '',
      source:'AnBhialann',
      handle:null,
      commentid:'',
      userId: null,
      
        tempVal:'',
        temprating: 0,
        isLoggedIn: false,
        editMode: false,
      editingCommentId: null,
      editedComment:{}
    };
  },
  methods: {
    async fetchComments(){
    try{
        const response = await fetch(`https://getcontent-3b74umvm6q-uc.a.run.app?source=${this.source}`);
        const data = await response.json();
        this.comments = data.data.map(comment=>({ 
                text: comment.text,
                rating: comment.rating,
                time: comment.timestamp,
                commentid: comment.id,
                handle: comment.handle,
                userId: comment.userId,
            }));
    } catch(error) {
        console.error('Error fetching comments: ', error);
    }
   },

    async postNewComment(){
      console.log(this.newComment);
      console.log(this.rating);
      try{
        const response= await fetch('https://postcontent-3b74umvm6q-uc.a.run.app',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json', // Corrected typo here
          },
          body: JSON.stringify({ 
            text: this.newComment,
            rating: this.rating,
            source: this.source,
            handle: this.handle,
            userId: this.userId,
          }),
        });
        const data= await response.json();
        console.log('Response from post comment:',data);
        this.fetchComments(); // Corrected function call here
      }
      catch(error){
        console.error('Error Posting comment: ',error);
      }
    },
    async deleteComment(id) {
  try {
    // Get the current user's UID
    const currentUserUid = this.userId;
    
    // Fetch the comment from the comments array using its ID
    const comment = this.comments.find(comment => comment.commentid === id);
    
    // Check if the current user's UID matches the UID of the user who posted the comment
    if (comment && currentUserUid === comment.userId) {
      // If the UIDs match, proceed with deleting the comment
      const response = await fetch(`https://deletecontent-3b74umvm6q-uc.a.run.app?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the deleted comment from the local comments array
        this.fetchComments();
        console.log('Comment deleted successfully');
      } else {
        console.error('Failed to delete comment');
      }
    } else {
      // If the current user's UID does not match the UID of the user who posted the comment, display an error message or handle it accordingly
      console.error('Sorry You are not authorized to delete this comment');
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
},

  // Other methods...

  async editComment(commentId) {
  // Set the editingCommentId to the ID of the comment being edited
  this.editingCommentId = commentId;
  // Find the comment being edited
  const commentbeingEdited = this.comments.find(comment => comment.commentid === commentId);
  // Set the initial value of editedComment.text to the current text of the comment being edited
  console.log(commentbeingEdited);
  commentbeingEdited.editedComment = { text: commentbeingEdited.text };
  commentbeingEdited.editMode = true;
},


  async disableEdit(comment){
    this.tempVal=null,
    comment.editedComment.text=comment.text,
    comment.editMode=false;
  },

  async saveEditedComment(comment) {
  try {
    // Get the current user's UID
    const currentUserUid = this.userId;
    
    // Fetch the comment from the comments array using its ID
    const editedComment = this.comments.find(c => c.commentid === comment.commentid);
    
    // Check if the current user's UID matches the UID of the user who posted the comment
    if (editedComment && currentUserUid === editedComment.userId) {
      // If the UIDs match, proceed with updating the comment
      const response = await fetch(`https://updatecontent-3b74umvm6q-uc.a.run.app?id=${comment.commentid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: comment.text,
           rating: comment.rating,
           source: this.source,
           userId: currentUserUid, // Update the comment with the current user's UID
        }),
      });

      if (response.ok) {
        console.log('Comment updated successfully');
        // Reset variables and fetch updated comments
        this.newComment = '';
        this.rating = 0;
        this.commentId = '';
        this.editMode = false;
        this.fetchComments();
      } else {
        console.error('Failed to update comment');
      }
    } else {
      // If the current user's UID does not match the UID of the user who posted the comment, display an error message or handle it accordingly
      console.error('You are not authorized to update this comment');
    }
  } catch (error) {
    console.error('Error updating comment:', error);
  }
},

    rateClub(star){
      this.rating=star;
      console.log("Rating = "+star);
    },
    getUsername(email) {
  if (!email || email.trim() === '') {
    return 'Anonymous';
  } else {
    return email.split('@')[0];
  }
},

    toggleSidebar(){
      document.body.classList.toggle('sidebar-open');
    },
    formatDate(timestamp) {
      // Convert the seconds and nanoseconds to milliseconds
      const milliseconds = timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000;
      // Create a new Date object using the milliseconds
      const date = new Date(milliseconds);
      // Return the formatted date and time
      return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    },
    LoggedIn(){
      const auth= getAuth();
      onAuthStateChanged(auth,(user)=>{
        if(user){
          console.log("User",user);
          this.handle=user.email;
          this.userId=user.uid;
        }
        else{
          console.log("No user found");
        }
      }
    )},
  },
  computed:{
  filteredComments(){
      return this.comments.filter(comment=> comment.source=='Sult');
    },
  },
  mounted(){
    this.fetchComments(); // Corrected function call here
    this.LoggedIn();
  },
}
</script>

  
<style scoped>
.sample-page {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
.button-delete{

  font-size: 12px; /* Adjust the font size */
  padding: 5px 10px; /* Adjust the padding */
  color:#800000;

}

.club-title {
  text-align: center;
}

.club-description p, .rating-section, .comment-section {
  margin-bottom: 20px;
}

.club-image {
  width: 50%;
  height: auto;
  margin-top: 20px;
}

.star-rating {
  cursor: pointer;
  text-align: center;
  font-size: 24px;
}

.star.active {
  color: gold;
}

.comment-section textarea {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.comment-text{
  color: black;
}

.comments .comment {
  background-color: #f1f1f1;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.comment-section .star-rating .star {
   font-size: 16px; /* Adjust the font size to your preference */
}

/* @media (max-width: 768px) {
  .photo-item {
    width: 100%;
  }
} */
</style>
