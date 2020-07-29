import { ref } from "@vue/composition-api";

export function recordPage() {
  const a = ref(1);

  const b = () => {};

  return {
    a,
    b
  };
}
