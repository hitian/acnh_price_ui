<template>
    <div>
        <h1>我的信息</h1>
        <b-form @submit="updateUserInfo">
            <b-form-group
                id="ig-id"
                label="ID"
                label-for="i-id">
                <b-form-input
                id="i-id"
                v-model="user.id"
                type="text"
                readonly
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="ig-email"
                label="Email"
                label-for="i-email"
                description="(仅自己可见)">
                <b-form-input
                id="i-email"
                v-model="user.email"
                type="text"
                readonly
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="ig-nickname"
                label="昵称"
                label-for="i-nickname"
                description="(公开)">
                <b-form-input
                id="i-nickname"
                v-model="user.nickname"
                type="text"
                required
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="ig-avatar_name"
                label="人物名称"
                label-for="i-avatar_name"
                description="(可选，公开)">
                <b-form-input
                id="i-avatar_name"
                v-model="user.avatar_name"
                type="text"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="ig-island_name"
                label="岛名称"
                label-for="i-island_name"
                description="(可选，公开)">
                <b-form-input
                id="i-island_name"
                v-model="user.island_name"
                type="text"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="ig-ns_id"
                label="NS好友ID"
                label-for="i-ns_id"
                description="(可选，仅已关注用户可见)">
                <b-form-input
                id="i-ns_id"
                v-model="user.ns_id"
                type="text"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                id="ig-notification_price"
                label="提醒推送价格"
                label-for="i-notification_price"
                description="当有价格高于这个值是发送推送，(开发中)">
                <b-form-input
                id="i-notification_price"
                v-model="user.notification_price"
                type="number"
                readonly
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">更新</b-button>
        </b-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {},
        }
    },
    mounted() {
        this.loadUser()
    },
    methods: {
        async loadUser() {
            try {
                let {data} = await this.$axios.get('user')
                console.log(data)
                this.user = data.user;
            }catch(e) {
                alert('read user failed' + e)
            }
        },
        async updateUserInfo(evt) {
            evt.preventDefault();

            try{
                let {data} = await this.$axios.post('user/update', this.user);
                if (!data.ok) {
                    alert('更新失败')
                }
            }catch(e){
                alert("error: " + e)
            }
            
        }
    },
}
</script>