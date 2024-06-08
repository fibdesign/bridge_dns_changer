import {onMounted, onUnmounted} from "vue";
import type EventListenerServiceType from "@/render/types/services/EventListenerServiceType";

const useEventListener = ({target, event, callback}: EventListenerServiceType) => {
    onMounted(() => target.addEventListener(event, callback))
    onUnmounted(() => target.removeEventListener(event, callback))
}

export default useEventListener