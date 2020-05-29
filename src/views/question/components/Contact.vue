<template>
  <v-app class="pt-8">
    <v-parallax dark :src="require('@/assets/images/bg4.jpg')" height="800">
      <v-row class="justify-center align-top">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">咨询问题</h1>
          <h4 class="subheading">在这里提交您想要询问的资讯信息，我们将会为你您安排专业专家解答!</h4>
        </v-col>
      </v-row>
      <v-row class="align-top mt-lg-n12" style="justify-content: space-around">
        <v-col cols="12" md="4" sm="12">
          <v-card height="350" class="elevation-10">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field label="咨询标题*" required prepend-icon="format_list_bulleted" v-model.trim="formData.title"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field label="咨询领域*" required prepend-icon="border_all" v-model.trim="formData.domain"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-file-input
                      label="上传图片*"
                      hint="您可以上传多张图片"
                      small-chips
                      multiple
                      prepend-icon="insert_photo"
                      v-model="formData.imageFile"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" sm="12">
          <v-card height="350" class="elevation-10">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-textarea
                      auto-grow
                      prepend-icon="text_fields"
                      name="input-7-1"
                      label="咨询内容*"
                      hint="在这里填写您想要咨询的问题"
                      persistent-hint
                      outlined
                      height="250"
                      v-model.trim="formData.content"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="12" sm="12" class="text-center mt-n12">
          <v-btn color="info" min-width="300" class="font-weight-bold" :loading="this.btnLoading" @click="uploadForm()">提交</v-btn>
        </v-col>
      </v-row>
    </v-parallax>
  </v-app>
</template>

<script>
export default {
  name: 'Contact',
  data () {
    return {
      formData: {
        title: '',
        domain: '',
        content: '',
        imageFile: null
      },
      btnLoading: false
    }
  },
  methods: {
    addQuestion () {
      this.btnLoading = true
      let formData = new FormData()
      formData.append('title', this.formData.title)
      formData.append('domain', this.formData.domain)
      formData.append('content', this.formData.content)
      formData.append('file1', this.formData.imageFile)
      this.$api.ordinary.addQuestion(formData)
        .then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              this.$toast('添加咨询成功!', {
                x: 'right',
                y: 'top',
                icon: 'info',
                dismissable: false,
                showClose: true
              })
            }, 500)
          }
        })
        .then(res => {
          this.btnLoading = false
        })
    },
    uploadForm () {
      // 登录后和表达不缺参
      if (this.$untils.ifLogin() && this.$untils.ifEmety(this.formData)) {
        this.addQuestion()
      }
    }
  }
}
</script>
