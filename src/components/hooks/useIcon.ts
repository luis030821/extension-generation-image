import { hashicon } from "@emeraldpay/hashicon";

function useIcon(value: string) {
  const icon = hashicon(value, {
    size: 1200,
    saturation: { min: 80, max: 100 },
  }).toDataURL();
  return { icon };
}

export default useIcon;
