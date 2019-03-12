<template>
  <div class="profile">
    <div class="container">
      <div class="item profile">
        <img
          class="profile-image"
          :src="`http://${apiAddress}:${apiPort}/static/profile-images/`+ user.image "
          alt="Avatar"
        >
        <div class="name">
          <div class>
            <span style="margin-right: 5px;">{{ user.name }}</span>

            <md-menu md-size="auto" md-align-trigger :mdCloseOnClick="true">
              <i
                md-menu-trigger
                v-if="isMe(user._id)"
                class="fas fa-ellipsis-h btn"
                style="margin: 0; margin-right: 5px; padding: 10px; vertical-align: middle; border-radius: 1em;"
              ></i>
              <md-menu-content>
                <md-menu-item
                  style
                  v-for="menu in profileMenus"
                  :key="menu.name"
                  @click="menu.click"
                >
                  <span class="profile-menus">{{menu.name}}</span>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
            <input type="file" ref="profileInput" @change="submitProfileImage" hidden>
            
            <span
              :class="isMe(user._id)? '' : isFollow(user) ? 'following btn': 'btn'"
              class="follow"
              @click="actionFollow(isFollow(user), user, isMe(user._id))"
            >
              <span v-if="isMe(user._id)">FOLLOWERS {{user.followers.length}}</span>
              <span v-else-if="!isFollow(user)">
                <i class="fas fa-plus"></i>
                FOLLOW {{user.followers.length}}
              </span>
              <span v-else>FOLLOWING {{user.followers.length}}</span>
            </span>
          </div>
          <div class="interests" style>
            <span style>INTERESTS:</span>
            <span
              class="chip"
              v-for="interest in user.interests"
              :key="interest"
              @click="linkByTag(interest)"
            >#{{interest}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiAddress, apiPort } from "@/config"
import { mapGetters } from "vuex"
import { actions } from "@/mixins/actions"
import { EventBus } from "@/mixins/EventBus"
import UserService from "@/services/UserService"

export default {
  props: ["user"],
  data() {
    return {
      apiAddress,
      apiPort,
      profileMenus: [
        { name: "Editing my profile image", click: this.editProfileImage },
        { name: "Changing password", click: this.changePassword },
        { name: "Editing account", click: this.editAccount },
        { name: "Logout", click: this.logout },
        { name: "Delete account", click: this.deleteAccount }
      ]
    }
  },
  computed: {
    ...mapGetters(["isMe", "isFollow"])
  },
  methods: {
    editProfileImage() {
      this.$refs.profileInput.click()
    },
    async submitProfileImage(evt) {
      const file = evt.target.files[0]
      if (!file) return

      let formData = new FormData()
      formData.append("img", file)
      formData.append("userId", this.$store.state.userInfo.user._id)

      const res = await UserService.setUserProfileImage(formData)
      if (!res.data.success) {
        alert("Error")
        return
      }
      EventBus.$emit("loadUser")
    },
    changePassword() {},
    editAccount() {},
    logout() {},
    deleteAccount() {}
  },
  mixins: [actions]
}
</script>

<style scoped>
.container {
  margin: 10px 0px;
  /* border: 1px solid lightgray; */
  border-radius: 1em;
  overflow: hidden;
  margin: 20px 10px;
  padding: 20px;
}

.item {
  margin: auto;
}

.profile-image {
  vertical-align: middle;
  display: inline-block;
  object-fit: cover;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.name {
  height: 100px;
  margin: 0 30px;
  font-size: 3rem;
  /* vertical-align: middle; */
  display: inline-flex;
  flex-direction: column;
  justify-content: space-around;
}
.fa-ellipsis-h {
  font-size: 1.5rem;
}

.follow {
  padding: 5px 10px;
  font-size: 1rem;
  vertical-align: middle;
  border: 1px solid lightskyblue;
  border-radius: 1em;
}

.following {
  color: steelblue;
  background-color: aliceblue;
}

/* .follow:hover,
.follow:active {
  cursor: pointer;
  color: steelblue;
} */

.interests {
  font-size: 1rem;
  /* vertical-align: middle; */
}
.chip {
  margin: 0 5px;
  font-size: 1rem;
  color: steelblue;
  cursor: pointer;
}

/* .btn:active, */
.btn:hover {
  cursor: pointer;
  color: steelblue;
  background-color: lightgray;
}

@media screen and (max-width: 800px) {
  .container {
    border-radius: 1em;
    overflow: hidden;
    margin: 5px 0px;
    padding: 5px;
  }

  .item {
    margin: auto;
  }

  .profile-image {
    display: block;
    object-fit: cover;
    width: 80px;
    height: 80px;
    margin: 5px 5px;
    border-radius: 50%;
  }

  .name {
    height: 100px;
    margin: 0 10px;
    font-size: 1.5rem;
    /* vertical-align: middle; */
    display: inline-flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .fa-ellipsis-h {
    font-size: 1rem;
  }
  .profile-menus {
    font-size: 0.8rem;
  }
  .follow {
    padding: 5px 5px;
    font-size: 0.8rem;
    vertical-align: middle;
    border: 1px solid lightskyblue;
    border-radius: 1em;
  }

  .following {
    color: steelblue;
    background-color: aliceblue;
  }

  /* .follow:hover,
.follow:active {
  cursor: pointer;
  color: steelblue;
} */

  .interests {
    font-size: 0.8rem;
    /* vertical-align: middle; */
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .chip {
    margin: 0 3px;
    font-size: 0.8rem;
  }
}
</style>


