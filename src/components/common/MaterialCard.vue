<template>
  <v-card
    :style="styles"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <helper-offset
      v-if="hasOffset"
      :inline="inline"
      :full-width="fullWidth"
      :offset="offset"
    >
      <v-card
        v-if="!$slots.offset"
        :color="color"
        :elevation="elevation"
        class="v-card--material__header d-flex align-center"
        dark
        min-height="80"
      >
        <slot
          v-if="!title && !text && !icon"
          name="header"
        />
        <v-flex v-else-if="icon && !title && !text" class="justify-center text-center">
            <v-icon
           size="40"
          >
            {{ icon }}
          </v-icon>
          <p>{{ iconText }}</p>
        </v-flex>
        <div
          v-else
          class="px-3"
        >
          <v-row>
            <v-icon
           size="40"
           class="mx-2"
          >
            {{ icon }}
          </v-icon>
          <h4
            class="title font-weight-light mt-1"
            v-text="title"
          />
          </v-row>
          <p
            class="caption font-weight-thin mb-0"
            v-text="text"
          />
        </div>

      </v-card>

      <slot
        v-else
        name="offset"
      />
    </helper-offset>

    <v-card-text>
      <slot />
    </v-card-text>

    <v-divider
      v-if="$slots.actions"
      class="mx-3"
    />

    <v-card-actions v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
import HelperOffset from '@/components/common/HelperOffset.vue'
export default {
  name: 'MaterialCard',
  components: {
    HelperOffset
  },
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: 'secondary'
    },
    icon: {
      type: String,
      default: undefined
    },
    iconText: {
      type: String,
      default: undefined
    },
    elevation: {
      type: [Number, String],
      default: 10
    },
    inline: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    offset: {
      type: [Number, String],
      default: 24
    },
    title: {
      type: String,
      default: undefined
    },
    text: {
      type: String,
      default: undefined
    }
  },
  computed: {
    hasOffset () {
      return this.$slots.header ||
        this.$slots.offset ||
        this.title ||
        this.text ||
        this.icon
    },
    styles () {
      if (!this.hasOffset) return null
      return {
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset * 2}px`
      }
    }
  }
}
</script>
