<script>
    import {onMount} from 'svelte';
    import {DxfViewer} from 'dxf-viewer';
    import * as three from "three";

    import mainFont from "../../../static/fonts/Roboto-LightItalic.ttf";
    import aux1Font from "../../../static/fonts/NotoSansDisplay-SemiCondensedLightItalic.ttf";
    import aux2Font from "../../../static/fonts/HanaMinA.ttf";
    import aux3Font from "../../../static/fonts/NanumGothic-Regular.ttf";

    export let dxf;
    let canvasWidth;
    let viewer;

    const options = {
        canvasHeight: 600,
        clearColor: new three.Color('#fff'),
        colorCorrection: true,
    };

    $: if (viewer && dxf) {
        loadFile(dxf);
    }

    onMount(() => {
        const container = document.getElementById('canvasContainer');
        options.canvasWidth = canvasWidth;
        viewer = new DxfViewer(container, options);
    });

    function loadFile(dxf) {
        const file = new File([dxf], '_.dxf');
        const url = URL.createObjectURL(file);
        viewer.Load({url, fonts: [mainFont, aux1Font, aux2Font, aux3Font]});
    }

</script>

<div bind:clientWidth={canvasWidth} id="canvasContainer"></div>
