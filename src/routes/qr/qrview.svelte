<script>
  import { onMount } from 'svelte';
  import { default as QrCode } from 'qrious';

  export let errorCorrection = "L";
  export let background = "#fff";
  export let color = "#000";
  export let size = "200";
  export let value = "";
  export let padding = 0;
  export let className = "qrcode";
  export let format = "png";

  let image = '';
  let QRcode;

  function generateQrCode() {
    QRcode.set({
      background,
      foreground: color,
      level: errorCorrection,
      padding,
      size,
      value,
    });
    
    image = QRcode.toDataURL('image/' + format);
  }
  
  export function getImage() {
    return image;
  }

  onMount(() => {
    QRcode = new QrCode();
    if(value) {
      generateQrCode();
    }
  });

  $: {
    if(value && ((padding === 0) ? true : padding) && format && errorCorrection && QRcode) {
      generateQrCode();
    }
  }

</script>

<img src={image} alt={value} class={className}/>
