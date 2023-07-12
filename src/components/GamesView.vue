<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <!-- bootswatch CDN -->
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/sketchy/bootstrap.min.css"
        integrity="sha384-RxqHG2ilm4r6aFRpGmBbGTjsqwfqHOKy1ArsMhHusnRO47jcGqpIQqlQK/kmGy9R"
        crossorigin="anonymous"
      />
      <div class="row">
        <div class="col-sm-12">
          <h1
            class="text-center bg-primary text-white"
            style="border-radius: 10px"
          >
            Games Library🕹️
          </h1>
          <hr />
          <br />

          <!-- Alert Message -->
          <b-alert variant="success" v-if="showMessage" show>
            {{ message }}
          </b-alert>
          <button
            type="button"
            class="btn btn-success btn-sm"
            v-b-modal.game-modal
          >
            Add Game
          </button>
          <br /><br />
          <table class="table table-hover">
            <!-- Table Head -->
            <thead>
              <tr>
                <!-- Table Header Cells -->
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Played</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(game, index) in games" :key="index">
                <td>{{ game.title }}</td>
                <td>{{ game.genre }}</td>
                <td>
                  <span v-if="game.played">Yes</span>
                  <span v-else>No</span>
                </td>
                <td>
                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      v-b-modal.game-update-modal
                      @click="editGame(game)"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="deleteGame(game)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <footer
            class="bg-primary text-white text-center"
            style="border-radius: 10px"
          >
            Copyright &copy; All Rights Reserved 2023
          </footer>
        </div>
      </div>
      <!-- Start of Modal 1 -->
      <b-modal
        ref="addGameModal"
        id="game-modal"
        title="Add a new game"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
          <b-form-group
            id="form-title-group"
            label="Title:"
            label-for="form-title-input"
          >
            <b-form-input
              id="form-title-input"
              type="text"
              v-model="addGameForm.title"
              required
              placeholder="Enter Game"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-genre-group"
            label="Genre:"
            label-for="form-genre-input"
          >
            <b-form-input
              id="form-genre-input"
              type="text"
              v-model="addGameForm.genre"
              required
              placeholder="Enter genre"
            >
            </b-form-input>
          </b-form-group>
          <!-- Checkbox -->
          <b-form-group id="form-played-group">
            <b-form-checkbox-group
              v-model="addGameForm.played"
              id="form-checks"
            >
              <b-form-checkbox value="true"> Played? </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
          <!-- Buttons : Submit and Reset -->
          <b-button type="submit" variant="outline-info">Submit</b-button>
          <b-button type="reset" variant="outline-danger">Reset</b-button>
        </b-form>
      </b-modal>
      <!-- End of Modal 1 -->
      <!-- Start of Modal 2 -->
      <b-modal
        ref="editGameModal"
        id="game-update-modal"
        title="Update"
        hide-backdrop
        hide-footer
      >
        <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
          <b-form-group
            id="form-title-edit-group"
            label="Title:"
            label-for="form-title-edit-input"
          >
            <b-form-input
              id="form-title-edit-input"
              type="text"
              v-model="editGameForm.title"
              required
              placeholder="Enter title"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-genre-edit-group"
            label="Genre:"
            label-for="form-genre-edit-input"
          >
            <b-form-input
              id="form-genre-edit-input"
              type="text"
              v-model="editGameForm.genre"
              required
              placeholder="Enter genre"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-played-edit-group">
            <b-form-checkbox-group
              v-model="editGameForm.played"
              id="form-checks"
            >
              <b-form-checkbox value="true"> Played? </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
          <!-- Buttons : Update and Cancel -->
          <b-button type="submit" variant="outline-info">Update</b-button>
          <b-button type="reset" variant="outline-danger">Cancel</b-button>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      games: [],
      addGameForm: {
        title: "",
        genre: "",
        played: [],
      },
      editGameForm: {
        id: "",
        title: "",
        genre: "",
        played: [],
      },
    };
  },
  message: "",
  methods: {
    //GET Function
    getGames() {
      const path = "http://localhost:5000/games";
      axios
        .get(path)
        .then((res) => {
          this.games = res.data.games;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //POST Games Function
    addGame(payload) {
      const path = "http://localhost:5000/games";
      axios
        .post(path, payload)
        .then(() => {
          this.getGames();
          // For message alert
          this.message = "Game Added";
          // To show actual message
          this.showMessage = true;
        })
        .catch((err) => {
          console.error(err);
          this.getGames();
        });
    },
    initForm() {
      this.addGameForm.title = "";
      this.addGameForm.genre = "";
      this.addGameForm.played = [];
      this.editGameForm.id = "";
      this.editGameForm.title = "";
      this.editGameForm.genre = "";
      this.editGameForm.played = [];
    },
    // This is for Modal 1 - to submit new game
    onSubmit(e) {
      e.preventDefault();
      this.$refs.addGameModal.hide();
      let played = false;
      if (this.addGameForm.played[0]) played = true;
      const payload = {
        title: this.addGameForm.title,
        genre: this.addGameForm.genre,
        played,
      };
      this.addGame(payload);
      this.initForm();
    },
    onReset(e) {
      e.preventDefault();
      this.$refs.addGameModal.hide();
      this.initForm();
    },
    // This is for Modal 2 - to submit updated game
    onSubmitUpdate(e) {
      e.preventDefault();
      this.$refs.editGameModal.hide();
      let played = false;
      if (this.editGameForm.played[0]) played = true;
      const payload = {
        title: this.editGameForm.title,
        genre: this.editGameForm.genre,
        played,
      };
      this.updateGame(payload, this.editGameForm.id);
    },
    // Handle cancel button click
    onResetUpdate(e) {
      e.preventDefault();
      this.$refs.editGameModal.hide();
      this.initForm();
      this.getGames();
    },
    // Update Individual Game
    updateGame(payload, gameID) {
      const path = `http://localhost:5000/games/${gameID}`;
      axios
        .put(path, payload)
        .then(() => {
          this.getGames();
          this.message = "Game Updated!";
          this.showMessage = true;
        })
        .catch((err) => {
          console.error(err);
          this.getGames();
        });
    },
    // Delete Inidividual Game
    removeGame(gameID) {
      const path = `http://localhost:5000/games/${gameID}`;
      axios
        .delete(path)
        .then(() => {
          this.getGames();
          this.message = "Game Removed!";
          this.showMessage = true;
        })
        .catch((err) => {
          console.error(err);
          this.getGames();
        });
    },
    // Handle update button
    editGame(game) {
      this.editGameForm = game;
    },
    // Handle Delet button
    deleteGame(game) {
      this.removeGame(game.id);
    },
  },
  created() {
    this.getGames();
  },
};
</script>
