
   <template>
  
    <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
      
      <div class="w3-main w3-content w3-padding" style="max-width:1200px;margin-top:100px">
        <div class="mission-section">
          <h2 style="text-align: center;color: #800000;">Welcome to Uni&#10031Radar</h2>
          <p style="text-align: center;">
            Our mission is to create a vibrant, informed, and connected student community. We believe in the power of participation and engagement in enriching the university experience. Rate and discuss about your favourite cafes & restaurants (clubs and societies coming soon!).
          </p>
        </div>
    
        <div class="team-section">
          <h2 style="text-align: center;color: #800000;">Quick Menu</h2>
          <div class="team-members">
            <div class="team-member" v-for="member in teamMembers" :key="member.name">
              <router-link :to="`/${member.link}`">
                <img :src="member.image" alt="Team Member" class="team-member-image"></router-link>
              <!-- <img :src="member.image" alt="Team Member" class="team-member-image"> -->
              <router-link :to="`/${member.link}`"><h3>{{ member.name }}</h3></router-link>
              <p>{{ member.role }}</p>
              <p>{{ member.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    
    <script>
    export default {
      name: 'AboutUs',
      data() {
        return {
          teamMembers: [
            {
              name: 'Food and Beverage',
              role: "Explore and rate the University's",
              description: 'Food and Beverage facilities',
              image: 'https://img.freepik.com/premium-vector/restaurant-location-icon-outline-vector-meal-lunch-cafe-food_96318-100721.jpg?w=826', // Adjust path as necessary
              link: 'food-and-beverage',
            },
            {
              name: 'Events',
              role: 'Click Here to see events you are missing out on',
              description: '',
              image: 'https://img.freepik.com/premium-vector/global-video-call-icon-outline-global-video-call-vector-icon-web-design-isolated-white-background_98396-31626.jpg?w=826', // Adjust path as necessary
              link: 'Events',
            },
            {
              name: 'Clubs',
              role: 'Never feel left out at the Univerity of Galway',
              description: '',
              image: 'https://img.freepik.com/premium-vector/pull-up-vector-illustration-style_717774-16371.jpg?w=826', // Adjust path as necessary
              link:'clubs'
            },
           
            // {
            //   name: 'Lebah',
            //   role: 'Role or Position',
            //   description: 'Brief description or bio',
            //   image: '@/assets/Avatar_User.png', // Adjust path as necessary
            // },
          ],
        };
      },
    }
    </script>
    
    <style scoped>
    .about-page {
      max-width: 1200px;
      margin: auto;
      padding: 20px;
    }
    
    .content-section, .mission-section, .team-section {
      margin-bottom: 40px;
    }
    
    .about-image {
      width: 100%;
      height: auto;
      border-radius: 50px;
      object-fit: cover;
    }
    
    .team-members {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .team-member {
      margin: 20px;
      text-align: center;
    }
    
    .team-member-image {
      width: 50%;
      border-radius: 50%;
    }
    /* @media (max-width: 768px) {
      .photo-item {
        width: 100%;
      }
    } */
    </style>
    