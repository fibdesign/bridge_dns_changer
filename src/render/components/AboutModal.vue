<template>
  <div v-if="show" class="modal-backdrop" @click.self="show = false">
    <div class="modal-container">
      <div class="modal-header">
        <div class="app-icon">
          <img src="/images/logo.png"/>
        </div>
        <h6 class="app-title">پل - تغییر DNS</h6>
        <button class="close-btn" @click="show = false">
          <iconify-icon icon="ion:close" class="f-danger"/>
        </button>
      </div>

      <div class="modal-content">
        <div class="version-info">
          <span class="version-label">نسخه برنامه</span>
          <span class="">{{ packageJson.version }}</span>
        </div>
        <div class="version-info">
          <span class="version-label">تیم توسعه</span>
          <span class="">گروه نرم افزاری فیبوناچی</span>
        </div>

        <div class="action-buttons">
          <button class="action-btn secondary" @click="openLink()">
            <iconify-icon icon="ion:open-outline"/>
            وب سایت
          </button>
          <button class="action-btn primary" @click="checkUpdate">
            <iconify-icon v-if="loading" icon="line-md:loading-loop"/>
            <svg v-else width="18" height="18" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12C22,14.75 21,17.1 19.05,19.05C17.1,21 14.75,22 12,22C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2M12,4C8.67,4 6,6.67 6,10C6,13.33 8.67,16 12,16C15.33,16 18,13.33 18,10C18,6.67 15.33,4 12,4Z"/>
            </svg>
            بررسی برای بروزرسانی
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconifyIcon from "@/render/components/app/IconifyIcon.vue";
import packageJson from '../../../package.json'
import {EVENTS_KEYS} from "@/electron/utils/EVENTS_KEYS";
import {ref} from "vue";
import {useToast} from "vue-toastification";

defineEmits(['close']);

const openLink = (link: string = 'https://bridge.fibdesign.ir') => {
  (window as any).ipcRenderer.send('open-link', link)
}
const show = defineModel({default: false})
const loading =ref<boolean>(false)
const toast = useToast()
const checkUpdate = async () => {
  try {
    loading.value = true;
    const result = await (window as any).ipcRenderer.invoke(EVENTS_KEYS.CHECK_APP_UPDATE);

    console.log('Update result:', result); // Debug the structure

    if (result && result.success && result?.result?.isUpdateAvailable) {
      toast.info('بروزرسانی جدید موجود است!');
    } else {
      toast.info('برنامه شما بروز است!');
    }
  } catch (error) {
    console.error('Update check failed:', error);
    toast.error('خطا در بررسی بروزرسانی');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-container {
  width: 560px;
  max-height: 80vh;
  background-color: var(--paper);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid var(--divider);
}

@keyframes scale-in {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-light) 100%);
  padding: 24px;
  display: flex;
  align-items: center;
  position: relative;
  color: var(--primary-color-text);

  .app-icon {
    width: 56px;
    height: 56px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 16px;

    svg {
      color: white;
    }
  }

  .app-title {
    font-weight: 600;
    letter-spacing: -0.5px;
    margin: 0;
  }

  .close-btn {
    position: absolute;
    top: 16px;
    left: 16px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.modal-content {
  padding: 24px;
  overflow-y: auto;
  color: var(--text-primary);

  .version-info {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid var(--divider);
    margin-bottom: 20px;

    .version-label {
      font-weight: 500;
      color: var(--text-secondary);
    }

    .version-value {
      font-weight: 600;
      color: var(--primary-color);
    }
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 24px;

    .info-item {
      display: flex;
      flex-direction: column;

      .info-label {
        font-size: 0.85rem;
        color: var(--text-secondary);
        margin-bottom: 4px;
      }

      .info-value {
        font-weight: 500;
      }
    }
  }

  .feature-section {
    border-top: 1px solid var(--divider);
    padding-top: 20px;

    .section-title {
      font-size: 1.1rem;
      margin-top: 0;
      margin-bottom: 16px;
      color: var(--text-primary);
      font-weight: 600;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;

      .feature-item {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 8px;
        background-color: rgba(var(--primary-color-rgb), 0.05);
        transition: transform 0.2s ease;

        &:hover {
          transform: translateY(-2px);
          background-color: rgba(var(--primary-color-rgb), 0.08);
        }

        .feature-icon {
          width: 30px;
          height: 30px;
          background-color: var(--primary-color);
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 12px;

          svg {
            color: var(--primary-color-text);
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }

  .action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    padding-top: 20px;

    .action-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &.primary {
        background-color: var(--primary-color);
        color: var(--primary-color-text);

        &:hover {
          background-color: var(--primary-color-dark);
        }
      }

      &.secondary {
        background-color: transparent;
        border: 1px solid var(--divider);
        color: var(--text-primary);

        &:hover {
          background-color: rgba(var(--primary-color-rgb), 0.05);
          border-color: var(--primary-color);
          color: var(--primary-color);
        }
      }

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>