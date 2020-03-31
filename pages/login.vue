<template>
    <div>
        <b-row align-h="center">
            <b-col md="auto">
                <b-btn variant="primary" @click="onLoginWithGoogle">Login With Google</b-btn>
            </b-col>
        </b-row>
        <p></p>
        <b-row align-h="center">
            <b-col md="auto">
                <b-btn variant="info" @click="onLoginWithApple">Login With AppleID</b-btn>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
       onLoginWithGoogle() {
            this.$auth.loginWith('google')
        },
        onLoginWithApple() {

        }
    },
}
</script>