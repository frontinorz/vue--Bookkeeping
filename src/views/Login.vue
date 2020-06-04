<template>
  <v-container>
    <v-card
      class="mx-auto mt-12"
      max-width="500"
    >
      <v-card-title class="cyan darken-1 white--text">帳戶登入</v-card-title>
      <v-card-text class="pt-4">
        <v-text-field
          color="cyan darken-1"
          class="input-group--focused"
          label="E-mail"
          prepend-icon="mdi-email-outline"
          v-model="email"
          :rules="emailRules"
          validate-on-blur
          required
        ></v-text-field>
        <v-text-field
          color="cyan darken-1"
          label="密碼"
          prepend-icon="mdi-lock-outline"
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[passwordRules.required]"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="cyan darken-1"
          class="subtitle-1"
          @click="loginHandler"
        >
          登入
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-alert
      v-if="errorText"
      type="error"
      class="mt-2 mx-auto"
      max-width="500"
    >
      {{errorText}}
    </v-alert>
  </v-container>
</template>

<script>
  import firebase from "firebase/app";
  import "firebase/auth";

  export default {
    data: () => ({
      validAccount: null,
      email: "demo@gmail.com",
      password: "demo123",
      showPassword: false,
      errorText: "",
      emailRules: [
        v => !!v || "此為必填欄位",
        v => /.+@.+\..+/.test(v) || "E-mail 格式錯誤"
      ],
      passwordRules: {
        required: value => !!value || "此為必填欄位.",
        emailMatch: () => "The email and password you entered don't match"
      }
    }),
    computed: {},
    methods: {
      loginHandler() {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$store.dispatch("GET_DATA");
            this.$router.push("/expense");
            this.$store.commit("checkIsLogin");
          })
          .catch(err => {
            this.errorText = this.errorCodeTransfer(err);
          });
      },
      errorCodeTransfer(err) {
        switch (err.code) {
          case "auth/wrong-password":
            return "密碼錯誤";
          case "auth/user-not-found":
            return "不存在此使用者";
          default:
            alert(err.code);
            return err.message;
        }
      }
    }
  };
</script>

