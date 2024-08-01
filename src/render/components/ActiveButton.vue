<template>
  <div :class="{'active': isActive}" class="column-c">
    <div class="p-rel">
      <button class="row-c" :class="{'loading': loading}">
        <iconify-icon :icon="loading ? `line-md:loading-loop` : `ion:power`"/>
      </button>
      <span v-for="index in 3" :class="`c-${index}`"></span>
    </div>

    <div v-if="isActive" class="row-a gap mt-5  app-color-primary ">
      <iconify-icon icon="ion:shield-checkmark"/>
      فعال
    </div>
    <div v-else class="row-a gap f-center mt-5">
      <iconify-icon icon="ion:shield-outline"/>
      غیر فعال
    </div>
  </div>
</template>

<script setup lang="ts">

import IconifyIcon from "@/render/components/app/IconifyIcon.vue";

defineProps<{
  isActive: boolean,
  loading: boolean,
}>()
</script>

<style scoped lang="scss">
.active{
  button{
    background-color: var(--primary-color);
    color: var(--primary-color-text);
  }

  span{
    &.c-1{
      background-color: rgba(247, 185, 24, 0.7);
    }
    &.c-2{
      background-color: rgba(247, 185, 24, 0.5);
    }
    &.c-3{
      background-color: rgba(247, 185, 24, 0.3);
    }
  }
}
button{
  width: 100px;
  aspect-ratio: 1;
  border-radius: 50%!important;
  font-size: 2rem;
  color: white;
  background-color: var(--paper);
  padding: unset;

  &:hover, &.loading{
    animation: pulse infinite 1.5s;
    ~ span{
      &.c-1{
        animation: pulse infinite 1.5s 0.1s;
      }
      &.c-2{
        animation: pulse infinite 1.5s 0.2s;
      }
      &.c-3{
        animation: pulse infinite 1.5s 0.3s;
      }
    }
  }

}
span{
  position: absolute;
  aspect-ratio: 1;
  border-radius: 50%;
  transition: 0.2s ease-in-out;

  &.c-1{
    inset: -1rem;
    z-index: -1;
    background-color: #444750;
  }
  &.c-2{
    inset: -1.4rem;
    z-index: -2;
    background-color: #373940;
  }
  &.c-3{
    inset: -1.8rem;
    z-index: -3;
    background-color: #3a3c42;
  }
}

@keyframes pulse {
  0%{transform: scale(1)}
  50%{transform: scale(1.2);}
  100%{transform: scale(1)}
}
</style>