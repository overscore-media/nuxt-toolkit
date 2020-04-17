<template>
  <v-layout class="grey darken-4 black--text justify-center">
    <v-container>
      <v-card
        class="v-flex text-center grey darken-4"
        width="100vw"
      >
        <v-card-text>
          <p class="title">
            Netlify Form: (Not actually hooked up; your response won't go anywhere)
          </p>
          <v-form
            ref="form"
            v-model="valid"
            value="valid"
            lazy-validation
            name="form-name-goes-here"
            method="post"
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <p class="d-none">
              <label>If you're a human, don't fill out this input: <input
                type="hidden"
                name="form-name"
                value="contact"
              /></label>
            </p>
            <v-text-field
              v-model="name"
              :rules="[v => !!v || 'Please enter your name']"
              label="Name"
              required
              background-color="grey darken-4"
              rounded
              outlined
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              background-color="grey darken-4"
              rounded
              outlined
            ></v-text-field>

            <br />

            <v-textarea
              v-model="message"
              :rules="[v => !!v || 'Please enter a message']"
              background-color="grey darken-4"
              label="Your Message"
              required
              outlined
              rounded
            >
            </v-textarea>

            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'Make sure you agree - it is just a test, though']"
              label="I agree"
              required
              rounded
              outlined
              :on-icon="checkboxOnSVG"
              :off-icon="checkboxOffSVG"
            >
            </v-checkbox>

            <v-btn
              color="primary"
              class="mr-4"
              type="button"
              value="Send Message"
              @click="submitHandler"
            >
              Send
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <v-dialog
        v-model="modal"
        max-width="800"
        overlay-color="#272727"
        overlay-opacity="0.7"
      >
        <v-card
          class="justify-center text-center contact-form-modal"
        >
          <v-card-title class="headline justify-center contact-form-modal-title">
            Ta Da!
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-5">
            If you're seeing this modal, it means the form worked! Don't worry, though; it's not hooked up.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <v-btn
              class="contact-form-modal-button"
              color="primary"
              large
              raised
              @click="modal=false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card
        flat
        tile
        class="white--text text-center"
        width="100vw"
      >
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import { mdiCheckboxMarkedOutline, mdiCheckboxBlankOffOutline } from '@mdi/js'

export default {
  data: () => ({
    name: '',
    email: '',
    emailRules: [
      v => !!v || 'Please enter your e-mail address',
      v => /.+@.+\..+/.test(v) || 'Please enter a valid e-mail address'
    ],
    valid: false,
    checkbox: false,
    checkboxOnSVG: mdiCheckboxMarkedOutline,
    checkboxOffSVG: mdiCheckboxBlankOffOutline,
    message: '',
    modal: false
  }),
  computed: {
    form () {
      return {
        name: this.name,
        email: this.email,
        message: this.message
      }
    }
  },
  methods: {
    encodeURI (data) {
      return Object.keys(data).map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      ).join('&')
    },
    submitHandler () {
      const self = this
      const axiosConfiguration = {
        header: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }

      setTimeout(function () {
        if (self.$refs.form.validate()) {
          self.modal = true
          this.$axios.post(
            '/',
            self.encodeURI({
              'form-name': 'form-name-goes-here',
              ...self.form
            }),
            axiosConfiguration
          )
            .then(function (response) {
              // eslint-disable-next-line no-console
              console.log(response)
            })
            .catch(function (error) {
              // eslint-disable-next-line no-console
              console.log(error)
            })
          self.$refs.form.reset()
        }
      })
    }
  },
  head () {
    return {
      title: 'Netlify Forms'
    }
  }
}
</script>
