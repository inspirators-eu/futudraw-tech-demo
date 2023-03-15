<script lang="ts">
    import DxfViewer from "$lib/components/DxfViewer.svelte";
    import ExportButtons from "$lib/components/ExportButtons.svelte";
    import {DxfCmdHelper} from "../../api/dxf/dxf-api";
    import {onMount} from 'svelte';
    import {Credentials} from 'realm-web';
    import {App} from 'realm-web';


    let dxf;

    onMount(async () => {

        const futuDrawUser = await new App(import.meta.env.VITE_FUTUDRAW_APP_ID)
            .logIn(Credentials.apiKey(import.meta.env.VITE_FUTUDRAW_API_KEY));

        dxf = await futuDrawUser.callFunction('compileDxf',
            {
                dxfContent: await (await fetch('/dxf/demo.dxf')).text(),
                dxfCommands: new DxfCmdHelper()
                    // .rename('JAHUTUS_SISEOSAD_KW', '10kW', 'JAHUTUS_SISEOSAD')
                    // .disableBlock('JAHUTUS_VENT_PATAREI')
                    .cmds
            });
    })


</script>
<div class="flex flex-row">
    <div class="basis-1/6 flex flex-col">

        <!--
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-2/3">
                <input bind:value={inverterName} class="border-2 border-gray-200 rounded w-full py-2 px-4"
                       type="text" placeholder="Inverter name">
            </div>
        </div>
        -->

        <div class="flex justify-around mt-auto">
            <ExportButtons dxf={dxf} name={'model2'}/>
        </div>
    </div>
    <div class="basis-5/6 border">
        {#if dxf}
            <DxfViewer dxf={dxf}/>
        {/if}
    </div>
</div>
